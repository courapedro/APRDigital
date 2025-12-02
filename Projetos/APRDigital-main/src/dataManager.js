/**
 * GERENCIADOR DE DADOS DE APR
 * Sistema de persistência com IndexedDB + localStorage (fallback)
 * Salva formulários completos com ID único e timestamp
 * Permite acesso futuro aos dados salvos
 * Com sincronização automática via GitHub API
 */

class AprDataManager {
    constructor() {
        this.dbName = 'AprDigitalDB';
        this.storeName = 'AprForms';
        this.version = 1;
        this.db = null;
        this.useIndexedDB = true;
        this.fallbackKey = 'aprFormsBackup';
        
        // Configuração GitHub
        this.githubToken = localStorage.getItem('githubToken') || null;
        this.githubRepo = 'APRDigital';
        this.githubOwner = 'courapedro';
        this.aprsFolder = 'aprs_data';
        
        this.initDB();
    }

    /**
     * Define o token do GitHub (deve ser chamado uma vez)
     * Token precisa ter permissão: repo, workflow
     */
    setGithubToken(token) {
        this.githubToken = token;
        localStorage.setItem('githubToken', token);
        console.log('✅ Token GitHub configurado');
    }

    /**
     * Verifica se GitHub está configurado
     */
    isGithubConfigured() {
        return !!this.githubToken;
    }

    /**
     * Inicializa o IndexedDB com fallback para localStorage
     */
    initDB() {
        if (!window.indexedDB) {
            console.warn('⚠️ IndexedDB não disponível, usando localStorage como fallback');
            this.useIndexedDB = false;
            return;
        }

        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = () => {
            console.error('❌ Erro ao abrir IndexedDB:', request.error);
            this.useIndexedDB = false;
        };

        request.onsuccess = () => {
            this.db = request.result;
            console.log('✅ IndexedDB inicializado com sucesso');
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            if (!db.objectStoreNames.contains(this.storeName)) {
                const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
                store.createIndex('timestamp', 'timestamp', { unique: false });
                store.createIndex('status', 'status', { unique: false });
                console.log('✅ Object Store criado com sucesso');
            }
        };
    }

    /**
     * Gera um ID único para o formulário
     * Formato: APR-YYYYMMDD-HHMMSS-RANDOM
     */
    generateUniqueId() {
        const now = new Date();
        const date = now.toISOString().slice(0, 10).replace(/-/g, '');
        const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `APR-${date}-${time}-${random}`;
    }

