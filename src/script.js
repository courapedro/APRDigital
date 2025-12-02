// =================================================================
// FUNÇÕES GLOBAIS
// =================================================================

// FUNÇÃO PARA RECUPERAR DADOS DO STEP 1
window.getAprStep1Data = function() {
    const saved = localStorage.getItem('aprStep1Data');
    return saved ? JSON.parse(saved) : null;
};

// FUNÇÃO PARA RECUPERAR DADOS DO STEP 2
window.getAprStep2Data = function() {
    try {
        const saved = localStorage.getItem('aprStep2Data');
        console.log("🔍 getAprStep2Data - localStorage bruto:", saved);
        
        if (!saved) {
            console.warn("⚠️ getAprStep2Data - Nenhum dado encontrado no localStorage com chave 'aprStep2Data'");
            return null;
        }
        
        const result = JSON.parse(saved);
        console.log("✅ getAprStep2Data - dados parseados:", result);
        return result;
    } catch (error) {
        console.error("❌ getAprStep2Data - erro ao fazer parse:", error);
        return null;
    }
};

// FUNÇÃO PARA CONVERTER IDS EM LABELS DO STEP 2
window.getStep2LabelsFromIds = function(ids) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return [];
    }
    
    console.log("🔍 getStep2LabelsFromIds - IDs recebidos:", ids);
    
    const labels = [];
    
    if (typeof window.aprConfig === 'undefined' || !window.aprConfig.step2 || !window.aprConfig.step2.sections) {
        console.warn("❌ aprConfig.step2.sections não disponível");
        return ids; 
    }
    
    window.aprConfig.step2.sections.forEach((section) => {
        if (section.items && Array.isArray(section.items)) {
            section.items.forEach(item => {
                if (ids.includes(item.id)) {
                    labels.push(item.label);
                }
            });
        }
    });
    
    console.log("✅ Labels finais (Step 2):", labels);
    return labels;
};

// FUNÇÃO PARA RECUPERAR DADOS DO STEP 3
window.getAprStep3Data = function() {
    try {
        const saved = localStorage.getItem('aprStep3Data');
        console.log("🔍 getAprStep3Data - localStorage bruto:", saved);
        
        if (!saved) {
            console.warn("⚠️ getAprStep3Data - Nenhum dado encontrado no localStorage com chave 'aprStep3Data'");
            return null;
        }
        
        const result = JSON.parse(saved);
        console.log("✅ getAprStep3Data - dados parseados:", result);
        return result;
    } catch (error) {
        console.error("❌ getAprStep3Data - erro ao fazer parse:", error);
        return null;
    }
};

// FUNÇÃO PARA CONVERTER IDS EM LABELS DO STEP 3
window.getStep3LabelsFromIds = function(ids) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return [];
    }
    
    console.log("🔍 getStep3LabelsFromIds - IDs recebidos:", ids);
    
    const labels = [];
    
    if (typeof window.aprConfig === 'undefined' || !window.aprConfig.step3 || !window.aprConfig.step3.sections) {
        console.warn("❌ aprConfig.step3.sections não disponível");
        return ids;
    }
    
    window.aprConfig.step3.sections.forEach((section) => {
        if (section.items && Array.isArray(section.items)) {
            section.items.forEach(item => {
                if (ids.includes(item.id)) {
                    labels.push(item.label);
                }
            });
        }
    });
    
    console.log("✅ Labels finais (Step 3):", labels);
    return labels;
};

// FUNÇÃO PARA RECUPERAR DADOS DO STEP 4
window.getAprStep4Data = function() {
    try {
        const saved = localStorage.getItem('aprStep4Data');
        console.log("🔍 getAprStep4Data - localStorage bruto:", saved);
        
        if (!saved) {
            console.warn("⚠️ getAprStep4Data - Nenhum dado encontrado no localStorage com chave 'aprStep4Data'");
            return null;
        }
        
        const result = JSON.parse(saved);
        console.log("✅ getAprStep4Data - dados parseados:", result);
        return result;
    } catch (error) {
        console.error("❌ getAprStep4Data - erro ao fazer parse:", error);
        return null;
    }
};

