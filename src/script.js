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

window.handleLogout = function() {
    localStorage.removeItem('isAuthenticated');
    window.location.replace('./src/login.html');
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
// 3. FUNÇÃO PARA GERAR PDF DO APR (VERSÃO CORRIGIDA)
// ===============================================================
window.generateAprPdf = function() {
    console.log("Iniciando geração de PDF...");
    
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        console.error("jsPDF não está carregado.");
        alert("Erro: Biblioteca jsPDF não carregada. Recarregue a página.");
        return;
    }

    // Recupera todos os dados
    const step1Data = window.getAprStep1Data();
    const step2Data = window.getAprStep2Data();
    const step3Data = window.getAprStep3Data();
    const step4Data = window.getAprStep4Data();
    const step5Data = window.getAprStep5Data();
    
    console.log("📊 Dados Step 1:", step1Data);
    console.log("📊 Dados Step 2:", step2Data);
    console.log("📊 Dados Step 3:", step3Data);
    console.log("📊 Dados Step 4:", step4Data);
    console.log("📊 Dados Step 5:", step5Data);
    
    if (!step1Data || (!step1Data.inicio && !step1Data.termino && !step1Data.responsavel && !step1Data.funcao && !step1Data.descricao)) {
        alert("Nenhum dado de APR encontrado. Por favor, preencha o Step 1.");
        console.warn("Dados do step 1 vazios ou nulos");
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // === VARIÁVEIS DE CONTROLE DE PÁGINA ===
        let currentY = 0; // Posição Y atual (será definida após o cabeçalho/tabela)
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const bottomMargin = 20; // Margem inferior
        const topMargin = 40;    // Margem superior (para recomeçar após header)
        const leftMargin = 15;   // Margem esquerda
        const contentWidth = pageWidth - leftMargin * 2;
        
        // === FUNÇÃO HELPER PARA CABEÇALHO ===
        const drawHeader = () => {
            doc.setFillColor(11, 109, 170); // azul
            doc.rect(0, 0, pageWidth, 26, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text('Protege+', 14, 17);
            doc.setFontSize(10);
            doc.text('APR Digital', 14, 24);
            doc.setTextColor(0, 0, 0); // Reseta cor
        };

        // === FUNÇÃO HELPER PARA QUEBRA DE PÁGINA ===
        const addPageIfNeeded = (requiredHeight = 10) => {
            if (currentY + requiredHeight > pageHeight - bottomMargin) {
                doc.addPage();
                drawHeader();
                currentY = topMargin; // Reinicia o Y na nova página
            }
        };

        // === PÁGINA 1 ===

        // Cabeçalho da primeira página
        drawHeader();

        // Informações de data/hora
        doc.setFontSize(11);
        const now = new Date();
        doc.text(`Gerado em: ${now.toLocaleString('pt-BR')}`, leftMargin, 38);

        // Título do relatório
        doc.setFontSize(18);
        doc.text('Relatório de APR - Registros Operacionais', leftMargin, 50);

        // Tabela com dados do step 1
        const tableColumn = ["Campo", "Valor"];
        const tableRows = [
            ["Data/Hora Início", step1Data.inicio || "-"],
            ["Data/Hora Término", step1Data.termino || "-"],
            ["Responsável", step1Data.responsavel || "-"],
            ["Função", step1Data.funcao || "-"],
            ["Descrição da Atividade", step1Data.descricao || "-"]
        ];

        // Tenta usar autoTable
        if (doc.autoTable && typeof doc.autoTable === 'function') {
            console.log("Usando autoTable para criar tabela");
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 60,
                theme: 'grid',
                headerStyles: {
                    fillColor: [11, 109, 170],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                bodyStyles: {
                    textColor: [0, 0, 0]
                },
                columnStyles: {
                    0: { cellWidth: 50 },
                    1: { cellWidth: 130 }
                }
            });
            // ✅ DEFINE O currentY INICIAL APÓS A TABELA
            currentY = doc.autoTable.previous.finalY;
            
        } else {
            // Fallback manual (Simplificado - autoTable é recomendado)
            console.warn("autoTable não disponível, usando fallback.");
            currentY = 60; 
            tableRows.forEach(row => {
                doc.text(`${row[0]}: ${row[1]}`, leftMargin, currentY);
                currentY += 8;
            });
        }

        // === STEP 2 - Perigos e Riscos ===
        if (step2Data && step2Data.selectedItems && step2Data.selectedItems.length > 0) {
            console.log("✅ Adicionando Step 2 ao PDF");
            
            currentY += 15; // Espaçamento antes da seção
            addPageIfNeeded(10); // Verifica espaço para o título
            
            // Título Step 2
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('2. Perigos e Riscos', leftMargin, currentY);
            currentY += 10;
            
            // Itens Selecionados
            let itemsToDisplay2 = step2Data.selectedLabels && step2Data.selectedLabels.length > 0 
                ? step2Data.selectedLabels 
                : window.getStep2LabelsFromIds(step2Data.selectedItems);
            
            addPageIfNeeded(6);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Itens Selecionados:', leftMargin, currentY);
            currentY += 6;
            
            itemsToDisplay2.forEach((label) => {
                addPageIfNeeded(6); // Verifica espaço para CADA item
                doc.setFontSize(9);
                doc.text(`• ${label}`, leftMargin + 5, currentY);
                currentY += 6;
            });
            
            // Campo Outros
            if (step2Data.outros && step2Data.outros.trim() !== '') {
                currentY += 5;
                addPageIfNeeded(12); // Espaço para título + 1ª linha
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text('Observações Adicionais:', leftMargin, currentY);
                currentY += 6;
                
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                const splitOutros = doc.splitTextToSize(step2Data.outros, contentWidth - 5);
                
                splitOutros.forEach(line => {
                    addPageIfNeeded(5); // Verifica espaço por linha
                    doc.text(line, leftMargin + 5, currentY);
                    currentY += 5;
                });
            }
        }

        // === STEP 3 - Equipamentos de Proteção ===
        if (step3Data && step3Data.selectedItems && step3Data.selectedItems.length > 0) {
            console.log("✅ Adicionando Step 3 ao PDF");
            
            currentY += 15;
            addPageIfNeeded(10);
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('3. Equipamentos de Proteção', leftMargin, currentY);
            currentY += 10;
            
            let itemsToDisplay3 = step3Data.selectedLabels && step3Data.selectedLabels.length > 0 
                ? step3Data.selectedLabels 
                : window.getStep3LabelsFromIds(step3Data.selectedItems);
            
            addPageIfNeeded(6);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Itens Selecionados:', leftMargin, currentY);
            currentY += 6;
            
            itemsToDisplay3.forEach((label) => {
                addPageIfNeeded(6);
                doc.setFontSize(9);
                doc.text(`• ${label}`, leftMargin + 5, currentY);
                currentY += 6;
            });
            
            if (step3Data.outros && step3Data.outros.trim() !== '') {
                currentY += 5;
                addPageIfNeeded(12);
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text('Observações Adicionais:', leftMargin, currentY);
                currentY += 6;
                
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                const splitOutros3 = doc.splitTextToSize(step3Data.outros, contentWidth - 5);
                splitOutros3.forEach(line => {
                    addPageIfNeeded(5);
                    doc.text(line, leftMargin + 5, currentY);
                    currentY += 5;
                });
            }
        }

        // === STEP 4 - Medidas de Controle e Proteção ===
        if (step4Data && step4Data.selectedItems && step4Data.selectedItems.length > 0) {
            console.log("✅ Adicionando Step 4 ao PDF");
            
            currentY += 15;
            addPageIfNeeded(10);
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('4. Medidas de Controle e Proteção', leftMargin, currentY);
            currentY += 10;
            
            let itemsToDisplay4 = step4Data.selectedLabels && step4Data.selectedLabels.length > 0 
                ? step4Data.selectedLabels 
                : window.getStep4LabelsFromIds(step4Data.selectedItems);
            
            addPageIfNeeded(6);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text('Itens Selecionados:', leftMargin, currentY);
            currentY += 6;
            
            itemsToDisplay4.forEach((label) => {
                addPageIfNeeded(6);
                doc.setFontSize(9);
                doc.text(`• ${label}`, leftMargin + 5, currentY);
                currentY += 6;
            });
            
            if (step4Data.outros && step4Data.outros.trim() !== '') {
                currentY += 5;
                addPageIfNeeded(12);
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text('Observações Adicionais:', leftMargin, currentY);
                currentY += 6;
                
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                const splitOutros4 = doc.splitTextToSize(step4Data.outros, contentWidth - 5);
                splitOutros4.forEach(line => {
                    addPageIfNeeded(5);
                    doc.text(line, leftMargin + 5, currentY);
                    currentY += 5;
                });
            }
        }

        // === STEP 5 - Itens de Verificação ===
        if (step5Data && step5Data.answers && Object.keys(step5Data.answers).length > 0) {
            console.log("✅ Adicionando Step 5 ao PDF");
            
            const sectionsToShow = aprConfig.step5.sections.filter(section => 
                !window.isSectionAllNA(section, step5Data.answers)
            );
            
            if (sectionsToShow.length > 0) {
                currentY += 15;
                addPageIfNeeded(10);
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('5. Itens de Verificação', leftMargin, currentY);
                currentY += 10;
                
                sectionsToShow.forEach((section) => {
                    addPageIfNeeded(8); // Espaço para título da seção
                    
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.text(section.name, leftMargin, currentY);
                    currentY += 8;
                    
                    section.items.forEach((item) => {
                        const answer = step5Data.answers[item.id];
                        
                        // Ignora itens N/A (já que a seção não é 100% N/A)
                        if (answer === 'NA') return; 
                        
                        const label = `${item.label}`;
                        const answerText = answer === 'SIM' ? '✓ SIM' : '✗ NÃO';
                        const answerColor = answer === 'SIM' ? [0, 128, 0] : [255, 0, 0];
                        
                        const wrappedLabel = doc.splitTextToSize(label, contentWidth - 30);
                        const itemHeight = Math.max(8, wrappedLabel.length * 5) + 2;
                        
                        addPageIfNeeded(itemHeight); // Verifica espaço para o item
                        
                        doc.setFont(undefined, 'normal');
                        doc.setFontSize(9);
                        doc.text(wrappedLabel, leftMargin + 5, currentY);
                        
                        doc.setTextColor(...answerColor);
                        doc.setFont(undefined, 'bold');
                        doc.text(answerText, pageWidth - leftMargin - 20, currentY);
                        doc.setTextColor(0, 0, 0); // Reseta cor
                        
                        currentY += itemHeight;
                    });
                    
                    currentY += 5; // Espaço entre seções
                });
            }
        }

        // === STEP 6 - Colaboradores (salvos em localStorage.aprCollaborators) ===
        try {
            const collaborators = JSON.parse(localStorage.getItem('aprCollaborators')) || [];
            if (collaborators && collaborators.length > 0) {
                currentY += 15;
                addPageIfNeeded(20);

                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text('6. Colaboradores', leftMargin, currentY);
                currentY += 10;

                // Tenta usar autoTable para compactar espaço
                if (doc.autoTable && typeof doc.autoTable === 'function') {
                    const rows = collaborators.map(c => [c.function || '-', c.name || '-', '']);
                    doc.autoTable({
                        head: [['Função', 'Nome', 'Assinatura (assinar em papel)']],
                        body: rows,
                        startY: currentY,
                        styles: { fontSize: 9 },
                        headStyles: { fillColor: [230,230,230], textColor: [0,0,0], fontStyle: 'bold' },
                        columnStyles: {
                            0: { cellWidth: 60 },
                            1: { cellWidth: contentWidth - 140 },
                            2: { cellWidth: 60 }
                        }
                    });
                    currentY = doc.autoTable.previous.finalY + 5;
                } else {
                    // Fallback manual: desenha linhas com espaço para assinatura
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.text('Função', leftMargin, currentY);
                    doc.text('Nome', leftMargin + 90, currentY);
                    doc.text('Assinatura', leftMargin + contentWidth - 60, currentY);
                    currentY += 8;

                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(9);
                    collaborators.forEach(col => {
                        addPageIfNeeded(10);
                        doc.text(col.function || '-', leftMargin, currentY);
                        doc.text(col.name || '-', leftMargin + 90, currentY);
                        // linha para assinatura (em branco) – posição X calculada
                        const sigX = leftMargin + contentWidth - 60;
                        const sigY = currentY + 3;
                        doc.setDrawColor(120);
                        doc.setLineWidth(0.5);
                        doc.line(sigX, sigY, sigX + 50, sigY);
                        doc.setDrawColor(0);
                        currentY += 12;
                    });
                }
            }
        } catch (e) {
            console.warn('Erro ao recuperar colaboradores para o PDF:', e);
        }

        // === FIM ===
        doc.save('APR_Registros_Operacionais.pdf');
        console.log("PDF de APR gerado com sucesso.");
        alert("✅ PDF gerado com sucesso! Verifique sua pasta de downloads.");
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        console.error("Stack trace:", error.stack);
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