    /**
     * Salva um formulário completo de APR
     * @param {Object} formData - Dados do formulário (steps 1-6)
     * @param {String} status - Status do formulário (em_preenchimento, concluido, etc)
     * @returns {Promise<String>} ID do formulário salvo
     */
    async saveForm(formData, status = 'concluido') {
        try {
            const id = this.generateUniqueId();
            const now = new Date();

            const data = {
                id,
                timestamp: now.toISOString(),
                createdAt: now.getTime(),
                status,
                form: {
                    step1: formData.step1 || {},
                    step2: formData.step2 || {},
                    step3: formData.step3 || {},
                    step4: formData.step4 || {},
                    step5: formData.step5 || {},
                    step6: formData.step6 || {},
                    collaborators: formData.collaborators || []
                },
                metadata: {
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            };

            // Salva localmente
            if (this.useIndexedDB && this.db) {
                await this._saveToIndexedDB(data);
            } else {
                await this._saveToLocalStorage(data);
            }

            // Sincroniza com GitHub
            if (this.githubToken) {
                await this._saveToGitHub(data);
            }

            // Baixa arquivo também
            await this._autoDownloadForm(data);

            console.log(`✅ APR ${id} salva localmente${this.githubToken ? ' e no GitHub' : ''}`);
            return id;
        } catch (error) {
            console.error('❌ Erro ao salvar formulário:', error);
            throw error;
        }
    }

    /**
     * Salva arquivo no GitHub via API
     * @private
     */
    async _saveToGitHub(data) {
        if (!this.githubToken) {
            console.warn('⚠️ Token GitHub não configurado, pulando sincronização');
            return;
        }

        try {
            const fileName = `${data.id}.json`;
            const filePath = `${this.aprsFolder}/${fileName}`;
            const content = btoa(JSON.stringify(data, null, 2)); // Base64 encode
            
            // Primeiro tenta obter o arquivo existente para pegar a SHA
            let sha = null;
            try {
                const getResponse = await fetch(
                    `https://api.github.com/repos/${this.githubOwner}/${this.githubRepo}/contents/${filePath}`,
                    {
                        headers: {
                            'Authorization': `token ${this.githubToken}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );
                if (getResponse.ok) {
                    const fileData = await getResponse.json();
                    sha = fileData.sha;
                }
            } catch (e) {
                // Arquivo não existe ainda, isso é ok
            }

            // Cria ou atualiza o arquivo
            const putResponse = await fetch(
                `https://api.github.com/repos/${this.githubOwner}/${this.githubRepo}/contents/${filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.githubToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        message: `APR ${data.id} - ${data.form.step1?.responsavel || 'Sem responsável'}`,
                        content: content,
                        ...(sha && { sha }) // Incluir SHA se arquivo existe
                    })
                }
            );

            if (!putResponse.ok) {
                throw new Error(`GitHub API error: ${putResponse.status}`);
            }

            console.log(`✅ APR ${data.id} sincronizada no GitHub`);
            return true;
        } catch (error) {
            console.warn(`⚠️ Erro ao sincronizar com GitHub:`, error);
            return false;
        }
    }

    /**
     * Baixa arquivo JSON automaticamente quando APR é finalizada
     * @private
     */
    _autoDownloadForm(data) {
        return new Promise((resolve) => {
            try {
                const jsonString = JSON.stringify(data, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${data.id}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log(`📥 Arquivo ${data.id}.json baixado localmente`);
                resolve();
            } catch (error) {
                console.warn('⚠️ Erro ao baixar arquivo:', error);
                resolve();
            }
        });
    }

    /**
     * Salva dados no IndexedDB
     * @private
     */
    _saveToIndexedDB(data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(data.id);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Salva dados no localStorage como fallback
     * @private
     */
    _saveToLocalStorage(data) {
        return new Promise((resolve, reject) => {
            try {
                let allForms = JSON.parse(localStorage.getItem(this.fallbackKey)) || [];
                
                // Remove dados antigos se exceder 50 formulários
                if (allForms.length >= 50) {
                    allForms = allForms.slice(-49);
                    console.warn('⚠️ Limite de 50 formulários atingido. Mantendo os mais recentes.');
                }

                allForms.push(data);
                localStorage.setItem(this.fallbackKey, JSON.stringify(allForms));
                resolve(data.id);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Recupera um formulário pelo ID
     * @param {String} id - ID do formulário
     * @returns {Promise<Object|null>} Dados do formulário ou null
     */
    async getForm(id) {
        try {
            if (this.useIndexedDB && this.db) {
                return await this._getFromIndexedDB(id);
            } else {
                return this._getFromLocalStorage(id);
            }
        } catch (error) {
            console.error('❌ Erro ao recuperar formulário:', error);
            return null;
        }
    }

    /**
     * Recupera formulário do IndexedDB
     * @private
     */
    _getFromIndexedDB(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Recupera formulário do localStorage
     * @private
     */
    _getFromLocalStorage(id) {
        const allForms = JSON.parse(localStorage.getItem(this.fallbackKey)) || [];
        return allForms.find(form => form.id === id) || null;
    }

    /**
     * Lista todos os formulários salvos
     * @param {String} status - Filtrar por status (opcional)
     * @returns {Promise<Array>} Lista de formulários
     */
    async getAllForms(status = null) {
        try {
            if (this.useIndexedDB && this.db) {
                return await this._getAllFromIndexedDB(status);
            } else {
                return this._getAllFromLocalStorage(status);
            }
        } catch (error) {
            console.error('❌ Erro ao listar formulários:', error);
            return [];
        }
    }

    /**
     * Lista formulários do IndexedDB
     * @private
     */
    _getAllFromIndexedDB(status = null) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const index = store.index('timestamp');
            const request = index.getAll();

            request.onsuccess = () => {
                let forms = request.result.reverse(); // Mais recentes primeiro
                if (status) {
                    forms = forms.filter(f => f.status === status);
                }
                resolve(forms);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Lista formulários do localStorage
     * @private
     */
    _getAllFromLocalStorage(status = null) {
        let allForms = JSON.parse(localStorage.getItem(this.fallbackKey)) || [];
        allForms = allForms.reverse(); // Mais recentes primeiro
        
        if (status) {
            allForms = allForms.filter(f => f.status === status);
        }
        
        return allForms;
    }

    /**
     * Deleta um formulário
     * @param {String} id - ID do formulário
     * @returns {Promise<Boolean>} true se deletado, false caso contrário
     */
    async deleteForm(id) {
        try {
            if (this.useIndexedDB && this.db) {
                return await this._deleteFromIndexedDB(id);
            } else {
                return this._deleteFromLocalStorage(id);
            }
        } catch (error) {
            console.error('❌ Erro ao deletar formulário:', error);
            return false;
        }
    }

    /**
     * Deleta formulário do IndexedDB
     * @private
     */
    _deleteFromIndexedDB(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Deleta formulário do localStorage
     * @private
     */
    _deleteFromLocalStorage(id) {
        const allForms = JSON.parse(localStorage.getItem(this.fallbackKey)) || [];
        const filtered = allForms.filter(f => f.id !== id);
        
        if (filtered.length < allForms.length) {
            localStorage.setItem(this.fallbackKey, JSON.stringify(filtered));
            return true;
        }
        return false;
    }

    /**
     * Exporta todos os formulários como JSON
     * @param {String} status - Filtrar por status (opcional)
     * @returns {Promise<String>} JSON string com todos os formulários
     */
    async exportToJSON(status = null) {
        try {
            const forms = await this.getAllForms(status);
            const jsonData = {
                exportedAt: new Date().toISOString(),
                totalForms: forms.length,
                status: status || 'todos',
                forms: forms
            };
            
            return JSON.stringify(jsonData, null, 2);
        } catch (error) {
            console.error('❌ Erro ao exportar para JSON:', error);
            throw error;
        }
    }

    /**
     * Importa formulários de um arquivo JSON
     * @param {String} jsonString - String JSON com formulários
     * @returns {Promise<Object>} Resultado da importação
     */
    async importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (!data.forms || !Array.isArray(data.forms)) {
                throw new Error('Formato JSON inválido');
            }

            let imported = 0;
            let skipped = 0;

            for (const form of data.forms) {
                try {
                    const existing = await this.getForm(form.id);
                    if (!existing) {
                        await this._saveToIndexedDB(form);
                        imported++;
                    } else {
                        skipped++;
                    }
                } catch (error) {
                    console.warn(`⚠️ Erro ao importar formulário ${form.id}:`, error);
                    skipped++;
                }
            }

            const result = {
                imported,
                skipped,
                total: data.forms.length,
                message: `${imported} formulários importados, ${skipped} ignorados (já existentes).`
            };

            console.log(`✅ Importação concluída: ${result.message}`);
            return result;
        } catch (error) {
            console.error('❌ Erro ao importar JSON:', error);
            throw error;
        }
    }

    /**
     * Baixa um arquivo JSON com os formulários
     * @param {String} status - Filtrar por status (opcional)
     * @param {String} filename - Nome do arquivo (opcional)
     */
    async downloadJSON(status = null, filename = null) {
        try {
            const jsonString = await this.exportToJSON(status);
            const timestamp = new Date().toISOString().slice(0, 10);
            const finalFilename = filename || `apr-forms-${timestamp}.json`;

            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = finalFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log(`✅ Arquivo ${finalFilename} baixado com sucesso`);
        } catch (error) {
            console.error('❌ Erro ao baixar JSON:', error);
            throw error;
        }
    }

    /**
     * Obtém estatísticas dos formulários salvos
     * @returns {Promise<Object>} Estatísticas
     */
    async getStatistics() {
        try {
            const forms = await this.getAllForms();
            
            const stats = {
                totalForms: forms.length,
                byStatus: {},
                oldestForm: forms[forms.length - 1]?.timestamp || null,
                newestForm: forms[0]?.timestamp || null,
                diskUsage: this._estimateDiskUsage(forms)
            };

            forms.forEach(form => {
                const status = form.status || 'desconhecido';
                stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
            });

            return stats;
        } catch (error) {
            console.error('❌ Erro ao obter estatísticas:', error);
            return null;
        }
    }

    /**
     * Estima o uso de disco
     * @private
     */
    _estimateDiskUsage(forms) {
        const jsonString = JSON.stringify(forms);
        const bytes = new Blob([jsonString]).size;
        
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    /**
     * Limpa todos os dados (CUIDADO!)
     * @returns {Promise<Boolean>}
     */
    async clearAllData() {
        try {
            if (this.useIndexedDB && this.db) {
                return await this._clearIndexedDB();
            } else {
                return this._clearLocalStorage();
            }
        } catch (error) {
            console.error('❌ Erro ao limpar dados:', error);
            return false;
        }
    }

    /**
     * Limpa IndexedDB
     * @private
     */
    _clearIndexedDB() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Limpa localStorage
     * @private
     */
    _clearLocalStorage() {
        localStorage.removeItem(this.fallbackKey);
        return true;
    }
}

// Cria instância global
window.aprDataManager = new AprDataManager();
console.log('✅ AprDataManager inicializado');