// FUNÇÃO PARA CONVERTER IDS EM LABELS DO STEP 4
window.getStep4LabelsFromIds = function(ids) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return [];
    }
    
    console.log("🔍 getStep4LabelsFromIds - IDs recebidos:", ids);
    
    const labels = [];
    
    if (typeof window.aprConfig === 'undefined' || !window.aprConfig.step4 || !window.aprConfig.step4.sections) {
        console.warn("❌ aprConfig.step4.sections não disponível");
        return ids;
    }
    
    window.aprConfig.step4.sections.forEach((section) => {
        if (section.items && Array.isArray(section.items)) {
            section.items.forEach(item => {
                if (ids.includes(item.id)) {
                    labels.push(item.label);
                }
            });
        }
    });
    
    console.log("✅ Labels finais (Step 4):", labels);
    return labels;
};

// FUNÇÃO PARA RECUPERAR DADOS DO STEP 5
window.getAprStep5Data = function() {
    try {
        const saved = localStorage.getItem('aprStep5Data');
        console.log("🔍 getAprStep5Data - localStorage bruto:", saved);
        
        if (!saved) {
            console.warn("⚠️ getAprStep5Data - Nenhum dado encontrado no localStorage com chave 'aprStep5Data'");
            return null;
        }
        
        const result = JSON.parse(saved);
        console.log("✅ getAprStep5Data - dados parseados:", result);
        return result;
    } catch (error) {
        console.error("❌ getAprStep5Data - erro ao fazer parse:", error);
        return null;
    }
};

// FUNÇÃO PARA VERIFICAR SE UMA SEÇÃO É 100% NA
window.isSectionAllNA = function(section, answersData) {
    if (!answersData || !section.items || section.items.length === 0) {
        return false;
    }
    return section.items.every(item => answersData[item.id] === 'NA');
};

// ===============================================================
// 3. FUNÇÃO PARA SALVAR APR COMPLETADO
// ===============================================================
window.saveCompletedApr = async function() {
    try {
        // Coleta dados de todos os steps
        const formData = {
            step1: JSON.parse(localStorage.getItem('aprStep1Data')) || {},
            step2: JSON.parse(localStorage.getItem('aprStep2Data')) || {},
            step3: JSON.parse(localStorage.getItem('aprStep3Data')) || {},
            step4: JSON.parse(localStorage.getItem('aprStep4Data')) || {},
            step5: JSON.parse(localStorage.getItem('aprStep5Data')) || {},
            collaborators: JSON.parse(localStorage.getItem('aprCollaborators')) || []
        };

        console.log('📝 Dados sendo salvos:', formData);
        console.log('👥 Colaboradores:', formData.collaborators);

        // Salva no gerenciador de dados
        const aprId = await window.aprDataManager.saveForm(formData, 'concluido');
        
        console.log(`✅ APR salva com sucesso! ID: ${aprId}`);
        localStorage.setItem('lastAprId', aprId);
        
        return aprId;
    } catch (error) {
        console.error('❌ Erro ao salvar APR:', error);
        throw error;
    }
};

// ===============================================================
// 3.5 FUNÇÃO PARA CARREGAR APR SALVA
// ===============================================================
window.loadSavedApr = async function(aprId) {
    try {
        const form = await window.aprDataManager.getForm(aprId);
        
        if (!form) {
            console.warn(`⚠️ APR ${aprId} não encontrada`);
            return null;
        }

        localStorage.setItem('aprStep1Data', JSON.stringify(form.form.step1));
        localStorage.setItem('aprStep2Data', JSON.stringify(form.form.step2));
        localStorage.setItem('aprStep3Data', JSON.stringify(form.form.step3));
        localStorage.setItem('aprStep4Data', JSON.stringify(form.form.step4));
        localStorage.setItem('aprStep5Data', JSON.stringify(form.form.step5));
        localStorage.setItem('aprCollaborators', JSON.stringify(form.form.collaborators));

        console.log(`✅ APR ${aprId} carregada com sucesso`);
        return form;
    } catch (error) {
        console.error('❌ Erro ao carregar APR:', error);
        throw error;
    }
};

// ===============================================================
// 3.6 FUNÇÃO PARA LISTAR TODAS AS APRS SALVAS
// ===============================================================
window.listAllAprs = async function() {
    try {
        const forms = await window.aprDataManager.getAllForms();
        console.log(`📋 Total de APRs salvas: ${forms.length}`);
        
        forms.forEach(form => {
            console.log(`- ID: ${form.id} | Data: ${form.timestamp} | Status: ${form.status}`);
        });
        
        return forms;
    } catch (error) {
        console.error('❌ Erro ao listar APRs:', error);
        return [];
    }
};

