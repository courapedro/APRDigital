const aprConfig = {
    step2: {
        title: "Perigos, Riscos e Atividades Adicionais",
        sections: [
            {
                // Antigos Perigos/Atividades (Parte 1)
                name: "Atividades e Perigos Operacionais",
                items: [
                    { id: 'chk-limpeza', label: 'Atividade de Limpeza' },
                    { id: 'chk-telhado', label: 'Trabalho sobre Telhado' },
                    { id: 'chk-veiculo', label: 'Uso de Veículo' },
                    { id: 'chk-cantosvivos', label: 'Contato ferramentas, equipamentos e peças com cantos vivos' },
                    { id: 'chk-pisoescorregadio', label: 'Piso Escorregadio' },
                    { id: 'chk-poeira', label: 'Exposição a Poeiras' },
                    { id: 'chk-trabalhoquente', label: 'Trabalho a quente ou projeção faíscas em áreas com risco de explosão' },
                    { id: 'chk-animais', label: 'Animais peçonhentos' },
                    { id: 'chk-gases', label: 'Exposição a gases' },
                    { id: 'chk-contatoquimico', label: 'Contato de produto químico' },
                    { id: 'chk-graos', label: 'Desimpedimento de grãos' },
                    { id: 'chk-terceiros', label: 'Expor terceiros a perigos' },
                    { id: 'chk-inflamaveis', label: 'Produtos Inflamáveis' },
                    { id: 'chk-levantamento', label: 'Içamento de peças/objetos' },
                    { id: 'chk-transporte', label: 'Transporte manual de peso' },
                    { id: 'chk-soldagem', label: 'Processo de soldagem' },
                    { id: 'chk-movimentacao', label: 'Movimentação de máquinas e equipamentos' },
                    { id: 'chk-ceua', label: 'Trabalho a céu aberto' },
                ]
            },
            {
                // Novos Riscos/Consequências (Parte 2)
                name: "Riscos de Acidentes e Consequências",
                items: [
                    { id: 'chk-projecao', label: 'Projeção de partículas' },
                    { id: 'chk-ruido', label: 'Ruído' },
                    { id: 'chk-quedaand', label: 'Queda de andaimes' },
                    { id: 'chk-qmesmonivel', label: 'Queda de mesmo nível' },
                    { id: 'chk-afogamento', label: 'Afogamento' },
                    { id: 'chk-explosao', label: 'Explosão' },
                    { id: 'chk-abalroamento', label: 'Abalroamento' },

                    { id: 'chk-quedaobj', label: 'Queda de objetos em geral' },
                    { id: 'chk-qnivel', label: 'Queda de nível diferente' },
                    { id: 'chk-contaminacao', label: 'Contaminação' },
                    { id: 'chk-choque', label: 'Choque elétrico' },
                    { id: 'chk-radiacao', label: 'Radiação não ionizante' },
                    { id: 'chk-soterramento', label: 'Soterramento' },
                    { id: 'chk-fumos', label: 'Exposição a fumos metálicos' },
                ]
            }
        ],
    },
    step3: {
        title: "Perigos, Riscos e Atividades Adicionais",
        sections: [
            {
                // Antigos Perigos/Atividades (Parte 1)
                name: "Equipamentos de Proteção Necessários para Desenvolvimento Seguro das Atividades",
                items: [
                    { id: 'epi-calcadosg', label: 'Calçado de Segurança' },
                    { id: 'epi-aventalpvc', label: 'Avental de PVC' },
                    { id: 'epi-calcadopvc', label: 'Calçado de PVC' },
                    { id: 'epi-luvaisolbaix', label: 'Luva Isolante Baixa' },
                    { id: 'epi-cinto', label: 'Cinto Tipo Paraquedista' },
                    { id: 'epi-luvaisolalt', label: 'Luva Isolante Alta' },
                    { id: 'epi-travaqueda', label: 'Trava Queda' },
                    { id: 'epi-luvalatex', label: 'Luva Látex' },
                    { id: 'epi-talabarte', label: 'Talabarte Y (Aço-Corda)' },
                    { id: 'epi-luvaraspa', label: 'Luva Raspa' },
                    { id: 'epi-protetorp', label: 'Protetor auditivo Tipo Plug' },
                    { id: 'epi-luva-vaqueta', label: 'Luva Vaqueta' },
                    { id: 'epi-mangraspa', label: 'Mangote de Raspa' },
                    { id: 'epi-mascsold', label: 'Máscara de Soldador' },
                    { id: 'epi-protetor-conc', label: 'Protetor auditivo Tipo Concha' },
                    { id: 'epi-luvaaco', label: 'Luva Malha de aço' },
                    { id: 'epi-luvanitril', label: 'Luva Nitrílica' },
                    { id: 'epi-resp-pff1', label: 'Respirador (Poeiras, Névoas) (PFF1)' },
                    { id: 'epi-resp-pff2', label: 'Respirador (Poeiras, Névoas e Fumos) (PFF2)' },
                    { id: 'epi-capachuva', label: 'Capa de Chuva' },
                    { id: 'epi-resp-pff3', label: 'Respirador (Aerodispersóides) (PFF3)' },
                    { id: 'epi-oculos', label: 'Óculos de Segurança' },
                    { id: 'epi-resp-vap', label: 'Respirador para Vapores Orgânicos' },
                    { id: 'epi-capacete', label: 'Capacete' },
                    { id: 'epi-aventalraspa', label: 'Avental de Raspa' },
                    { id: 'epi-protetorsolar', label: 'Protetor Solar' },
                    { id: 'epi-protetorfacial', label: 'Protetor Facial' }
                ]
            },
            {
                name: "Equipamento de Proteção Coletiva",
                items: [
                    { id: 'epc-linhadevida', label: 'Linha de Vida Móvel' },
                    { id: 'epc-guardacorpo', label: 'Guarda Corpo' },
                    { id: 'epc-ferramentaisoladas', label: 'Conjunto de Ferramentas Isoladas' },
                    { id: 'epc-coberturaisolante', label: 'Cobertura Isolante' },
                    { id: 'epc-bloqueio', label: 'Bloqueio / Cartão de Bloqueio' },
                    { id: 'epc-protecao-faiscas', label: 'Proteção Contra Faíscas' },
                ]
            },
            {
                name: "Sinalização Coletiva",
                items: [
                    { id: 'sinalizacao-cones', label: 'Cones de Sinalização' },
                    { id: 'sinalizacao-placas', label: 'Placas de Sinalização' },
                    { id: 'sinalizacao-fitas', label: 'Fitas de Sinalização' }
                ]
            }
        ],
    },
    step4: {
        title: "Ações Preventivas",
        sections: [
            {
                name: "Ações e Medidas Preventivas",
                items: [
                    // Coluna Esquerda
                    { id: 'ap-analisar-ambiente', label: 'Analisar o ambiente antes de iniciar o trabalho' },
                    { id: 'ap-nao-ficar-suspensa', label: 'Não ficar/passar embaixo de cargas suspensas' },
                    { id: 'ap-inspecionar-oxicorte', label: 'Inspecionar o conjunto oxicorte' },
                    { id: 'ap-informar-pessoal', label: 'Informar pessoal da área e arredores' },
                    { id: 'ap-uso-guarda-corpo', label: 'Uso de guarda-corpo e rodapé no andaime' },
                    { id: 'ap-acender-macarico', label: 'Acender somente com acendedor de maçarico' },
                    { id: 'ap-desenergizar', label: 'Desenergizar as redes elétricas' },
                    { id: 'ap-andaimes-travados', label: 'Andaimes com rodas e elementos travados' },
                    { id: 'ap-cuidados-parte-eletrica', label: 'Cuidados com parte elétrica, cabos e extensões' },
                    { id: 'ap-utilizar-linha-vida', label: 'Utilizar linha de vida' },
                    { id: 'ap-transporte-seguro', label: 'Transporte seguro de ferramentas e materiais' },
                    { id: 'ap-colaboradores-capacitados', label: 'Colaboradores capacitados e treinados' },
                    { id: 'ap-armazenamento-adequado-equipamentos', label: 'Armazenamento adequado de equipamentos' },
                    { id: 'ap-ventilacao-espaco', label: 'Ventilação de espaço confinado' },
                    { id: 'ap-aterramento', label: 'Aterramento Adequado' },
                    { id: 'ap-manuseio-rotativas', label: 'Manuseio de Ferramenta rotativas' },
                    { id: 'ap-trabalhos-altura', label: 'Trabalhos em Altura' },
                    { id: 'ap-detector-gases', label: 'Utilização de detector de gases' },
                    { id: 'ap-escada-liberada', label: 'Escada Liberada' },
                    
                    // Coluna Direita
                    { id: 'ap-trabalhador-desligamento', label: 'Trabalhador que realizará desligamento e/ou ligação da parte elétrica legalmente habilitado' },
                    { id: 'ap-manter-sinalizadas', label: 'Manter áreas sinalizadas e isoladas' },
                    { id: 'ap-ancorar-andaime', label: 'Ancorar andaime' },
                    { id: 'ap-valvula-retrocess', label: 'Possui válvula contra retrocesso de chama' },
                    { id: 'ap-ferramentas-boas-cond', label: 'Ferramentas em boas condições de conservação' },
                    { id: 'ap-andaimes-forracao', label: 'Andaimes com forração completa' },
                    { id: 'ap-nao-movimentar-andaime', label: 'Não movimentar andaime c/ pessoas em cima' },
                    { id: 'ap-utilizar-bloqueios', label: 'Utilizar Bloqueios/Cartões de Bloqueios' },
                    { id: 'ap-andaimes-diagonais', label: 'Andaimes com diagonais instalados' },
                    { id: 'ap-armazenar-inflamavel', label: 'Armazenar inflamável em local adequado' },
                    { id: 'ap-armazenamento-materiais', label: 'Armazenamento adequado de materiais' },
                    { id: 'ap-escada-antiderrapante', label: 'Escada com pé de borracha antiderrapante.' },
                    { id: 'ap-cilindros-gas', label: 'Manter cilindros de gás na vertical, amarrados, local seguro, afastados de combustíveis.' },
                    { id: 'ap-trabalhos-confinados', label: 'Trabalhos em Locais Confinados' },
                    { id: 'ap-fispqs', label: 'FISPQ/s para consulta' },
                    { id: 'ap-iluminacao', label: 'Iluminação Adequada' },
                    { id: 'ap-andaime-liberado', label: 'Andaime Liberado' },
                    { id: 'ap-gases-vapores', label: 'Gases e Vapores' },
                    { id: 'ap-extintor', label: 'Extintor de Incêndios' },
                ]
            }
        ],
    },
    step5: {
        title: "Itens de Verificação",
        sections: [
            {
                name: "8.1. Ordem Geral",
                items: [
                    { id: 'verif-811', label: 'Os colaboradores estão aptos para a execução do trabalho?' },
                    { id: 'verif-812', label: 'O horário está adequado para a realização do trabalho?' }
                ]
            },
            {
                name: "8.2. Máquinas e Equipamentos",
                items: [
                    { id: 'verif-821', label: 'As partes móveis estão devidamente protegidas?' },
                    { id: 'verif-822', label: 'A máquina é operada por pessoa autorizada?' },
                    { id: 'verif-823', label: 'A máquina possui dispositivo de parada de emergência?' },
                    { id: 'verif-824', label: 'Foram analisados e protegidos todos os pontos que tem risco de corte, prensamento?' }
                ]
            },
            {
                name: "8.3. Trabalho em Altura",
                items: [
                    { id: 'verif-831', label: 'As condições ambientais para realização do trabalho estão adequadas?' },
                    { id: 'verif-832', label: 'Os equipamentos de proteção coletiva e individual estão em conformidade?' },
                    { id: 'verif-833', label: 'Há condições de ancorar o cinto de segurança em estrutura firme e independente?' },
                    { id: 'verif-834', label: 'O andaime está travado, nivelado, amarrado, forrado com tábuas adequadas, possui guarda-corpo no topo, etc?' },
                    { id: 'verif-835', label: 'A escada móvel é adequada ao uso, está amarrada, apoiada em solo firme, etc?'},
                    { id: 'verif-836', label: 'Foram tomadas medidas para evitar queda de objetos na área de trabalho e circulação?' },
                    { id: 'verif-837', label: 'As plataformas, escada marinheiro, passarelas e/ou pisos de trabalho encontram-se em boas condições e oferecem segurança?' },
                    { id: 'verif-838', label: 'A área de trabalho foi isolada e sinalizada?'}
                ]
            },
            {
                name: "8.4. Trabalho com Eletricidade",
                items: [
                    { id: 'verif-841', label: 'O trabalhador que realizará o desligamento e/ou ligação da parte elétrica é legalmente habilitado?' },
                    { id: 'verif-842', label: 'A rede elétrica foi desenergizada e bloqueada?' },
                    { id: 'verif-843', label: 'Foram utilizados equipamentos de proteção coletiva e individual adequados?' },
                    { id: 'verif-844', label: 'As ferramentas utilizadas são isoladas e estão em boas condições de uso?' },
                    { id: 'verif-845', label: 'As áreas próximas à rede elétrica foram isoladas e sinalizadas?'},
                    { id: 'verif-846', label: 'Foi realizado o aterramento adequado das partes condutoras?' }
                ]
            },
            {
                name: "8.5. Operações com produtos químicos e inflamáveis",
                items: [
                    { id: 'verif-851', label: 'Os produtos químicos e inflamáveis estão armazenados em local adequado?' },
                    { id: 'verif-852', label: 'Estão disponíveis as FISPQs para consulta?' },
                    { id: 'verif-853', label: 'Foram utilizados equipamentos de proteção coletiva e individual adequados?' },
                    { id: 'verif-854', label: 'A área de trabalho foi isolada e sinalizada?' },
                    { id: 'verif-855', label: 'Há extintores de incêndio adequados próximos à área de trabalho?' },
                    { id: 'verif-856', label: 'Foi realizado o monitoramento de gases e vapores quando necessário?' }
                ]
            },
            {
                name: "8.6. Movimentação de Carga",
                items: [
                    { id: 'verif-861', label: 'A carga está devidamente acondicionada e equilibrada?' },
                    { id: 'verif-862', label: 'O equipamento de içamento está em boas condições e com capacidade adequada?' },
                    { id: 'verif-863', label: 'A área de trabalho foi isolada e sinalizada?' },
                    { id: 'verif-864', label: 'Os colaboradores envolvidos estão capacitados para a operação?' },
                    { id: 'verif-865', label: 'Foram observadas as condições ambientais para realização do içamento?'},
                    { id: 'verif-866', label: 'A movimentação de carga foi devidamente analisade e planejada?' }
                ]
            }
        ],
    },
    step6: { title: "Cuidados e Sinalização", sections: [{ name: "Cuidados e Sinalização", items: [] }] },
    step7: { title: "Condições de Trabalho e Ações de Resgate", sections: [{ name: "Condições de Trabalho e Ações de Resgate", items: [] }] },
    step8: { title: "Comunicação e Supervisão", sections: [{ name: "Comunicação e Supervisão", items: [] }] },
    step9: { title: "Colaboradores", sections: [{ name: "Colaboradores Envolvidos", items: [] }] },
                    
};