// 1. FUNÇÃO PARA RENDERIZAR OS CARDS NA HOME
window.renderAprCards = function(cards, containerElement, filter, selectedDate) {
    let html = '';
    
    const filteredCards = cards.filter(card => {
        const matchesFilter = filter === 'Todos' || card.status === filter;
        if (!selectedDate) return matchesFilter;
        
        const [cardDateStr] = card.start.split(',');
        const [day, month, year] = cardDateStr.split('/');
        const cardDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        return matchesFilter && cardDate === selectedDate;
    });

    filteredCards.forEach(card => {
        html += `
            <div class="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-xl shadow-md flex flex-col space-y-4 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${card.title}</h3>
                    <span class="px-3 py-1 ${card.statusClass} text-xs font-semibold rounded-full">${card.status}</span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <div class="flex items-center">
                        <i data-lucide="user" class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"></i>
                        <span>Responsável: <strong>${card.responsible}</strong></span>
                    </div>
                    <div class="flex items-center">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"></i>
                        <span>Início: <strong>${card.start}</strong></span>
                    </div>
                    <div class="flex items-center">
                        <i data-lucide="calendar-off" class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"></i>
                        <span>Término: <strong>${card.end}</strong></span>
                    </div>
                </div>
            </div>
        `;
    });

    containerElement.innerHTML = html;
    lucide.createIcons(); 
}

// 2. FUNÇÃO DE TESTE DE PDF (MANTIDA)
window.generateSimplePdf = function() {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        console.error("jsPDF não está carregado.");
        return;
    }
    
    const nome = prompt("Digite seu NOME:");
    if (nome === null) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFillColor(11, 109, 170);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 26, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Protege+', 14, 17);
    doc.setFontSize(10);
    doc.text('APR Digital', 14, 24);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    const now = new Date();
    doc.text(`Gerado em: ${now.toLocaleString()}`, 14, 38);

    doc.setFontSize(20);
    doc.text(`Hello, ${nome}!`, 14, 56);

    doc.setFontSize(12);
    doc.text('Teste de Geração de PDF a partir do Menu Lateral.', 14, 66);

    doc.save(`hello_world_test_${nome}.pdf`);
    console.log("PDF de teste 'Hello World' gerado com sucesso.");
}

// ===============================================================
// 3. FUNÇÃO PARA GERAR PDF DO APR (VERSÃO COM FORMATAÇÃO MELHORADA)
// ===============================================================
window.generateAprPdf = async function() {
    console.log("Iniciando geração de PDF...");
    
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        console.error("jsPDF não está carregado.");
        alert("Erro: Biblioteca jsPDF não carregada. Recarregue a página.");
        return;
    }

    const step1Data = window.getAprStep1Data();
    const step2Data = window.getAprStep2Data();
    const step3Data = window.getAprStep3Data();
    const step4Data = window.getAprStep4Data();
    const step5Data = window.getAprStep5Data();
    
    if (!step1Data || (!step1Data.inicio && !step1Data.termino && !step1Data.responsavel && !step1Data.funcao && !step1Data.descricao)) {
        alert("Nenhum dado de APR encontrado. Por favor, preencha o Step 1.");
        return;
    }

    try {
        // Carregar logo como base64 ANTES de gerar o PDF
        let logoBase64 = null;
        try {
            const response = await fetch('/src/logo.jpeg');
            if (response.ok) {
                const blob = await response.blob();
                logoBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
                console.log('✅ Logo carregada com sucesso');
            }
        } catch (err) {
            console.warn('⚠️ Não foi possível carregar a logo:', err);
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const bottomMargin = 20;
        const topMargin = 40;
        const leftMargin = 15;
        const contentWidth = pageWidth - leftMargin * 2;
        
        // Cores
        const headerColor = [11, 109, 170];
        const sectionBorderColor = [200, 200, 200];
        const sectionBgColor = [245, 247, 250];
        
        let currentY = 0;
        
        // === FUNÇÃO PARA ADICIONAR MARCA D'ÁGUA ===
        const addWatermark = () => {
            if (!logoBase64) return;
            try {
                doc.setGState(new doc.GState({ opacity: 0.12 }));
                doc.addImage(logoBase64, 'JPEG', pageWidth / 2 - 62.5, pageHeight / 2 - 62.5, 125, 125);
                doc.setGState(new doc.GState({ opacity: 1 }));
                console.log('✅ Marca d\'água adicionada ao PDF');
            } catch (err) {
                console.warn('⚠️ Erro ao adicionar marca d\'água:', err);
            }
        };
        
        // === FUNÇÃO PARA DESENHAR CABEÇALHO ===
        const drawHeader = () => {
            doc.setFillColor(...headerColor);
            doc.rect(0, 0, pageWidth, 26, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text('Protege+', 14, 17);
            doc.setFontSize(10);
            doc.text('APR Digital', 14, 24);
            doc.setTextColor(0, 0, 0);
        };

        // === FUNÇÃO PARA DESENHAR SEÇÃO COM GRADE ===
        const drawSectionBox = (title, yPosition) => {
            const boxHeight = 8;
            const boxPadding = 2;
            
            // Fundo suave
            doc.setFillColor(...sectionBgColor);
            doc.rect(leftMargin - 2, yPosition - boxHeight + 1, contentWidth + 4, boxHeight + 1, 'F');
            
            // Borda fina
            doc.setDrawColor(...sectionBorderColor);
            doc.setLineWidth(0.3);
            doc.rect(leftMargin - 2, yPosition - boxHeight + 1, contentWidth + 4, boxHeight + 1);
            
            // Título
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(...headerColor);
            doc.text(title, leftMargin + boxPadding, yPosition - 1);
            doc.setTextColor(0, 0, 0);
            
            return yPosition + boxHeight + 2;
        };

        // === FUNÇÃO PARA QUEBRA DE PÁGINA ===
        const addPageIfNeeded = (requiredHeight = 10) => {
            if (currentY + requiredHeight > pageHeight - bottomMargin) {
                doc.addPage();
                drawHeader();
                addWatermark();
                currentY = topMargin;
            }
        };

        // === PÁGINA 1 - CABEÇALHO ===
        drawHeader();
        addWatermark();

        const now = new Date();
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Gerado em: ${now.toLocaleString('pt-BR')}`, leftMargin, 38);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('ANÁLISE PRELIMINAR DE RISCOS', leftMargin, 52);
        
        currentY = 62;

        // === STEP 1 - Registros Operacionais ===
        currentY = drawSectionBox('1. REGISTROS OPERACIONAIS', currentY);
        currentY += 3;

        // Função para formatar datetime-local para data/hora legível
        const formatDateTime = (dateTimeStr) => {
            if (!dateTimeStr) return '-';
            const [date, time] = dateTimeStr.split('T');
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year} às ${time}`;
        };

        const step1Rows = [
            ['Descrição da Atividade', step1Data.descricao || '-'],
            ['Responsável', step1Data.responsavel || '-'],
            ['Função', step1Data.funcao || '-'],
            ['Data/Hora Início', formatDateTime(step1Data.inicio)],
            ['Data/Hora Término', formatDateTime(step1Data.termino)]
        ];

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        step1Rows.forEach((row, idx) => {
            if (idx > 0) {
                doc.setDrawColor(...sectionBorderColor);
                doc.setLineWidth(0.1);
                doc.line(leftMargin, currentY - 1, pageWidth - leftMargin, currentY - 1);
            }
            
            doc.setFont(undefined, 'bold');
            doc.setTextColor(...headerColor);
            doc.setFontSize(9);
            doc.text(row[0] + ':', leftMargin + 3, currentY + 2);
            
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            const splitText = doc.splitTextToSize(row[1], contentWidth - 80);
            doc.text(splitText, leftMargin + 60, currentY + 2);
            currentY += Math.max(6, splitText.length * 4.5);
        });

        currentY += 8;

        // === STEP 2 - Perigos e Riscos ===
        if (step2Data && step2Data.selectedItems && step2Data.selectedItems.length > 0) {
            addPageIfNeeded(20);
            currentY = drawSectionBox('2. PERIGOS E RISCOS IDENTIFICADOS', currentY);
            currentY += 3;

            let itemsToDisplay2 = step2Data.selectedLabels && step2Data.selectedLabels.length > 0 
                ? step2Data.selectedLabels 
                : window.getStep2LabelsFromIds(step2Data.selectedItems);
            
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            itemsToDisplay2.forEach((label, idx) => {
                addPageIfNeeded(5);
                if (idx % 2 === 0) {
                    doc.setFillColor(249, 250, 251);
                    doc.rect(leftMargin, currentY - 4, contentWidth, 5, 'F');
                }
                doc.setTextColor(40, 40, 40);
                doc.text(`• ${label}`, leftMargin + 3, currentY);
                currentY += 5;
            });
            
            if (step2Data.outros && step2Data.outros.trim() !== '') {
                currentY += 3;
                doc.setFont(undefined, 'bold');
                doc.setTextColor(...headerColor);
                doc.text('Observações:', leftMargin + 3, currentY);
                currentY += 4;
                
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
                const splitOutros = doc.splitTextToSize(step2Data.outros, contentWidth - 10);
                splitOutros.forEach(line => {
                    addPageIfNeeded(5);
                    doc.text(line, leftMargin + 5, currentY);
                    currentY += 4;
                });
            }
            currentY += 5;
        }

        // === STEP 3 - Equipamentos de Proteção ===
        if (step3Data && step3Data.selectedItems && step3Data.selectedItems.length > 0) {
            addPageIfNeeded(20);
            currentY = drawSectionBox('3. EQUIPAMENTOS DE PROTEÇÃO (EPI/EPC)', currentY);
            currentY += 3;

            let itemsToDisplay3 = step3Data.selectedLabels && step3Data.selectedLabels.length > 0 
                ? step3Data.selectedLabels 
                : window.getStep3LabelsFromIds(step3Data.selectedItems);
            
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            itemsToDisplay3.forEach((label, idx) => {
                addPageIfNeeded(5);
                if (idx % 2 === 0) {
                    doc.setFillColor(245, 250, 245);
                    doc.rect(leftMargin, currentY - 4, contentWidth, 5, 'F');
                }
                doc.setTextColor(40, 40, 40);
                doc.text(`✓ ${label}`, leftMargin + 3, currentY);
                currentY += 5;
            });
            
            if (step3Data.outros && step3Data.outros.trim() !== '') {
                currentY += 3;
                doc.setFont(undefined, 'bold');
                doc.setTextColor(...headerColor);
                doc.text('Observações:', leftMargin + 3, currentY);
                currentY += 4;
                
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
                const splitOutros3 = doc.splitTextToSize(step3Data.outros, contentWidth - 10);
                splitOutros3.forEach(line => {
                    addPageIfNeeded(5);
                    doc.text(line, leftMargin + 5, currentY);
                    currentY += 4;
                });
            }
            currentY += 5;
        }

        // === STEP 4 - Medidas de Controle ===
        if (step4Data && step4Data.selectedItems && step4Data.selectedItems.length > 0) {
            addPageIfNeeded(20);
            currentY = drawSectionBox('4. MEDIDAS DE CONTROLE E PROTEÇÃO', currentY);
            currentY += 3;

            let itemsToDisplay4 = step4Data.selectedLabels && step4Data.selectedLabels.length > 0 
                ? step4Data.selectedLabels 
                : window.getStep4LabelsFromIds(step4Data.selectedItems);
            
            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            itemsToDisplay4.forEach((label, idx) => {
                addPageIfNeeded(5);
                if (idx % 2 === 0) {
                    doc.setFillColor(250, 245, 245);
                    doc.rect(leftMargin, currentY - 4, contentWidth, 5, 'F');
                }
                doc.setTextColor(40, 40, 40);
                doc.text(`→ ${label}`, leftMargin + 3, currentY);
                currentY += 5;
            });
            
            if (step4Data.outros && step4Data.outros.trim() !== '') {
                currentY += 3;
                doc.setFont(undefined, 'bold');
                doc.setTextColor(...headerColor);
                doc.text('Observações:', leftMargin + 3, currentY);
                currentY += 4;
                
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
                const splitOutros4 = doc.splitTextToSize(step4Data.outros, contentWidth - 10);
                splitOutros4.forEach(line => {
                    addPageIfNeeded(5);
                    doc.text(line, leftMargin + 5, currentY);
                    currentY += 4;
                });
            }
            currentY += 5;
        }

        // === STEP 5 - Itens de Verificação ===
        if (step5Data && step5Data.answers && Object.keys(step5Data.answers).length > 0) {
            const sectionsToShow = aprConfig.step5.sections.filter(section => 
                !window.isSectionAllNA(section, step5Data.answers)
            );
            
            if (sectionsToShow.length > 0) {
                addPageIfNeeded(15);
                currentY = drawSectionBox('5. ITENS DE VERIFICAÇÃO', currentY);
                currentY += 3;

                sectionsToShow.forEach((section) => {
                    addPageIfNeeded(10);
                    
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(...headerColor);
                    doc.text(`${section.name}:`, leftMargin + 3, currentY);
                    currentY += 6;
                    
                    let itemCount = 0;
                    section.items.forEach((item) => {
                        const answer = step5Data.answers[item.id];
                        if (answer === 'NA') return;
                        
                        addPageIfNeeded(5);
                        itemCount++;
                        
                        const bgColor = answer === 'SIM' ? [240, 255, 240] : [255, 245, 245];
                        if (itemCount % 2 === 0) {
                            doc.setFillColor(...bgColor);
                            doc.rect(leftMargin, currentY - 4, contentWidth, 5, 'F');
                        }
                        
                        doc.setFont(undefined, 'normal');
                        doc.setFontSize(8);
                        doc.setTextColor(40, 40, 40);
                        
                        const label = doc.splitTextToSize(item.label, contentWidth - 30);
                        doc.text(label, leftMargin + 3, currentY);
                        
                        const answerText = answer === 'SIM' ? '✓ SIM' : '✗ NÃO';
                        const answerColor = answer === 'SIM' ? [0, 128, 0] : [220, 0, 0];
                        doc.setTextColor(...answerColor);
                        doc.setFont(undefined, 'bold');
                        doc.text(answerText, pageWidth - leftMargin - 18, currentY);
                        doc.setTextColor(0, 0, 0);
                        
                        currentY += 5;
                    });
                    
                    currentY += 4;
                });
                currentY += 2;
            }
        }

        // === STEP 6 - Colaboradores ===
        console.log('🔍 [DEBUG] INÍCIO DO PROCESSAMENTO DE COLABORADORES');
        try {
            const collaboratorsJson = localStorage.getItem('aprCollaborators');
            console.log('📦 [DEBUG] localStorage.getItem("aprCollaborators") retornou:', collaboratorsJson);
            console.log('📦 [DEBUG] Tipo:', typeof collaboratorsJson);
            
            if (collaboratorsJson === null) {
                console.warn('⚠️ [DEBUG] aprCollaborators é null no localStorage');
            }
            
            let collaborators = [];
            if (collaboratorsJson) {
                try {
                    collaborators = JSON.parse(collaboratorsJson);
                    console.log('✅ [DEBUG] JSON.parse() bem-sucedido. Array:', collaborators);
                    console.log('✅ [DEBUG] Length:', collaborators.length);
                } catch (parseErr) {
                    console.error('❌ [DEBUG] Erro ao fazer parse JSON:', parseErr);
                    console.error('❌ [DEBUG] String que causou erro:', collaboratorsJson);
                }
            }
            
            console.log('📊 [DEBUG] Array final de colaboradores:', collaborators);
            console.log('📊 [DEBUG] É array?', Array.isArray(collaborators));
            console.log('📊 [DEBUG] Tem elementos?', collaborators.length > 0);
            
            if (collaborators && Array.isArray(collaborators) && collaborators.length > 0) {
                console.log('✅ [DEBUG] Condição passou! Adicionando colaboradores ao PDF');
                addPageIfNeeded(25);
                currentY = drawSectionBox('6. COLABORADORES', currentY);
                currentY += 3;

                // Verifica se autoTable está disponível de várias formas
                console.log('✅ [DEBUG] Verificando autoTable:');
                console.log('  - doc.autoTable?', typeof doc.autoTable);
                console.log('  - window.autoTable?', typeof window.autoTable);
                console.log('  - jsPDF.prototype.autoTable?', typeof window.jspdf.jsPDF.prototype.autoTable);
                
                // Tenta usar autoTable
                if (typeof doc.autoTable === 'function') {
                    console.log('✅ [DEBUG] Usando doc.autoTable()');
                    const rows = collaborators.map((c, idx) => {
                        console.log(`📝 [DEBUG] Colaborador ${idx}:`, c);
                        console.log(`  - function: ${c.function}`);
                        console.log(`  - name: ${c.name}`);
                        return [
                            c.function || '-', 
                            c.name || '-', 
                            '________________'
                        ];
                    });
                    
                    console.log('📝 [DEBUG] Rows finais para tabela:', rows);
                    
                    doc.autoTable({
                        head: [['Função', 'Nome', 'Assinatura']],
                        body: rows,
                        startY: currentY,
                        styles: { fontSize: 9 },
                        headStyles: { 
                            fillColor: headerColor, 
                            textColor: [255, 255, 255], 
                            fontStyle: 'bold',
                            lineColor: sectionBorderColor,
                            lineWidth: 0.3
                        },
                        bodyStyles: {
                            lineColor: sectionBorderColor,
                            lineWidth: 0.2
                        },
                        alternateRowStyles: {
                            fillColor: sectionBgColor
                        },
                        columnStyles: {
                            0: { cellWidth: 60 },
                            1: { cellWidth: 60 },
                            2: { cellWidth: 50 }
                        },
                        margin: { left: leftMargin }
                    });
                    currentY = doc.autoTable.previous.finalY + 5;
                    console.log('✅ [DEBUG] autoTable executado com sucesso');
                } else {
                    console.warn('⚠️ [DEBUG] doc.autoTable não é função, criando tabela manualmente');
                    // Fallback: criar tabela manualmente sem autoTable
                    const rowHeight = 8;
                    const colWidth1 = 60;
                    const colWidth2 = 60;
                    const colWidth3 = 50;
                    
                    // Cabeçalho - desenhar com bordas completas
                    doc.setFillColor(...headerColor);
                    doc.setTextColor(255, 255, 255);
                    doc.setFont(undefined, 'bold');
                    doc.setFontSize(9);
                    doc.setDrawColor(...sectionBorderColor);
                    doc.setLineWidth(0.3);
                    
                    // Desenhar retângulo do cabeçalho inteiro
                    doc.rect(leftMargin, currentY, colWidth1 + colWidth2 + colWidth3, rowHeight, 'F');
                    
                    // Linhas verticais do cabeçalho
                    doc.line(leftMargin + colWidth1, currentY, leftMargin + colWidth1, currentY + rowHeight);
                    doc.line(leftMargin + colWidth1 + colWidth2, currentY, leftMargin + colWidth1 + colWidth2, currentY + rowHeight);
                    
                    // Textos do cabeçalho
                    doc.text('Função', leftMargin + 2, currentY + 5);
                    doc.text('Nome', leftMargin + colWidth1 + 2, currentY + 5);
                    doc.text('Assinatura', leftMargin + colWidth1 + colWidth2 + 2, currentY + 5);
                    
                    currentY += rowHeight;
                    
                    // Linhas de dados
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    
                    collaborators.forEach((c, idx) => {
                        // Alternating background
                        if (idx % 2 === 0) {
                            doc.setFillColor(...sectionBgColor);
                            doc.rect(leftMargin, currentY, colWidth1 + colWidth2 + colWidth3, rowHeight, 'F');
                        }
                        
                        // Borders
                        doc.setDrawColor(...sectionBorderColor);
                        doc.setLineWidth(0.2);
                        doc.rect(leftMargin, currentY, colWidth1 + colWidth2 + colWidth3, rowHeight);
                        
                        // Linhas verticais
                        doc.line(leftMargin + colWidth1, currentY, leftMargin + colWidth1, currentY + rowHeight);
                        doc.line(leftMargin + colWidth1 + colWidth2, currentY, leftMargin + colWidth1 + colWidth2, currentY + rowHeight);
                        
                        // Text
                        doc.setTextColor(0, 0, 0);
                        doc.text((c.function || '-').substring(0, 30), leftMargin + 2, currentY + 5);
                        doc.text((c.name || '-').substring(0, 30), leftMargin + colWidth1 + 2, currentY + 5);
                        doc.text('________________', leftMargin + colWidth1 + colWidth2 + 2, currentY + 5);
                        
                        currentY += rowHeight;
                    });
                    
                    console.log('✅ [DEBUG] Tabela manual criada com sucesso');
                }
            } else {
                console.warn('⚠️ [DEBUG] Colaboradores vazios ou não é array');
                console.warn('  - collaborators:', collaborators);
                console.warn('  - Array.isArray:', Array.isArray(collaborators));
                console.warn('  - length:', collaborators ? collaborators.length : 'N/A');
            }
        } catch (e) {
            console.error('❌ [DEBUG] ERRO GERAL ao recuperar colaboradores:', e);
            console.error('Stack:', e.stack);
        }
        console.log('🔍 [DEBUG] FIM DO PROCESSAMENTO DE COLABORADORES');

        // === RODAPÉ ===
        const totalPages = doc.internal.pages.length;
        for (let i = 1; i < totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `Página ${i} de ${totalPages - 1}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }

        doc.save('APR_Registros_Operacionais.pdf');
        console.log("PDF gerado com sucesso!");
        alert("✅ PDF gerado com sucesso!");
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        alert("❌ Erro ao gerar PDF: " + error.message);
    }
}


// =================================================================
// DOM CONTENT LOADED (LÓGICA PRINCIPAL DA APLICAÇÃO)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    // Acesso ao jsPDF (assumindo que está carregado)
    const { jsPDF } = window.jspdf;

    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const dataForm = document.getElementById('data-form');
    const dataTableBody = document.getElementById('data-table-body');
    const generatePdfBtn = document.getElementById('generate-pdf-btn');

    function loadData() {
        const items = JSON.parse(localStorage.getItem('appData')) || [];
        if(!dataTableBody) return;
        
        dataTableBody.innerHTML = ''; 
        if (items.length === 0) {
            dataTableBody.innerHTML = '<tr><td colspan="3" class="p-4 text-center text-gray-500 dark:text-gray-400">Nenhum dado armazenado.</td></tr>';
        } else {
            items.forEach((item, index) => {
                const row = `
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td class="p-4 font-medium text-gray-800 dark:text-gray-100">${item.name}</td>
                        <td class="p-4 text-gray-600 dark:text-gray-300">${item.description}</td>
                        <td class="p-4">
                            <button onclick="deleteItem(${index})" class="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </td>
                    </tr>
                `;
                dataTableBody.innerHTML += row;
            });
            lucide.createIcons(); 
        }
    }
    
    window.deleteItem = function(index) {
        let items = JSON.parse(localStorage.getItem('appData')) || [];
        items.splice(index, 1);
        localStorage.setItem('appData', JSON.stringify(items));
        loadData();
    }

    if (dataForm) {
        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const itemName = document.getElementById('itemName').value;
            const itemDescription = document.getElementById('itemDescription').value;
            
            const newItem = { name: itemName, description: itemDescription };
            let items = JSON.parse(localStorage.getItem('appData')) || [];
            items.push(newItem);
            localStorage.setItem('appData', JSON.stringify(items));
            
            dataForm.reset();
            loadData();
        });
    }

    if (generatePdfBtn) {
        generatePdfBtn.addEventListener('click', () => {
            const items = JSON.parse(localStorage.getItem('appData')) || [];
            if (items.length === 0) {
                console.warn("Nenhum dado para gerar PDF.");
                return;
            }

            const doc = new jsPDF();

            // Cabeçalho
            doc.setFillColor(11, 109, 170);
            doc.rect(0, 0, doc.internal.pageSize.getWidth(), 26, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text('Protege+', 14, 17);
            doc.setFontSize(10);
            doc.text('APR Digital', 14, 24);

            // Timestamp
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            const now = new Date();
            doc.text(`Gerado em: ${now.toLocaleString()}`, 14, 38);

            // Título
            doc.setFontSize(18);
            doc.text('Relatório de Dados', 14, 50);

            const tableColumn = ["Nome do Item", "Descrição"];
            const tableRows = items.map(item => [item.name, item.description]);

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 56,
            });

            doc.save('relatorio-dados.pdf');
        });
    }

    function navigateTo(hash) {
        const targetPage = document.querySelector(hash);

        pages.forEach(p => p.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
        if (activeLink) activeLink.classList.add('active');

        if (targetPage) {
            targetPage.classList.add('active');
            if (hash === '#item1') {
                loadData();
            }
        } else {
            document.getElementById('home').classList.add('active');
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if(homeLink) homeLink.classList.add('active');
        }
        
        lucide.createIcons(); 
    }

    window.addEventListener('hashchange', () => navigateTo(location.hash));
    
    document.getElementById('main-nav').addEventListener('click', (e) => {
        const link = e.target.closest('a.nav-link');
        if (link && link.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const hash = link.getAttribute('href');
            if (location.hash !== hash) {
                history.pushState(null, '', hash);
                navigateTo(hash);
            }
        }
    });

    if (location.hash) {
        navigateTo(location.hash);
    } else {
        navigateTo('#home');
    }
});