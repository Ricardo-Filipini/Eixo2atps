// Navigation
const navButtons = document.querySelectorAll('.nav-button');
const contentSections = document.querySelectorAll('.content-section');
const sidebar = document.getElementById('sidebar');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        if (window.innerWidth < 768) { // md breakpoint
            document.querySelector('main').scrollTop = 0; // Scroll main content to top on mobile
            // Potentially close sidebar if it were a mobile overlay, but current design is fixed top bar
        }
        // If it's the flashcards section, load them all
        if (targetId === 'flashcards') {
            displayAllFlashcards();
        }
    });
});

// Set initial active state for "Início"
document.querySelector('.nav-button[data-target="inicio"]').classList.add('active');
document.getElementById('inicio').classList.add('active');

// Tooltip activation for touch devices
document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.addEventListener('click', function(e) {
        e.preventDefault(); 
        this.classList.toggle('active');
        // Close other active tooltips
        document.querySelectorAll('.tooltip.active').forEach(activeTooltip => {
            if (activeTooltip !== this) {
                activeTooltip.classList.remove('active');
            }
        });
    });
});
// Close tooltips if clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.tooltip')) {
        document.querySelectorAll('.tooltip.active').forEach(tooltip => {
            tooltip.classList.remove('active');
        });
    }
});

// Flashcards Data
const faqData = [
    { q: "Por que a coordenação federativa é crucial para as políticas públicas no Brasil?", a: "Devido às desigualdades regionais, heterogeneidade e atuação de múltiplas esferas de governo sobre o mesmo território e população, exigindo articulação para evitar superposição, garantir integralidade e reduzir desigualdades." },
    { q: "Como a descentralização das políticas sociais no Brasil evoluiu?", a: "Houve uma tendência municipalista inicial, depois refreada pelo risco de 'atomização desordenada'. Instrumentos como PPI buscaram incentivar pactuação intermunicipal, mas com desafios na efetividade." },
    { q: "Qual o papel do financiamento federal na coordenação das políticas sociais?", a: "Central na sustentação e coordenação. A disponibilidade de recursos federais fortalece a posição da União na indução de políticas, embora criticada por potencial constrangimento da autonomia municipal." },
    { q: "Como os pactos de aprimoramento da gestão influenciam as políticas sociais?", a: "No SUAS, são instrumentos de coordenação que estabelecem prioridades e metas para estados e municípios, impulsionados por incentivos financeiros, normas e diálogo federativo." },
    { q: "Quais são os principais desafios nas relações intergovernamentais no Brasil?", a: "Conflitos e impasses pela coexistência de esferas autônomas mas interdependentes. A 'armadilha da decisão conjunta', onde estratégias federais dependem da adesão subnacional, é um exemplo." },
    { q: "Como a vinculação constitucional de recursos impacta o financiamento das políticas sociais?", a: "A EC nº 29/2000 foi fundamental para o financiamento compartilhado do SUS, garantindo aporte mais estável. A EC nº 95/2016 (Teto de Gastos) impõe limites, enfraquecendo essa garantia." },
    { q: "Qual a distinção entre os tipos de coordenação federativa e governança multinível?", a: "Coordenação Tipo I (geral, estável) vs. Tipo II (especializada, orientada a objetivos). Governança multinível reconhece a importância local, mas com dependência da coordenação da União e capacidades locais." },
    { q: "Quais as implicações da heterogeneidade regional para as políticas sociais?", a: "Distintas capacidades fiscais e administrativas municipais influenciam a efetividade da coordenação central e contribuem para desigualdades na provisão de serviços." }
];

const flashcardsContainer = document.getElementById('flashcardsContainer');

function displayAllFlashcards() {
    if (!flashcardsContainer) return;
    flashcardsContainer.innerHTML = ''; // Clear previous cards
    if (faqData.length === 0) return;

    faqData.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'flashcard bg-white rounded-lg shadow-md'; 
        cardDiv.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <p class="text-md font-semibold p-4">${item.q}</p>
                </div>
                <div class="flashcard-back">
                    <p class="p-4 text-sm">${item.a}</p>
                </div>
            </div>
        `;
        cardDiv.addEventListener('click', () => {
            cardDiv.classList.toggle('flipped');
        });
        flashcardsContainer.appendChild(cardDiv);
    });
}
// Initial load if flashcards section is active by default (it's not, "inicio" is)
if (document.getElementById('flashcards') && document.getElementById('flashcards').classList.contains('active')) {
    displayAllFlashcards();
}
// Remove pagination buttons if they existed from a previous version
const prevFlashcardButton = document.getElementById('prevFlashcard');
const nextFlashcardButton = document.getElementById('nextFlashcard');
if (prevFlashcardButton) prevFlashcardButton.remove();
if (nextFlashcardButton) nextFlashcardButton.remove();


const glossarioData = [
    { term: "CIT (Comissão Intergestores Tripartite)", def: "Instância colegiada de negociação e pactuação entre <span class='tooltip'>União<span class='tooltiptext'>Governo Federal. (Personagens)</span></span>, <span class='tooltip'>Estados<span class='tooltiptext'>Entes federativos com autonomia política e administrativa. (Personagens)</span></span> e <span class='tooltip'>Municípios<span class='tooltiptext'>Principais executores de políticas, com autonomia variada. (Personagens)</span></span> no âmbito de políticas sociais (<span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span>, <span class='tooltip'>SUAS<span class='tooltiptext'>Sistema Único de Assistência Social. (Glossário)</span></span>)." },
    { term: "CIB (Comissão Intergestores Bipartite)", def: "Instância colegiada de negociação e pactuação entre governos estadual e municipal." },
    { term: "Descentralização", def: "Mudança na distribuição territorial da autoridade, podendo envolver dimensões estrutural, decisória, de recursos, etc. No <span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span>, aprofundada nos anos 90, levou à <span class='tooltip'>fragmentação<span class='tooltiptext'>Dispersão de ações e falta de integração na gestão. (Correlações)</span></span>. (Resumo)" },
    { term: "Coordenação Federativa", def: "Mecanismos e instrumentos usados pela esfera federal para articular e induzir ações dos entes subnacionais. Envolve incentivos, normas, transferências de recursos, etc. (Resumo)" },
    { term: "Receitas Vinculadas", def: "Recursos orçamentários com destinação especificada em lei, transferidos automaticamente. Ex: <span class='tooltip'>EC nº 29/2000<span class='tooltiptext'>Vinculou recursos para saúde. (Glossário)</span></span> para o <span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span>." },
    { term: "Transferências Fundo a Fundo", def: "Repasse direto de recursos de uma esfera para fundos específicos em outras esferas, com destinação vinculada. Comum no <span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span> e <span class='tooltip'>SUAS<span class='tooltiptext'>Sistema Único de Assistência Social. (Glossário)</span></span>." },
    { term: "Pactuação Intermunicipal/Regionalização", def: "Ações cooperadas entre municípios para organizar a oferta regionalizada de serviços. Desafio no <span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span>. (Resumo)" },
    { term: "PPI (Programação Pactuada e Integrada)", def: "Instrumento de planejamento do <span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span> para coordenar a cooperação na oferta regionalizada de serviços. Introduzida pela <span class='tooltip'>NOB 01/1996<span class='tooltiptext'>Norma Operacional Básica do SUS que buscou refrear a atomização. (Linha do Tempo)</span></span>." },
    { term: "PDR (Plano Diretor de Regionalização)", def: "Documento que define o desenho da rede de atenção à saúde no âmbito estadual, importante para a <span class='tooltip'>regionalização<span class='tooltiptext'>Ações cooperadas entre municípios para organizar oferta de serviços. (Glossário)</span></span> do <span class='tooltip'>SUS<span class='tooltiptext'>Sistema Único de Saúde. (Glossário)</span></span>." },
    { term: "SUS (Sistema Único de Saúde)", def: "Sistema público de saúde do Brasil, baseado nos princípios da universalidade, integralidade e equidade. Enfrenta desafios de <span class='tooltip'>financiamento<span class='tooltiptext'>Afetado pela EC nº 95/2016. (Resumo)</span></span> e <span class='tooltip'>coordenação<span class='tooltiptext'>Complexa devido à fragmentação e emendas. (Correlações)</span></span>." },
    { term: "SUAS (Sistema Único de Assistência Social)", def: "Sistema público de assistência social do Brasil. Considerado exemplo de <span class='tooltip'>coordenação<span class='tooltiptext'>Impulsionada por recursos federais e normas claras. (Resumo)</span></span> relativamente bem-sucedida." },
    { term: "EC nº 29/2000", def: "Emenda Constitucional que vinculou recursos orçamentários mínimos para saúde pelas três esferas, fortalecendo o <span class='tooltip'>financiamento compartilhado do SUS<span class='tooltiptext'>Modelo onde União, Estados e Municípios contribuem para o SUS. (Personagens)</span></span>." },
    { term: "EC nº 95/2016", def: "Emenda Constitucional do Teto de Gastos, impactando o <span class='tooltip'>financiamento federal<span class='tooltiptext'>Principal instrumento de indução da União. (Correlações)</span></span> e, consequentemente, a <span class='tooltip'>coordenação<span class='tooltiptext'>Articulação da União com entes subnacionais. (Correlações)</span></span> de políticas sociais." },
    { term: "Pactos de Aprimoramento da Gestão", def: "Instrumentos no <span class='tooltip'>SUAS<span class='tooltiptext'>Sistema Único de Assistência Social. (Glossário)</span></span> para pactuar metas e prioridades com os municípios, fortalecendo a gestão e a <span class='tooltip'>coordenação federativa<span class='tooltiptext'>Mecanismos e instrumentos usados pela esfera federal para articular e induzir ações. (Glossário)</span></span>." },
    { term: "Policy Decision-making", def: "Poder decisório sobre o desenho e diretrizes de uma política pública. No Brasil, concentrado na <span class='tooltip'>União<span class='tooltiptext'>Governo Federal. (Personagens)</span></span> para muitas políticas sociais, segundo <span class='tooltip'>Arretche (2012)<span class='tooltiptext'>Pesquisadora que analisou o papel da União no desenho de políticas. (Personagens)</span></span>." },
    { term: "Policy Making", def: "Poder decisório sobre a implementação e execução de uma política pública. Frequentemente delegado a <span class='tooltip'>Estados<span class='tooltiptext'>Entes federativos com autonomia política e administrativa. (Personagens)</span></span> e <span class='tooltip'>Municípios<span class='tooltiptext'>Principais executores de políticas. (Personagens)</span></span> no Brasil." },
    { term: "Veto Players", def: "Atores (instituições, grupos, como <span class='tooltip'>Estados<span class='tooltiptext'>Entes federativos. (Personagens)</span></span> e <span class='tooltip'>Municípios<span class='tooltiptext'>Entes federativos. (Personagens)</span></span>) que podem impedir ou dificultar decisões ou implementação de políticas, especialmente em <span class='tooltip'>Comissões Intergestores<span class='tooltiptext'>Instâncias como CIT e CIB. (Resumo)</span></span>." }
];

const glossarioContainer = document.getElementById('glossarioContainer');
if (glossarioContainer) {
    glossarioData.forEach(item => {
        const detailElement = document.createElement('details');
        detailElement.className = 'bg-white p-4 rounded-lg shadow-md';
        
        // Sanitize definition for the main tooltip text (remove inner HTML tags)
        const plainTextDef = item.def.replace(/<span class='tooltip'>.*?<span class='tooltiptext'>.*?<\/span><\/span>/g, (match) => {
            // Extract the main term from the inner tooltip to keep it in the plain text
            const mainTermMatch = match.match(/<span class='tooltip'>(.*?)<span class='tooltiptext'>/);
            return mainTermMatch ? mainTermMatch[1] : '';
        }).replace(/<[^>]*>?/gm, ''); // Remove any other remaining HTML tags

        const summaryHtml = `
            <span class="tooltip">${item.term}<span class="tooltiptext">${plainTextDef}</span></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
        `;
        detailElement.innerHTML = `
            <summary class="font-semibold text-lg text-blue-600 flex justify-between items-center">
                ${summaryHtml}
            </summary>
            <p class="mt-2 text-slate-700">${item.def}</p> 
        `;
        // item.def already contains HTML for tooltips within the definition
        glossarioContainer.appendChild(detailElement);
    });
}

const quizData = [
    {
        question: "Quais são as esferas de governo no federalismo brasileiro e quais são seus papéis principais, de acordo com o quadro de panorama das políticas públicas?",
        options: ["União, Estados e Distrito Federal", "Governo Federal, Estados e Municípios", "Presidência, Congresso e Judiciário", "Nível Federal, Nível Estadual e Nível Regional"],
        answer: "Governo Federal, Estados e Municípios",
        explanation: "As esferas de governo são o Governo Federal (GF), os Estados (E) e os Municípios (M). O quadro de panorama das políticas públicas de 2010 indica que o GF e os E são responsáveis por formular e cofinanciar políticas, enquanto o M é responsável por cofinanciar e executar. No entanto, as receitas vinculadas são transferidas automaticamente para os entes subnacionais."
    },
    {
        question: "Segundo um dos textos, o que caracteriza a coordenação por parte do governo federal no contexto federativo brasileiro?",
        options: ["Apenas a transferência de recursos financeiros aos municípios.", "Exclusivamente a criação de leis federais sem consulta aos estados.", "Articulação intergovernamental, incentivos, normas, transferências e capacitação técnica.", "A centralização completa de todas as decisões políticas na União."],
        answer: "Articulação intergovernamental, incentivos, normas, transferências e capacitação técnica.",
        explanation: "Segundo um dos textos, a coordenação por parte do governo federal envolve a articulação entre diferentes níveis de governo, mecanismos de incentivos e indução, normatizações, bons desenhos de programas, redefinição da atribuição de responsabilidades e competências, transferências de recursos e organização e capacitação de quadros técnicos."
    },
    {
        question: "Como a NOB de 1996 tentou refrear a tendência municipalista aprofundada pela NOB nº 1/1993 no SUS?",
        options: ["NOB 01/1991", "NOB 01/1993", "Criando instrumentos para incentivar a pactuação intermunicipal, como a PPI.", "NOAS 2001"],
        answer: "Criando instrumentos para incentivar a pactuação intermunicipal, como a PPI.",
        explanation: "A NOB de 1996 tentou refrear a tendência municipalista criando instrumentos novos para incentivar a pactuação intermunicipal, como a Programação Pactuada e Integrada (PPI) e o planejamento ascendente."
    },
    {
        question: "De acordo com a crítica apresentada em um dos excertos, de que forma a forma de financiamento do SUS estaria promovendo fragmentação e burocratização?",
        options: ["Simplificação dos processos e maior autonomia para atividades finalísticas.", "Ampliação de demandas administrativas e engessamento da gestão, priorizando atividades-meio.", "Redução da burocracia e foco exclusivo na assistência direta ao paciente.", "Fortalecimento da cooperação intermunicipal e otimização de recursos."],
        answer: "Ampliação de demandas administrativas e engessamento da gestão, priorizando atividades-meio.",
        explanation: "De acordo com a crítica, a forma de financiamento estaria promovendo fragmentação e burocratização com ampliação de demandas administrativas e engessamento da gestão, pressionando os municípios a expandir as atividades-meio em prejuízo das atividades finalísticas do sistema."
    },
    {
        question: "Quais foram as principais mudanças na forma de transferência de recursos federais implantadas pela Portaria nº 3.992 de 2017, e o que elas representaram para a flexibilidade dos gestores?",
        options: ["Aumento da vinculação dos recursos a programas específicos, engessando a gestão.", "Transferência de recursos exclusivamente para investimento em capital, sem custeio.", "Flexibilização do uso dos recursos (blocos de custeio/capital) e redução de repasses vinculantes.", "Centralização total da decisão sobre o uso dos recursos no Ministério da Saúde."],
        answer: "Flexibilização do uso dos recursos (blocos de custeio/capital) e redução de repasses vinculantes.",
        explanation: "As principais mudanças implantadas pela Portaria nº 3.992 de 2017 foram a flexibilização financeira do uso dos recursos, transferidos em dois blocos (custeio e capital), e a redução das linhas de repasses vinculantes. Isso concedeu maior flexibilidade aos gestores, mas mantiveram-se algumas vinculações específicas."
    },
    {
        question: "Segundo Arretche (2012), como o poder decisório sobre o desenho da política (policy decision-making) tem se configurado na maioria das políticas sociais no Brasil?",
        options: ["Municípios", "Estados", "Governo Federal", "Organizações da Sociedade Civil"],
        answer: "Governo Federal",
        explanation: "Segundo Arretche (2012), o poder decisório sobre o desenho da política (policy decision-making) tem estado, cada vez mais, a cargo do governo federal, ficando os outros níveis de governo com a execução da política (policy making)."
    },
    {
        question: "De acordo com as entrevistas com gestores municipais, além dos instrumentos financeiros, quais outros aspectos teriam efetividade para o alinhamento dos municípios à proposta federal na política de assistência social?",
        options: ["Apenas maior autonomia municipal sem diretrizes federais.", "Normatizações, clareza das orientações e aprofundamento do diálogo federativo.", "Aumento da fiscalização e controle por órgãos externos.", "Redução da participação dos estados na coordenação."],
        answer: "Normatizações, clareza das orientações e aprofundamento do diálogo federativo.",
        explanation: "Além dos instrumentos financeiros, as entrevistas com gestores municipais apontaram as normatizações, a clareza das orientações e o aprofundamento do diálogo federativo como aspectos com efetividade para o alinhamento."
    },
    {
        question: "No financiamento federal à média e alta complexidade (MAC), qual é o papel do teto financeiro e dos repasses das redes temáticas de atenção?",
        options: ["Teto para novas construções; repasses de redes para custeio básico.", "Ambos servem exclusivamente para cobrir déficits orçamentários dos municípios.", "Teto para manutenção da oferta; repasses de redes para induzir expansão e padrões de atendimento.", "Teto como limite máximo de gasto por paciente; repasses de redes para pesquisa científica."],
        answer: "Teto para manutenção da oferta; repasses de redes para induzir expansão e padrões de atendimento.",
        explanation: "No financiamento federal à MAC, o teto financeiro corresponde ao repasse destinado à manutenção da oferta dos serviços, enquanto os repasses das redes temáticas de atenção dialogam com o conceito de indução de política através de incentivos financeiros para a expansão de certas ofertas e adoção de determinados padrões de atendimento."
    },
    {
        question: "O que a vinculação constitucional de recursos para a saúde com a EC nº 29/2000 trouxe efetivamente para o financiamento compartilhado do SUS?",
        options: ["Criou o SUAS e o Bolsa Família.", "Apenas aumentou os gastos da União, sem impacto nos estados e municípios.", "Trouxe estados e municípios para o financiamento compartilhado, tornando o aporte mais volumoso e estável.", "Desvinculou totalmente os recursos da saúde, permitindo uso livre pelos gestores."],
        answer: "Trouxe estados e municípios para o financiamento compartilhado, tornando o aporte mais volumoso e estável.",
        explanation: "A vinculação constitucional de recursos para a saúde com a EC nº 29/2000 trouxe efetivamente os estados e municípios para o financiamento compartilhado do SUS e garantiu que o aporte de recursos das três esferas se tornasse mais volumoso e estável."
    },
    {
        question: "No âmbito da política de assistência social, o que foi pactuado com a denominação de pacto da gestão municipal, e qual seu conteúdo principal?",
        options: ["Um acordo para centralizar toda a gestão da assistência social nos estados.", "Um repasse financeiro adicional sem definição de metas ou responsabilidades.", "Instrumento focado em metas municipais (ofertas, prioridades, gestão social, controle social).", "Um documento que apenas lista as dificuldades enfrentadas pelos municípios."],
        answer: "Instrumento focado em metas municipais (ofertas, prioridades, gestão social, controle social).",
        explanation: "O pacto da gestão municipal na política de assistência social é um instrumento com conteúdo objetivo, focado nas metas a serem alcançadas pelos municípios, considerando seus respectivos portes, no âmbito das ofertas, prioridades de atendimento ao público, gestão social e controle social."
    }
];

const quizContainer = document.getElementById('quizContainer');
const submitQuizButton = document.getElementById('submitQuiz');
const quizResultsContainer = document.getElementById('quizResults');
const restartQuizButton = document.getElementById('restartQuiz');

function buildQuiz() {
    if (!quizContainer) return;
    quizContainer.innerHTML = ''; // Clear previous quiz
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-6 p-4 border border-gray-200 rounded-md';
        let optionsHtml = '';
        item.options.forEach(option => {
            optionsHtml += `
                <label class="block mt-2">
                    <input type="radio" name="question${index}" value="${option}" class="mr-2">
                    ${option}
                </label>
            `;
        });
        questionDiv.innerHTML = `
            <p class="font-semibold">${index + 1}. ${item.question}</p>
            ${optionsHtml}
            <div id="feedback${index}" class="text-sm mt-2"></div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

if (quizContainer && submitQuizButton && quizResultsContainer && restartQuizButton) {
    buildQuiz(); // Initial quiz build

    submitQuizButton.addEventListener('click', () => {
        let score = 0;
        let resultsHtml = '<h4 class="text-lg font-bold mb-2">Resultados do Quiz:</h4>';
        quizData.forEach((item, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const feedbackDiv = document.getElementById(`feedback${index}`);
            if(feedbackDiv) feedbackDiv.innerHTML = ''; // Clear previous feedback

            if (selectedOption) {
                if (selectedOption.value === item.answer) {
                    score++;
                    if(feedbackDiv) feedbackDiv.innerHTML = `<span class="text-green-600 font-semibold">Correto!</span>`;
                } else {
                    if(feedbackDiv) feedbackDiv.innerHTML = `<span class="text-red-600 font-semibold">Incorreto.</span> Resposta correta: <strong>${item.answer}</strong>. <br><em>${item.explanation}</em>`;
                }
            } else {
                if(feedbackDiv) feedbackDiv.innerHTML = `<span class="text-orange-500 font-semibold">Não respondida.</span> Resposta correta: <strong>${item.answer}</strong>. <br><em>${item.explanation}</em>`;
            }
        });
        resultsHtml += `<p class="text-xl font-semibold my-4">Você acertou ${score} de ${quizData.length} questões.</p>`;
        resultsHtml += `<p>Revise as questões acima para ver as explicações detalhadas.</p>`;
        quizResultsContainer.innerHTML = resultsHtml;
        quizResultsContainer.classList.remove('hidden');
        submitQuizButton.classList.add('hidden');
        restartQuizButton.classList.remove('hidden');
    });

    restartQuizButton.addEventListener('click', () => {
        quizResultsContainer.classList.add('hidden');
        restartQuizButton.classList.add('hidden');
        submitQuizButton.classList.remove('hidden');
        
        // Clear selections and feedback
        quizData.forEach((item, index) => {
            const radioButtons = document.querySelectorAll(`input[name="question${index}"]`);
            radioButtons.forEach(radio => radio.checked = false);
            const feedbackDiv = document.getElementById(`feedback${index}`);
            if (feedbackDiv) feedbackDiv.innerHTML = '';
        });
        
        // Optionally, rebuild the quiz if you want to shuffle or reset completely
        // buildQuiz(); 
        
        // Scroll to top of quiz container
        if (quizContainer.scrollIntoView) {
            quizContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
}


// --- Mind Map Refactor ---
const mindmapSvg = document.getElementById('mindmapSvg');
const mindmapInfoPanel = document.getElementById('mindmapInfoPanel');
const mindmapInfoTitle = document.getElementById('mindmapInfoTitle');
const mindmapInfoContent = document.getElementById('mindmapInfoContent');
const mindmapSelectorContainer = document.getElementById('mindmapSelectorContainer');

const mindMapData = {
    "federalismo_descentralizacao": {
        title: "Federalismo e Descentralização",
        data: {
            id: "fd-root", text: "Federalismo e Descentralização", cx: 400, cy: 70, color: "#0284c7", fontSize: "20px", isRoot: true,
            info: "O modelo federativo brasileiro, especialmente após a Constituição de 1988, caracteriza-se pela distribuição de competências entre os governos federal, estaduais e municipais. Muitas políticas nacionais propõem a estruturação a partir da transferência de recursos e descentralização de ações coordenadas pelo governo federal. O contexto institucional para a produção de políticas sociais tornou-se mais complexo após a CF/1988.",
            children: [
                { id: "fd-conceito", text: "Conceito de Federalismo", cx: 200, cy: 180, color: "#0ea5e9", fontSize: "16px", info: "O modelo federativo brasileiro, especialmente após a Constituição de 1988, caracteriza-se pela distribuição de competências entre os governos federal, estaduais e municipais...", children: [
                    { id: "fd-conceito-origem", text: "Origem (EUA, 1787)", cx: 100, cy: 280, color: "#38bdf8", fontSize: "14px", info: "Origem moderna (EUA, 1787)" },
                    { id: "fd-conceito-diretriz", text: "Diretrizes", cx: 200, cy: 320, color: "#38bdf8", fontSize: "14px", info: "Diretriz para liberdade, republicanismo, subsidiariedade" },
                    { id: "fd-conceito-engenharia", text: "Engenharia Institucional", cx: 300, cy: 280, color: "#38bdf8", fontSize: "14px", info: "\"Engenharia institucional\" para acomodar conflitos territoriais" },
                ]},
                { id: "fd-tipos", text: "Tipos de Descentralização", cx: 600, cy: 180, color: "#0ea5e9", fontSize: "16px", info: "Trata-se de um arranjo de distribuição de autoridade (política, fiscal ou administrativa) em favor dos níveis subnacionais...", children: [
                    { id: "fd-tipos-politica", text: "Política", cx: 500, cy: 280, color: "#38bdf8", fontSize: "14px", info: "Autogoverno" },
                    { id: "fd-tipos-admin", text: "Administrativa", cx: 580, cy: 320, color: "#38bdf8", fontSize: "14px", info: "Implementação" },
                    { id: "fd-tipos-fiscal", text: "Fiscal", cx: 660, cy: 320, color: "#38bdf8", fontSize: "14px", info: "Recursos" },
                    { id: "fd-tipos-decisoria", text: "Decisória", cx: 700, cy: 280, color: "#38bdf8", fontSize: "14px", info: "Formulação" },
                ]},
                { id: "fd-impactos", text: "Impactos da Descentralização", cx: 400, cy: 400, color: "#0ea5e9", fontSize: "16px", info: "Controvérsias (efeitos políticos, qualidade de governo)", children: [] },
                { id: "fd-brasil", text: "Federalismo Brasileiro", cx: 400, cy: 500, color: "#0ea5e9", fontSize: "16px", info: "Configuração pós-1988, dupla tendência: transferência de recursos e descentralização de competências. Relação com políticas sociais.", children: [] }
            ]
        }
    },
    "relacoes_coordenacao": {
        title: "Relações e Coordenação Intergovernamental",
        data: {
            id: "rc-root", text: "Relações e Coord. Intergov.", cx: 400, cy: 70, color: "#059669", fontSize: "20px", isRoot: true,
            info: "Refere-se à coordenação entre os diferentes níveis de governo na implementação de políticas públicas. Ganhou relevância no Brasil devido à complexidade do contexto institucional pós-1988 e à ampliação do compromisso estatal com a redução da desigualdade...",
            children: [
                { id: "rc-conceito", text: "Conceito e Importância", cx: 200, cy: 180, color: "#10b981", fontSize: "16px", info: "Articulação entre níveis de governo, superação de desigualdades, redução da fragmentação.", children: [] },
                { id: "rc-tipos", text: "Tipos de Interação", cx: 400, cy: 220, color: "#10b981", fontSize: "16px", info: "Barganhas diretas, mecanismos incentivo-compatíveis, coordenação em redes.", children: [
                    { id: "rc-tipos-negativa", text: "Coord. Negativa a Complexa", cx: 350, cy: 320, color: "#34d399", fontSize: "14px", info: "Níveis de coordenação (Peters, 2004): Negativa a Complexa" },
                    { id: "rc-tipos-redes", text: "Coord. em Redes", cx: 450, cy: 320, color: "#34d399", fontSize: "14px", info: "Cooperativo, horizontal, confiança" },
                ]},
                { id: "rc-desafios", text: "Desafios da Coordenação", cx: 600, cy: 180, color: "#10b981", fontSize: "16px", info: "Assimetria de informação, construção de consensos, fragmentação, 'Armadilha da Decisão Conjunta'.", children: [
                     { id: "rc-desafios-armadilha", text: "Armadilha da Decisão Conjunta", cx: 600, cy: 280, color: "#34d399", fontSize: "14px", info: "Dificuldade de efetivar decisões que dependem da cooperação de múltiplos atores."}
                ]},
            ]
        }
    },
    "instrumentos_coordenacao": {
        title: "Instrumentos de Coordenação",
        data: {
            id: "ic-root", text: "Instrumentos de Coordenação", cx: 400, cy: 70, color: "#7c3aed", fontSize: "20px", isRoot: true,
            info: "São os dispositivos e recursos mobilizados para promover a coordenação intergovernamental. As fontes identificam diversas modalidades...",
            children: [
                { id: "ic-financeiros", text: "Financeiros", cx: 150, cy: 180, color: "#8b5cf6", fontSize: "16px", info: "Incluem a transferência de recursos (regulares, automáticas, condicionadas), a vinculação de recursos (garantia de gastos mínimos) e incentivos financeiros...", children: [
                    { id: "ic-fin-repasses", text: "Repasses", cx: 100, cy: 280, color: "#a78bfa", fontSize: "14px", info: "Transferências Fundo a Fundo (SUS, SUAS), 'Caixinhas' de repasse." },
                    { id: "ic-fin-vinculacao", text: "Vinculações", cx: 200, cy: 280, color: "#a78bfa", fontSize: "14px", info: "Vinculação de Recursos (SUS)." },
                ]},
                { id: "ic-normativos", text: "Normativos", cx: 300, cy: 220, color: "#8b5cf6", fontSize: "16px", info: "Referem-se às regras de funcionamento das políticas. São mobilizados para definir um padrão nacional para a execução local de serviços...", children: [
                    { id: "ic-norm-regras", text: "Regras", cx: 300, cy: 320, color: "#a78bfa", fontSize: "14px", info: "Definição de responsabilidades, NOBs (SUAS)." },
                ]},
                { id: "ic-organizacionais", text: "Organizacionais", cx: 450, cy: 180, color: "#8b5cf6", fontSize: "16px", info: "Estruturas, fóruns (Comissões Intergestores).", children: [] },
                { id: "ic-gerenciais", text: "Gerenciais", cx: 600, cy: 220, color: "#8b5cf6", fontSize: "16px", info: "Compreendem pactos e planos intergovernamentais, além de medidas para fortalecer a capacidade administrativa e a gestão...", children: [
                    { id: "ic-ger-pactos", text: "Pactos", cx: 550, cy: 320, color: "#a78bfa", fontSize: "14px", info: "Pactos (Saúde, SUAS, BSM), definição de prioridades e metas." },
                    { id: "ic-ger-planos", text: "Planos", cx: 650, cy: 320, color: "#a78bfa", fontSize: "14px", info: "Planos (Nacionais, Regionais, Setoriais), Planejamento regional (SUS, SUAS)." },
                ]},
                { id: "ic-informacionais", text: "Informacionais", cx: 700, cy: 180, color: "#8b5cf6", fontSize: "16px", info: "Envolvem dinâmicas comunicacionais, alinhamento de conteúdo e capacitação de gestores. Sistemas de informação e a disseminação de dados são fundamentais...", children: [
                     { id: "ic-info-sistemas", text: "Sistemas de Info", cx: 700, cy: 280, color: "#a78bfa", fontSize: "14px", info: "Sispacto, Sistema Presença." },
                ]}
            ]
        }
    },
     "comissoes_intergestores": {
        title: "Comissões Intergestores (CIT/CIB)",
        data: {
            id: "ci-root", text: "Comissões Intergestores", cx: 400, cy: 70, color: "#c026d3", fontSize: "20px", isRoot: true,
            info: "São instâncias colegiadas formadas por representantes dos governos municipais, estaduais e federal, criadas após 1988 para articular e discutir políticas...",
            children: [
                { id: "ci-natureza", text: "Natureza e Função", cx: 200, cy: 180, color: "#d946ef", fontSize: "16px", info: "Instâncias de coordenação, arenas para pactuação federativa.", children: [] },
                { id: "ci-composicao", text: "Composição", cx: 350, cy: 220, color: "#d946ef", fontSize: "16px", info: "Representantes dos 3 níveis (CIT) ou 2 níveis (CIB). SUS/SUAS: paritária. Educação: diferenciada.", children: [] },
                { id: "ci-competencias", text: "Competências", cx: 500, cy: 180, color: "#d946ef", fontSize: "16px", info: "Tipos de deliberação (normas, recursos, atos internos, executórias, adjudicatórias).", children: [] },
                { id: "ci-dinamica", text: "Dinâmica Relações", cx: 650, cy: 220, color: "#d946ef", fontSize: "16px", info: "Relação assimétrica estado-município, pressão sobre governo estadual.", children: [] }
            ]
        }
    },
    "governanca_redes": {
        title: "Governança Multinível e Redes",
        data: {
            id: "gr-root", text: "Governança Multinível e Redes", cx: 400, cy: 70, color: "#db2777", fontSize: "20px", isRoot: true,
            info: "A governança multinível reconhece a importância crescente do âmbito local na dinâmica das políticas sociais, onde os municípios possuem autonomia, mas a produção de políticas nacionais depende da capacidade de coordenação da União...",
            children: [
                { id: "gr-conceito-gm", text: "Conceito Gov. Multinível", cx: 200, cy: 180, color: "#e11d48", fontSize: "16px", info: "Reorganização territorial de poderes (vertical), multiplicação de atores (horizontal).", children: [] },
                { id: "gr-dimensoes", text: "Dimensões da Gov. Multinível", cx: 350, cy: 220, color: "#e11d48", fontSize: "16px", info: "Vertical vs. Horizontal, arenas formais/informais, atores não estatais.", children: [] },
                { id: "gr-gov-redes", text: "Governança em Rede", cx: 550, cy: 180, color: "#e11d48", fontSize: "16px", info: "Mais cooperativo e horizontal, múltiplos atores cooperam voluntariamente, trocas baseadas em confiança.", children: [
                    { id: "gr-gov-redes-desafios", text: "Desafios Redes", cx: 550, cy: 280, color: "#f43f5e", fontSize: "14px", info: "Estabilidade, consenso, responsabilização, fragmentação." },
                ]}
            ]
        }
    },
    "intersetorialidade_transversalidade": {
        title: "Intersetorialidade e Transversalidade",
        data: {
            id: "it-root", text: "Intersetorialidade & Transversalidade", cx: 400, cy: 70, color: "#f59e0b", fontSize: "18px", isRoot: true,
            info: "Refere-se à coordenação entre diferentes setores de políticas públicas, como a articulação entre saúde, educação e assistência social para gerenciar as condicionalidades do PBF...",
            children: [
                { id: "it-conceitos", text: "Conceitos", cx: 200, cy: 180, color: "#facc15", fontSize: "16px", info: "Intersetorialidade como meio de gestão. Transversal (gênero, raça) vs. Multisetorial.", children: [] },
                { id: "it-relacao-ps", text: "Relação com Políticas Sociais", cx: 400, cy: 220, color: "#facc15", fontSize: "16px", info: "Envolve diferentes políticas (Direitos Humanos, Educação, Saúde, Assistência Social). Integralidade, multidimensionalidade.", children: [] },
                { id: "it-desafios", text: "Desafios", cx: 600, cy: 180, color: "#facc15", fontSize: "16px", info: "Compartilhar visões comuns (lógica setorializada), custos da intersetorialidade.", children: [] }
            ]
        }
    },
    "politicas_especificas": {
        title: "Coordenação em Políticas Específicas",
        data: {
            id: "pe-root", text: "Coord. em Políticas Específicas", cx: 400, cy: 70, color: "#65a30d", fontSize: "18px", isRoot: true,
            info: "Análise da coordenação federativa em sistemas como SUS, SUAS e Educação.",
            children: [
                { id: "pe-sus", text: "SUS", cx: 150, cy: 180, color: "#84cc16", fontSize: "16px", info: "Sistema de política social analisado nas fontes, destacando sua estrutura e mecanismos de coordenação. Utiliza instrumentos financeiros como transferências e vinculação de recursos...", children: [
                    { id: "pe-sus-instrumentos", text: "Instrumentos SUS", cx: 100, cy: 280, color: "#a3e635", fontSize: "14px", info: "Transferências Fundo a Fundo, Vinculação, Pacto pela Saúde, Coap." },
                ]},
                { id: "pe-suas", text: "SUAS", cx: 350, cy: 220, color: "#84cc16", fontSize: "16px", info: "Sistema de política social com estrutura hierarquizada em níveis de proteção (básica e especial), com mecanismos específicos de transferência de recursos...", children: [
                    { id: "pe-suas-instrumentos", text: "Instrumentos SUAS", cx: 350, cy: 320, color: "#a3e635", fontSize: "14px", info: "Pactos de Aprimoramento, NOBs, Transferências Fundo a Fundo." },
                ]},
                { id: "pe-educacao", text: "Educação", cx: 550, cy: 180, color: "#84cc16", fontSize: "16px", info: "Política social analisada que exemplifica dilemas do federalismo brasileiro, especialmente quanto à heterogeneidade na qualidade da oferta apesar da quase universalização na educação básica...", children: [
                    { id: "pe-educacao-instrumentos", text: "Instrumentos Educação", cx: 550, cy: 280, color: "#a3e635", fontSize: "14px", info: "Fundef/Fundeb, Plano de Metas Compromisso Todos Pela Educação." },
                ]},
                { id: "pe-pobreza", text: "Políticas Contra Pobreza / PBF", cx: 700, cy: 220, color: "#84cc16", fontSize: "16px", info: "Programa de combate à pobreza que articula transferência de renda com condicionalidades em saúde e educação, exigindo coordenação intersetorial e com a assistência social...", children: [
                     { id: "pe-pbf-instrumentos", text: "Instrumentos PBF", cx: 700, cy: 320, color: "#a3e635", fontSize: "14px", info: "Condicionalidades, Pactuações BSM." },
                ]}
            ]
        }
    }
};


let currentMindMapKey = null;
let selectedNodeElement = null; // Stores the <g> element of the selected node
let selectedNodeCircle = null; // Stores the selection ellipse SVG element
let offsetX, offsetY;
const nodePositions = {}; // Store positions { cx, cy, textWidth, textHeight, isDragging }

// Function to get approximate text dimensions (used for initial layout if getBBox is too slow)
function getApproximateTextDimensions(text, fontSize) {
    const avgCharWidth = parseFloat(fontSize) * 0.6; 
    const lineHeight = parseFloat(fontSize) * 1.2;
    const lines = text.split('\n').length > 1 ? text.split('\n') : [text];
    let maxWidth = 0;
    lines.forEach(line => {
        if (line.length * avgCharWidth > maxWidth) {
            maxWidth = line.length * avgCharWidth;
        }
    });
    return { width: maxWidth, height: lines.length * lineHeight };
}


function renderMindMap(data) {
    if (!mindmapSvg) return;
    mindmapSvg.innerHTML = ''; 

    // Ensure SVG defs section and glow filter exist
    let defs = mindmapSvg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        mindmapSvg.appendChild(defs);
    }
    if (!defs.querySelector('#glow')) {
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'glow');
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');

        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('stdDeviation', '3.5'); // Adjust for more or less glow
        feGaussianBlur.setAttribute('result', 'coloredBlur');
        filter.appendChild(feGaussianBlur);

        const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode1.setAttribute('in', 'coloredBlur');
        const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode2.setAttribute('in', 'SourceGraphic');
        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);
        filter.appendChild(feMerge);
        defs.appendChild(filter);
    }

    if (selectedNodeCircle) {
        selectedNodeCircle.remove();
        selectedNodeCircle = null;
    }
    selectedNodeElement = null;

    function initPositions(node) {
        if (!nodePositions[node.id] || !nodePositions[node.id].textWidth) { // Initialize if not set or incomplete
            const dims = getApproximateTextDimensions(node.text, node.fontSize || '14px');
            nodePositions[node.id] = { 
                cx: node.cx, cy: node.cy, 
                textWidth: dims.width, textHeight: dims.height, 
                isDragging: false 
            };
        }
        if (node.children) {
            node.children.forEach(initPositions);
        }
    }
    initPositions(data);

    function drawNode(node, parentNodeData = null) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'mindmap-node draggable');
        group.setAttribute('id', `node-${node.id}`);
        
        const currentPos = nodePositions[node.id];

        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', currentPos.cx);
        textElement.setAttribute('y', currentPos.cy);
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('dominant-baseline', 'central');
        textElement.setAttribute('fill', node.color || '#e0f2fe');
        textElement.setAttribute('font-size', node.fontSize || (node.isRoot ? '18px' : (parentNodeData && parentNodeData.isRoot ? '16px' : '14px')));
        textElement.setAttribute('font-weight', node.isRoot ? 'bold' : 'normal');
        
        if (node.text.includes('\n')) {
            const lines = node.text.split('\n');
            const lineHeight = parseFloat(textElement.getAttribute('font-size')) * 1.2;
            lines.forEach((line, i) => {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.setAttribute('x', currentPos.cx);
                tspan.setAttribute('dy', i === 0 ? `-${(lines.length -1) * lineHeight / 2}px` : `${lineHeight}px`);
                tspan.textContent = line;
                textElement.appendChild(tspan);
            });
        } else {
            textElement.textContent = node.text;
        }
        
        group.appendChild(textElement);
        mindmapSvg.appendChild(group); 
        
        // After appending, getBBox for accurate dimensions for line calculation and ellipse
        const textBBoxForDim = textElement.getBBox();
        nodePositions[node.id].textWidth = textBBoxForDim.width;
        nodePositions[node.id].textHeight = textBBoxForDim.height;

        if (parentNodeData) {
            const parentPos = nodePositions[parentNodeData.id];
            const childPos = nodePositions[node.id]; // Use updated dimensions
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const dx = childPos.cx - parentPos.cx;
            const dy = childPos.cy - parentPos.cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const newPaddingX = 10; 
            const newPaddingY = 6;

            const parentOvalRx = parentPos.textWidth / 2 + newPaddingX;
            const parentOvalRy = parentPos.textHeight / 2 + newPaddingY;
            const childOvalRx = childPos.textWidth / 2 + newPaddingX;
            const childOvalRy = childPos.textHeight / 2 + newPaddingY;

            let x1 = parentPos.cx;
            let y1 = parentPos.cy;
            let x2 = childPos.cx;
            let y2 = childPos.cy;

            if (dist > 0) {
                const tParentDen = Math.sqrt(Math.pow(dx * parentOvalRy, 2) + Math.pow(dy * parentOvalRx, 2));
                if (tParentDen > 0) {
                    const tParent = (parentOvalRx * parentOvalRy) / tParentDen;
                    x1 = parentPos.cx + dx * tParent;
                    y1 = parentPos.cy + dy * tParent;
                }

                const tChildDen = Math.sqrt(Math.pow(-dx * childOvalRy, 2) + Math.pow(-dy * childOvalRx, 2));
                 if (tChildDen > 0) {
                    const tChild = (childOvalRx * childOvalRy) / tChildDen;
                    x2 = childPos.cx - dx * tChild;
                    y2 = childPos.cy - dy * tChild;
                }
            }
            
            // Fallback if nodes are too close or calculation yields NaN (e.g. dist is too small)
            if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || dist < (parentOvalRx + childOvalRx) * 0.2) { 
                 x1 = parentPos.cx;
                 y1 = parentPos.cy;
                 x2 = childPos.cx;
                 y2 = childPos.cy;
            }

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', parentNodeData.color || '#38bdf8');
            line.setAttribute('stroke-width', '1.5');
            line.setAttribute('id', `line-${parentNodeData.id}-to-${node.id}`);
            mindmapSvg.insertBefore(line, mindmapSvg.firstChild);
        }
        
        group.addEventListener('click', (e) => {
            e.stopPropagation();
            mindmapInfoTitle.textContent = node.text;
            mindmapInfoTitle.style.color = node.color || mindMapData[currentMindMapKey]?.data?.color || '#38bdf8'; // Match node or map color
            mindmapInfoContent.textContent = node.info || "Mais informações em breve.";
            mindmapInfoPanel.classList.remove('hidden');
            if (currentMindMapKey && mindMapData[currentMindMapKey]) {
                mindmapInfoPanel.style.borderColor = mindMapData[currentMindMapKey].data.color;
            }

            if (selectedNodeCircle) {
                selectedNodeCircle.remove();
            }
            
            const textBBox = textElement.getBBox(); 
            const dynamicPaddingY = 4 + (textBBox.height * 0.4); // Proportional vertical padding
            const dynamicPaddingX = 8 + (textBBox.width * 0.1); // Proportional horizontal padding (less aggressive)

            selectedNodeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            selectedNodeCircle.setAttribute('cx', textBBox.x + textBBox.width / 2);
            selectedNodeCircle.setAttribute('cy', textBBox.y + textBBox.height / 2);
            selectedNodeCircle.setAttribute('rx', textBBox.width / 2 + dynamicPaddingX);
            selectedNodeCircle.setAttribute('ry', textBBox.height / 2 + dynamicPaddingY);
            selectedNodeCircle.setAttribute('fill', 'none');
            selectedNodeCircle.setAttribute('stroke', node.color || '#38bdf8');
            selectedNodeCircle.setAttribute('stroke-width', '2');
            selectedNodeCircle.setAttribute('class', 'mindmap-selection-circle');
            selectedNodeCircle.setAttribute('filter', 'url(#glow)'); // Apply glow filter
            group.insertBefore(selectedNodeCircle, textElement); 

            selectedNodeElement = group; 
        });

        if (node.children) {
            node.children.forEach(child => drawNode(child, node));
        }
    }
    drawNode(data);
}

function updateLines(nodeId) {
    const draggedNodePos = nodePositions[nodeId];
    const newPaddingX = 10;
    const newPaddingY = 6;
    
    const lineToNode = mindmapSvg.querySelector(`[id$='-to-${nodeId}']`);
    if (lineToNode) {
        const parentId = lineToNode.id.split('-to-')[0].replace('line-', '');
        const parentPos = nodePositions[parentId];
        
        const dx = draggedNodePos.cx - parentPos.cx;
        const dy = draggedNodePos.cy - parentPos.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const parentOvalRx = parentPos.textWidth / 2 + newPaddingX;
        const parentOvalRy = parentPos.textHeight / 2 + newPaddingY;
        const childOvalRx = draggedNodePos.textWidth / 2 + newPaddingX;
        const childOvalRy = draggedNodePos.textHeight / 2 + newPaddingY;
        
        let x1 = parentPos.cx;
        let y1 = parentPos.cy;
        let x2 = draggedNodePos.cx;
        let y2 = draggedNodePos.cy;

        if (dist > 0) {
            const tParentDen = Math.sqrt(Math.pow(dx * parentOvalRy, 2) + Math.pow(dy * parentOvalRx, 2));
            if (tParentDen > 0) {
                const tParent = (parentOvalRx * parentOvalRy) / tParentDen;
                x1 = parentPos.cx + dx * tParent;
                y1 = parentPos.cy + dy * tParent;
            }
            const tChildDen = Math.sqrt(Math.pow(-dx * childOvalRy, 2) + Math.pow(-dy * childOvalRx, 2));
            if (tChildDen > 0) {
                const tChild = (childOvalRx * childOvalRy) / tChildDen;
                x2 = draggedNodePos.cx - dx * tChild;
                y2 = draggedNodePos.cy - dy * tChild;
            }
        }
        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || dist < (parentOvalRx + childOvalRx) * 0.2) {
             x1 = parentPos.cx; y1 = parentPos.cy; x2 = draggedNodePos.cx; y2 = draggedNodePos.cy;
        }
        lineToNode.setAttribute('x1', x1);
        lineToNode.setAttribute('y1', y1);
        lineToNode.setAttribute('x2', x2);
        lineToNode.setAttribute('y2', y2);
    }

    const linesFromNode = mindmapSvg.querySelectorAll(`[id^='line-${nodeId}-to-']`);
    linesFromNode.forEach(line => {
        const childId = line.id.split('-to-')[1];
        const childPos = nodePositions[childId];

        const dx = childPos.cx - draggedNodePos.cx;
        const dy = childPos.cy - draggedNodePos.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const parentOvalRx = draggedNodePos.textWidth / 2 + newPaddingX;
        const parentOvalRy = draggedNodePos.textHeight / 2 + newPaddingY;
        const childOvalRx = childPos.textWidth / 2 + newPaddingX;
        const childOvalRy = childPos.textHeight / 2 + newPaddingY;
        
        let x1 = draggedNodePos.cx;
        let y1 = draggedNodePos.cy;
        let x2 = childPos.cx;
        let y2 = childPos.cy;

        if (dist > 0) {
            const tParentDen = Math.sqrt(Math.pow(dx * parentOvalRy, 2) + Math.pow(dy * parentOvalRx, 2));
            if (tParentDen > 0) {
                const tParent = (parentOvalRx * parentOvalRy) / tParentDen;
                x1 = draggedNodePos.cx + dx * tParent;
                y1 = draggedNodePos.cy + dy * tParent;
            }
            const tChildDen = Math.sqrt(Math.pow(-dx * childOvalRy, 2) + Math.pow(-dy * childOvalRx, 2));
            if (tChildDen > 0) {
                const tChild = (childOvalRx * childOvalRy) / tChildDen;
                x2 = childPos.cx - dx * tChild;
                y2 = childPos.cy - dy * tChild;
            }
        }
         if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || dist < (parentOvalRx + childOvalRx) * 0.2) {
             x1 = draggedNodePos.cx; y1 = draggedNodePos.cy; x2 = childPos.cx; y2 = childPos.cy;
        }
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
    });
}


if (mindmapSvg) {
    let activeDragElement = null; 

    mindmapSvg.addEventListener('mousedown', function(e) {
        if (e.target.closest && e.target.closest('.draggable')) {
            activeDragElement = e.target.closest('.draggable');
            activeDragElement.classList.add('dragging');
            
            const nodeId = activeDragElement.id.replace('node-', '');
            const currentPos = nodePositions[nodeId];
            currentPos.isDragging = true;

            let pt = mindmapSvg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            let svgP = pt.matrixTransform(mindmapSvg.getScreenCTM().inverse());

            offsetX = svgP.x - currentPos.cx;
            offsetY = svgP.y - currentPos.cy;
        }
    });

    mindmapSvg.addEventListener('mousemove', function(e) {
        if (activeDragElement) {
            e.preventDefault();
            let pt = mindmapSvg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            let svgP = pt.matrixTransform(mindmapSvg.getScreenCTM().inverse());
            
            const newX = svgP.x - offsetX;
            const newY = svgP.y - offsetY;

            const nodeId = activeDragElement.id.replace('node-', '');
            const currentPos = nodePositions[nodeId];
            currentPos.cx = newX;
            currentPos.cy = newY;
            
            const textEl = activeDragElement.querySelector('text');
            textEl.setAttribute('x', newX);
            textEl.setAttribute('y', newY);
            textEl.querySelectorAll('tspan').forEach(tspan => tspan.setAttribute('x', newX));

            const ellipseEl = activeDragElement.querySelector('.mindmap-selection-circle');
            if (ellipseEl) {
                ellipseEl.setAttribute('cx', textEl.getBBox().x + textEl.getBBox().width / 2);
                ellipseEl.setAttribute('cy', textEl.getBBox().y + textEl.getBBox().height / 2);
            }
            
            updateLines(nodeId);
        }
    });

    const endDrag = function() {
        if (activeDragElement) {
            const nodeId = activeDragElement.id.replace('node-', '');
            if (nodePositions[nodeId]) nodePositions[nodeId].isDragging = false;
            activeDragElement.classList.remove('dragging');
            activeDragElement = null;
        }
    };

    mindmapSvg.addEventListener('mouseup', endDrag);
    mindmapSvg.addEventListener('mouseleave', endDrag); 
    
    mindmapSvg.addEventListener('click', function(e) {
        if (!e.target.closest('.draggable')) { 
            mindmapInfoPanel.classList.add('hidden');
            if (selectedNodeCircle) {
                selectedNodeCircle.remove();
                selectedNodeCircle = null;
            }
            selectedNodeElement = null;
        }
    });
}


function populateMindMapSelector() {
    if (!mindmapSelectorContainer) return;
    mindmapSelectorContainer.innerHTML = '';
    Object.keys(mindMapData).forEach(key => {
        const button = document.createElement('button');
        button.textContent = mindMapData[key].title;
        button.className = 'mindmap-selector-button text-white text-sm py-2 px-3 rounded-md shadow transition-colors';
        button.style.backgroundColor = mindMapData[key].data.color; 
        
        if (key === currentMindMapKey) {
            button.style.filter = 'brightness(1.2)';
            button.classList.add('ring-2', 'ring-offset-2', 'ring-offset-slate-900'); 
            button.style.ringColor = mindMapData[key].data.color; 
        } else {
            button.style.filter = 'brightness(0.9)'; 
        }

        button.addEventListener('mouseenter', () => {
            if (key !== currentMindMapKey) button.style.filter = 'brightness(1.1)';
        });
        button.addEventListener('mouseleave', () => {
            if (key !== currentMindMapKey) button.style.filter = 'brightness(0.9)';
        });

        button.addEventListener('click', () => {
            currentMindMapKey = key;
            renderMindMap(mindMapData[key].data);
            populateMindMapSelector(); 
            mindmapInfoPanel.classList.add('hidden');
            if (mindmapInfoPanel && mindMapData[currentMindMapKey]) { 
                mindmapInfoPanel.style.borderColor = mindMapData[currentMindMapKey].data.color;
            }
        });
        mindmapSelectorContainer.appendChild(button);
    });
}

if (mindmapSelectorContainer) {
    currentMindMapKey = Object.keys(mindMapData)[0]; 
    if (currentMindMapKey) {
        renderMindMap(mindMapData[currentMindMapKey].data);
         if (mindmapInfoPanel && mindMapData[currentMindMapKey]) { 
            mindmapInfoPanel.style.borderColor = mindMapData[currentMindMapKey].data.color;
        }
    }
    populateMindMapSelector();
}

// --- End Mind Map Refactor ---


const examExamplesData = [
    {
        version: 1,
        questions: [
            {
                id: "v1q1",
                text: "Discorra sobre o papel do financiamento federal como instrumento de coordenação de políticas sociais no Brasil, abordando seus mecanismos, potencialidades e os desafios impostos por constrangimentos fiscais recentes, como a EC nº 95/2016. (20-30 linhas)",
                gabarito: "Esperado que o candidato discuta: o papel indutor do financiamento federal; mecanismos como transferências fundo a fundo e vinculadas; a importância da EC nº 29/2000 para o SUS; o fortalecimento da capacidade da União em definir o desenho das políticas (policy decision-making); os desafios da EC nº 95/2016 (Teto de Gastos) na restrição de recursos e seu impacto na coordenação e na manutenção/expansão dos serviços.",
                respostasExemplo: [
                    "O financiamento federal é crucial na coordenação de políticas sociais no Brasil, atuando como principal indutor da adesão de estados e municípios a programas nacionais. Mecanismos como transferências fundo a fundo e vinculação de receitas, exemplificados pela EC nº 29/2000 no SUS, permitiram à União direcionar a implementação de políticas, concentrando o 'policy decision-making'. Contudo, essa capacidade coordenadora enfrenta severos desafios com constrangimentos fiscais, notadamente a EC nº 95/2016. Ao congelar o piso de gastos em termos reais, o Teto de Gastos limita a expansão de recursos federais, enfraquecendo o poder de indução da União e podendo comprometer a sustentabilidade e a equidade dos serviços sociais, transferindo maior pressão fiscal aos entes subnacionais.",
                    "A coordenação federativa de políticas sociais no Brasil depende fortemente do financiamento federal. A União utiliza sua capacidade de alocação de recursos para induzir a implementação de políticas, como visto no SUS e SUAS, através de repasses que fortalecem seu papel no desenho das agendas. A EC nº 29/2000 foi um marco ao consolidar o financiamento compartilhado da saúde. Entretanto, a EC nº 95/2016, ao impor um teto aos gastos primários, restringiu severamente a capacidade de investimento federal, desafiando a coordenação. Essa medida pode levar à descontinuidade de programas, aumento das desigualdades regionais e menor capacidade da União de responder a novas demandas sociais, exigindo maior esforço dos entes subnacionais para manter os serviços."
                ]
            },
            {
                id: "v1q2",
                text: "Analise comparativamente os processos de descentralização e coordenação federativa no Sistema Único de Saúde (SUS) e no Sistema Único de Assistência Social (SUAS), destacando os avanços, desafios e as diferentes estratégias de articulação intergovernamental empregadas em cada um. (20-30 linhas)",
                gabarito: "Esperado que o candidato compare: a trajetória da descentralização (SUS mais antigo e com municipalização intensa nos anos 90, SUAS mais recente com forte indução federal); os mecanismos de coordenação (SUS com NOBs, PPI, pactos; SUAS com financiamento indutor, normatizações claras, Pactos de Aprimoramento); os desafios (SUS com fragmentação, regionalização incipiente, emendas; SUAS com dependência de recursos federais e variações na capacidade municipal); e os resultados relativos (SUAS como exemplo de maior alinhamento, SUS com maior complexidade e tensões federativas).",
                respostasExemplo: [
                    "SUS e SUAS, embora ambos visem à garantia de direitos, trilharam caminhos distintos na descentralização e coordenação. O SUS, mais antigo, experimentou uma municipalização intensa nos anos 90, resultando em fragmentação e desafios na regionalização, apesar de instrumentos como NOBs e pactos. A coordenação federal no SUS é complexa, influenciada por múltiplos atores e emendas parlamentares. Já o SUAS, mais recente, teve sua implementação fortemente induzida pela União através de financiamento condicionado, normatizações claras e pactos de aprimoramento, resultando em maior alinhamento municipal e superação da fragmentação inicial da assistência. Enquanto o SUS lida com a 'atomização' e a dificuldade de cooperação intermunicipal, o SUAS demonstra que uma forte indução federal, com recursos e regras claras, pode ser mais eficaz na construção de um sistema nacional coeso, embora a dependência de repasses federais e a heterogeneidade municipal persistam como desafios em ambos.",
                    "A descentralização no SUS, iniciada nos anos 90, promoveu autonomia municipal mas também gerou superposição de ações e dificuldades de coordenação regional, com o planejamento ascendente não se consolidando plenamente. A coordenação federal no SUS busca articular via CIT, CIB e pactos, mas enfrenta a complexidade do sistema e a influência de emendas. O SUAS, por outro lado, representa um modelo de coordenação federativa onde a indução federal, por meio de financiamento e normatização, foi mais diretiva e eficaz na estruturação nacional do sistema. Os Pactos de Aprimoramento da Gestão no SUAS, com metas claras, exemplificam essa estratégia. Assim, o SUAS alcançou um alinhamento municipal mais rápido, superando a fragmentação, enquanto o SUS continua a buscar mecanismos para fortalecer a cooperação e a regionalização, enfrentando desafios como a EC 95 e a necessidade de articular múltiplos interesses."
                ]
            }
        ],
    },
    {
        version: 2,
        questions: [
            {
                id: "v2q1",
                text: "Discuta o papel das Comissões Intergestores (CIT e CIB) como instâncias de pactuação no federalismo brasileiro. Quais são suas potencialidades e limitações na promoção da coordenação e na superação da 'armadilha da decisão conjunta' nas políticas sociais? (20-30 linhas)",
                gabarito: "Esperado que o candidato aborde: a natureza da CIT e CIB como espaços de negociação e deliberação intergovernamental; os tipos de decisões tomadas (normas, repasses, habilitação); a predominância da União como proponente e o papel de estados/municípios como 'veto players'; as potencialidades para construir consensos e alinhar políticas; as limitações como assimetria de poder, influência de interesses particularistas e a dificuldade de garantir a implementação efetiva das pactuações, configurando a 'armadilha da decisão conjunta'.",
                respostasExemplo: [
                    "As Comissões Intergestores (CIT e CIB) são cruciais para a pactuação no federalismo brasileiro, servindo como arenas de negociação entre União, estados e municípios para definir regras, repasses e normas em políticas sociais como SUS e SUAS. Sua potencialidade reside na capacidade de construir consensos e promover o alinhamento federativo. No entanto, enfrentam limitações significativas: a assimetria de poder, com a União frequentemente como principal proponente, e estados e municípios atuando como 'veto players', pode levar a impasses. Além disso, a 'armadilha da decisão conjunta' se manifesta quando acordos são feitos, mas sua implementação é frustrada por falta de capacidade ou vontade política dos entes subnacionais, dificultando a efetiva coordenação e a superação de interesses fragmentados.",
                    "CIT e CIB desempenham um papel vital na governança das políticas sociais brasileiras, funcionando como espaços de diálogo e deliberação intergovernamental. Elas permitem a negociação de diretrizes e a alocação de recursos, buscando harmonizar as ações das três esferas de governo. A principal potencialidade dessas comissões é a construção de legitimidade para as políticas através da participação dos gestores. Contudo, a efetividade é limitada pela predominância da União nas propostas e pela capacidade de veto dos entes subnacionais, o que pode emperrar decisões ou diluir objetivos nacionais. A 'armadilha da decisão conjunta' surge quando a interdependência decisória não se traduz em cooperação efetiva, comprometendo a coordenação e a implementação uniforme das políticas acordadas."
                ]
            },
            {
                id: "v2q2",
                text: "Explique como a heterogeneidade das capacidades fiscais e administrativas dos municípios brasileiros impacta a implementação de políticas sociais e a efetividade dos mecanismos de coordenação federativa, utilizando exemplos do SUAS ou do SUS. (20-30 linhas)",
                gabarito: "Esperado que o candidato discuta: a grande variação na arrecadação própria e na capacidade técnica entre os municípios; como municípios maiores e mais ricos (Sul/Sudeste) tendem a ter maior autonomia e capacidade de gestão em relação aos menores e mais pobres (Norte/Nordeste); o impacto disso na adesão e implementação de programas federais (ex: SUAS, onde municípios maiores podem ter mais autonomia frente às orientações federais, enquanto menores dependem mais dos repasses); a dificuldade da coordenação federal em lidar com essa diversidade, resultando em desigualdade na oferta e qualidade dos serviços.",
                respostasExemplo: [
                    "A vasta heterogeneidade fiscal e administrativa dos municípios brasileiros é um fator crítico na implementação de políticas sociais. Municípios com maior capacidade de arrecadação e quadros técnicos qualificados, geralmente os de grande porte e localizados em regiões mais desenvolvidas, conseguem implementar políticas com maior autonomia e qualidade. Em contraste, municípios menores e com baixa capacidade fiscal dependem intensamente de transferências federais e enfrentam dificuldades na gestão. No SUAS, por exemplo, a adesão foi alta, mas a qualidade e a complexidade dos serviços ofertados variam enormemente. Mecanismos de coordenação federal, como o IGD-SUAS, tentam induzir melhorias, mas a efetividade é limitada por essa disparidade estrutural, perpetuando desigualdades territoriais no acesso e na qualidade dos serviços socioassistenciais.",
                    "A implementação uniforme de políticas sociais no Brasil é desafiada pela heterogeneidade municipal. No SUS, por exemplo, a capacidade de um município em gerir serviços de média e alta complexidade ou participar ativamente da regionalização depende de sua estrutura fiscal e administrativa. Municípios com maiores recursos e expertise podem absorver melhor as diretrizes federais e até inovar, enquanto outros lutam para manter serviços básicos. A coordenação federal, ao tentar aplicar regras e incentivos de forma padronizada, muitas vezes não consegue contemplar adequadamente essa diversidade. Isso resulta em uma oferta desigual de serviços de saúde, onde a qualidade e o acesso variam drasticamente pelo território, minando os princípios de equidade do sistema e dificultando a consolidação de redes regionais efetivas."
                ]
            }
        ]
    },
    {
        version: 3,
        questions: [
            {
                id: "v3q1",
                text: "Analise a evolução da descentralização no SUS, desde a tendência municipalista dos anos 90 até as tentativas de regionalização e os desafios atuais. Quais foram os principais instrumentos normativos e de gestão utilizados e quais os resultados alcançados? (20-30 linhas)",
                gabarito: "Esperado que o candidato aborde: a forte municipalização impulsionada pela NOB 01/93; os problemas decorrentes (fragmentação, superposição); a tentativa de correção com a NOB 01/96 (PPI, planejamento ascendente); os esforços de regionalização (Pacto pela Saúde, Decreto 7.508/2011 com as RRAS); os resultados limitados na consolidação de regiões de saúde efetivas e na cooperação intermunicipal; os desafios persistentes como subfinanciamento, influência de emendas parlamentares e a dificuldade de articular o planejamento ascendente com as diretrizes nacionais.",
                respostasExemplo: [
                    "A descentralização no SUS iniciou com forte viés municipalista nos anos 90 (NOB 01/93), ampliando a autonomia local, mas gerando fragmentação e dispersão de ações. A NOB 01/96 buscou reorientar esse processo, introduzindo a Programação Pactuada e Integrada (PPI) e reforçando o planejamento ascendente para fomentar a cooperação intermunicipal. Posteriormente, o Pacto pela Saúde e o Decreto 7.508/2011, com foco nas Redes Regionais de Atenção à Saúde (RRAS), tentaram consolidar a regionalização. Contudo, os resultados foram parciais; a regionalização como ação cooperada e a oferta regional efetiva não avançaram como esperado. Desafios como subfinanciamento crônico, a interferência de emendas parlamentares e a dificuldade em articular os diversos instrumentos de planejamento persistem, limitando a integralidade e equidade do sistema.",
                    "A trajetória da descentralização do SUS é marcada por uma fase inicial de intensa municipalização (década de 1990), que, embora tenha expandido o acesso, resultou em 'atomização desordenada'. Instrumentos como a NOB 01/96 foram criados para mitigar esses efeitos, incentivando a pactuação intermunicipal. Esforços subsequentes, como o Pacto pela Saúde e a regulamentação das RRAS, visaram fortalecer a regionalização e a governança regional. Apesar dos avanços em institucionalidade, a regionalização efetiva, com planejamento ascendente consolidado e cooperação intermunicipal robusta, permanece um desafio. A complexidade da gestão compartilhada, as disparidades entre municípios e a insuficiência de mecanismos de coordenação eficazes continuam a obstaculizar a formação de redes de atenção à saúde integradas e resolutivas em todo o território nacional."
                ]
            },
            {
                id: "v3q2",
                text: "Discorra sobre o conceito de 'policy decision-making' versus 'policy making' no contexto das políticas sociais brasileiras, conforme Arretche (2012). Como essa distinção se manifesta na relação entre o governo federal e os entes subnacionais, e quais suas implicações para a autonomia local? (20-30 linhas)",
                gabarito: "Esperado que o candidato defina: 'policy decision-making' como o poder de definir o desenho, as regras e os objetivos da política; 'policy making' como o poder de implementar e executar a política. Explique que, segundo Arretche, o governo federal tem concentrado cada vez mais o 'policy decision-making' nas políticas sociais, restando aos estados e municípios a execução ('policy making'). Implicações: fortalecimento do papel indutor da União, mas com potencial redução da autonomia dos entes subnacionais para adaptar políticas às realidades locais, podendo gerar tensões e transformar municípios em meros executores de diretrizes federais.",
                respostasExemplo: [
                    "Conforme Arretche (2012), nas políticas sociais brasileiras, o 'policy decision-making' – o poder de definir o desenho e as diretrizes gerais – tem se concentrado progressivamente no governo federal. Aos entes subnacionais, estados e principalmente municípios, resta majoritariamente o 'policy making', ou seja, a execução e implementação dessas políticas. Essa dinâmica é impulsionada pela capacidade de financiamento da União, que utiliza recursos para induzir a adoção de modelos e programas nacionais. A implicação direta é um fortalecimento do papel coordenador federal, mas também uma potencial limitação da autonomia local. Municípios podem se ver mais como 'despachantes do ministério', com pouca margem para adaptar políticas às suas necessidades específicas, gerando tensões federativas e questionamentos sobre a efetiva capacidade de resposta às demandas locais.",
                    "A distinção entre 'policy decision-making' (desenho da política) e 'policy making' (execução) é fundamental para entender a dinâmica federativa brasileira. Arretche (2012) argumenta que a União tem centralizado o 'policy decision-making', estabelecendo as regras do jogo para diversas políticas sociais, como saúde e assistência. Isso ocorre, em grande parte, devido ao seu poder financeiro e capacidade normativa. Como consequência, estados e municípios assumem predominantemente o 'policy making', implementando as diretrizes federais. Tal arranjo, se por um lado pode promover a uniformidade e a indução de padrões nacionais, por outro, pode restringir a autonomia dos governos locais para inovar e adequar as políticas às suas particularidades, levantando debates sobre a qualidade da descentralização e o equilíbrio federativo."
                ]
            }
        ]
    }
];

const examExamplesContainer = document.getElementById('examExamplesContainer');
const examModal = document.getElementById('examModal');
const examModalTitle = document.getElementById('examModalTitle');
const examModalBody = document.getElementById('examModalBody');

if (examExamplesContainer && examModal && examModalTitle && examModalBody) {
    examExamplesData.forEach(exam => {
        const examVersionDiv = document.createElement('div');
        examVersionDiv.className = 'bg-white p-6 rounded-lg shadow-md';
        examVersionDiv.innerHTML = `<h3 class="text-2xl font-semibold text-blue-600 mb-4">Prova Versão ${exam.version}</h3>`;

        exam.questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'mb-6 pb-4 border-b border-gray-200';
            questionDiv.innerHTML = `
                <h4 class="text-lg font-medium text-slate-800 mb-2">Questão ${index + 1}:</h4>
                <p class="mb-3">${q.text}</p>
                <button class="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-md shadow" onclick="showExamAnswer('${exam.version}', '${q.id}')">
                    Ver Gabarito e Exemplos de Resposta
                </button>
            `;
            examVersionDiv.appendChild(questionDiv);
        });
        examExamplesContainer.appendChild(examVersionDiv);
    });
}


window.showExamAnswer = (version, questionId) => {
    const exam = examExamplesData.find(ex => ex.version == version);
    if (!exam) return;
    const question = exam.questions.find(q => q.id === questionId);
    if (!question) return;

    examModalTitle.textContent = `Gabarito e Exemplos - Versão ${version}, Questão sobre: ${question.text.substring(0,50)}...`;
    let bodyHtml = `
        <div class="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-md">
            <h5 class="font-semibold text-yellow-700">Diretrizes para o Gabarito:</h5>
            <p class="text-sm text-yellow-800">${question.gabarito}</p>
        </div>
    `;
    question.respostasExemplo.forEach((resp, i) => {
        bodyHtml += `
            <details class="mb-3 bg-slate-50 p-3 rounded-md border border-slate-200">
                <summary class="font-semibold text-slate-700">Exemplo de Resposta ${i + 1}</summary>
                <p class="text-sm mt-2 text-slate-600">${resp.replace(/\n/g, '<br>')}</p>
            </details>
        `;
    });
    examModalBody.innerHTML = bodyHtml;
    examModal.style.display = "block";
}

window.closeModal = (modalId) => {
    const modalToClose = document.getElementById(modalId);
    if (modalToClose) {
        modalToClose.style.display = "none";
    }
}

// Close modal if clicking outside of it
window.onclick = function(event) {
    if (event.target == examModal) {
        if (examModal) examModal.style.display = "none";
    }
}

// --- Collapsible Sidebar Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const sidebarEl = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarTitleEl = document.getElementById('sidebar-title');

    const originalTitle = "Políticas Sociais no Federalismo Brasileiro";
    const newTitle = "Eixo 2 - ATPS";

    const iconHamburger = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>`;
    const iconClose = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`;

    function updateSidebarBehavior() {
        if (!sidebarEl || !sidebarToggleBtn || !sidebarTitleEl) return;

        const isDesktop = window.innerWidth >= 768; // md breakpoint
        const isLandscape = window.matchMedia("(orientation: landscape)").matches;

        if (isDesktop && isLandscape) {
            sidebarTitleEl.textContent = newTitle;
            sidebarToggleBtn.classList.remove('hidden'); // Show toggle button
            // Restore collapsed state if it was previously set
            if (localStorage.getItem('sidebarCollapsed') === 'true') {
                sidebarEl.classList.add('collapsed');
                sidebarToggleBtn.innerHTML = iconHamburger;
            } else {
                sidebarEl.classList.remove('collapsed');
                sidebarToggleBtn.innerHTML = iconClose;
            }
        } else {
            sidebarTitleEl.textContent = originalTitle;
            sidebarToggleBtn.classList.add('hidden'); // Hide toggle button
            sidebarEl.classList.remove('collapsed'); // Ensure sidebar is expanded on mobile/portrait
        }
    }

    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebarEl.classList.toggle('collapsed');
            const isCollapsed = sidebarEl.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
            if (isCollapsed) {
                sidebarToggleBtn.innerHTML = iconHamburger;
            } else {
                sidebarToggleBtn.innerHTML = iconClose;
            }
        });
    }

    // Initial setup
    updateSidebarBehavior();

    // Update on resize
    window.addEventListener('resize', updateSidebarBehavior);

    const exportButton = document.getElementById('exportPdfButton');
    if (exportButton) {
        exportButton.addEventListener('click', exportToPdf);
    } else {
        console.warn('Botão de exportar PDF não encontrado.');
    }
});

// --- PDF Export Logic ---

let currentY = 40; // Initial Y position for PDF content, with some margin
const pageMargin = 40;
const defaultLineHeight = 18;
const defaultFontSize = 12;

async function addTextWithPageBreaks(pdf, text, options = {}) {
    const x = options.x || pageMargin;
    let y = options.y || currentY;
    const maxWidth = options.maxWidth || (pdf.internal.pageSize.width - (2 * pageMargin));
    const lineHeight = options.lineHeight || defaultLineHeight;
    const fontSize = options.fontSize || defaultFontSize;
    const fontStyle = options.fontStyle || 'normal';

    pdf.setFontSize(fontSize);
    pdf.setFont(undefined, fontStyle); // Using undefined for font name to use default

    const lines = pdf.splitTextToSize(String(text), maxWidth);

    lines.forEach(line => {
        if (y + lineHeight > pdf.internal.pageSize.height - pageMargin) {
            pdf.addPage();
            y = pageMargin; // Reset Y to top margin
        }
        pdf.text(line, x, y);
        y += lineHeight;
    });
    currentY = y; // Update global currentY for the next element
    return y; // Return the Y position after adding this text
}

// Helper function to check if html2canvas will be needed (can be refined)
function needsHtml2Canvas() {
    // For now, assume true if we plan to use it for any section that isn't plain text
    // This can be made more specific if needed.
    return true; 
}

async function exportToPdf() {
    // Ensure jsPDF and html2canvas are loaded (if not embedded)
    if (typeof jspdf === 'undefined' || (typeof html2canvas === 'undefined' && needsHtml2Canvas())) {
        alert('Bibliotecas de PDF (jsPDF ou html2canvas) ainda não carregadas. Tente novamente em alguns segundos ou verifique o console para erros de carregamento das bibliotecas.');
        console.error('jsPDF or html2canvas not loaded. Ensure they are included in index.html via CDN or locally.');
        // Example:
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        return;
    }

    console.log('Iniciando exportação para PDF...');
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    currentY = pageMargin; // Reset Y for each new PDF export

    // Placeholder for content generation
    await addTextWithPageBreaks(pdf, 'Infográfico: Políticas Sociais no Federalismo Brasileiro', { fontSize: 20, fontStyle: 'bold'});
    currentY += defaultLineHeight * 1.5; // Add some space

    // Example of adding content from a section (will be expanded in next steps)
    // const inicioSection = document.getElementById('inicio');
    // if (inicioSection) {
    //     const titleElement = inicioSection.querySelector('h2');
    //     if (titleElement) {
    //         await addTextWithPageBreaks(pdf, titleElement.innerText, { fontSize: 16, fontStyle: 'bold' });
    //     }
    //     const paragraphs = inicioSection.querySelectorAll('p');
    //     for (const p of paragraphs) {
    //         await addTextWithPageBreaks(pdf, p.innerText);
    //     }
    //     currentY += defaultLineHeight; // Add space before next section
    // }


    // 1. Resumo
    currentY = await addResumoToPdf(pdf, currentY);

    // 2. Linha do tempo
    currentY = await addLinhaDoTempoToPdf(pdf, currentY);
    
    // 3. Flashcards
    currentY = await addFlashcardsToPdf(pdf, currentY);

    // 4. Mapa Mental
    currentY = await addMapaMentalToPdf(pdf, currentY);

    // 5. Personagens
    currentY = await addPersonagensToPdf(pdf, currentY);

    // 6. Glossário
    currentY = await addGlossarioToPdf(pdf, currentY);

    // 7. Correlações
    currentY = await addCorrelacoesToPdf(pdf, currentY);

    // 8. Quiz
    currentY = await addQuizToPdf(pdf, currentY);

    // 9. Exemplos de Provas
    currentY = await addExemplosProvasToPdf(pdf, currentY);

    // ... (other sections will be added progressively) ...

    // Add Page Numbers
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i); // Go to page i
        pdf.setFontSize(10);
        pdf.setTextColor(100); // Gray color for page number
        const pageNumText = `Página ${i} de ${pageCount}`;
        const textWidth = pdf.getStringUnitWidth(pageNumText) * pdf.getFontSize() / pdf.internal.scaleFactor;
        const textX = (pdf.internal.pageSize.width - textWidth) / 2; // Centered
        const textY = pdf.internal.pageSize.height - 20; // 20 points from bottom
        pdf.text(pageNumText, textX, textY);
    }

    console.log('Salvando PDF...');
    pdf.save('infografico_politicas_sociais.pdf');
    console.log('PDF export process completed.');
}

// --- Helper function to process P elements (handles tooltips) ---
async function addProcessedParagraph(pdf, pElement, options = {}) {
    const clonedP = pElement.cloneNode(true);
    clonedP.querySelectorAll('.tooltip').forEach(tooltip => {
        // Safely get the main text, assuming it's the first text node within the tooltip span
        let mainText = '';
        if (tooltip.firstChild && tooltip.firstChild.nodeType === Node.TEXT_NODE) {
            mainText = tooltip.firstChild.textContent.trim();
        } else { 
            // Fallback or more complex logic if structure varies
            // For now, attempt to get text from the first child element if no direct text node
            mainText = tooltip.childNodes.length > 0 ? tooltip.childNodes[0].textContent.trim() : '';
        }
        tooltip.replaceWith(document.createTextNode(mainText));
    });
    // Remove any other unwanted elements like SVGs that might be inside paragraphs from other contexts
    clonedP.querySelectorAll('svg').forEach(svg => svg.remove());

    const text = clonedP.textContent.trim();
    if (text) {
       const yAfter = await addTextWithPageBreaks(pdf, text, { fontSize: defaultFontSize, ...options });
       currentY = yAfter; // Ensure currentY is updated globally
       return yAfter;
    }
    return currentY;
}

// --- Helper function to process BLOCKQUOTE elements ---
async function addBlockquoteToPdf(pdf, blockquoteElement) {
    const clonedBlockquote = blockquoteElement.cloneNode(true);
    clonedBlockquote.querySelectorAll('.tooltip').forEach(tooltip => {
        let mainText = '';
        if (tooltip.firstChild && tooltip.firstChild.nodeType === Node.TEXT_NODE) {
            mainText = tooltip.firstChild.textContent.trim();
        } else {
            mainText = tooltip.childNodes.length > 0 ? tooltip.childNodes[0].textContent.trim() : '';
        }
        tooltip.replaceWith(document.createTextNode(mainText));
    });
    const text = clonedBlockquote.textContent.trim();
    if (text) {
        const yAfter = await addTextWithPageBreaks(pdf, `> ${text}`, { 
            fontSize: defaultFontSize, 
            fontStyle: 'italic', 
            x: pageMargin + 10, 
            maxWidth: pdf.internal.pageSize.width - (2 * pageMargin) - 10 
        });
        currentY = yAfter + 5; // Add a bit of space after blockquote
        return currentY;
    }
    return currentY;
}

// --- Helper function to process DETAILS elements ---
async function addDetailsElementToPdf(pdf, detailsElement) {
    const summary = detailsElement.querySelector('summary');
    if (summary) {
        const clonedSummary = summary.cloneNode(true);
        clonedSummary.querySelectorAll('svg').forEach(svg => svg.remove()); // Remove SVG from summary
        clonedSummary.querySelectorAll('.tooltip').forEach(tooltip => {
            let mainText = '';
            if (tooltip.firstChild && tooltip.firstChild.nodeType === Node.TEXT_NODE) {
                mainText = tooltip.firstChild.textContent.trim();
            } else {
                 mainText = tooltip.childNodes.length > 0 ? tooltip.childNodes[0].textContent.trim() : '';
            }
            tooltip.replaceWith(document.createTextNode(mainText));
        });
        const summaryText = clonedSummary.textContent.trim();
        currentY = await addTextWithPageBreaks(pdf, summaryText, { fontSize: 14, fontStyle: 'bold' });
        currentY += 5; 
    }

    // Process content within details (P and BLOCKQUOTE tags)
    // Iterate through childNodes to maintain order
    for (const child of detailsElement.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) { // Check if it's an element
            if (child.tagName === 'P') {
                currentY = await addProcessedParagraph(pdf, child);
                currentY += 5; 
            } else if (child.tagName === 'BLOCKQUOTE') {
                currentY = await addBlockquoteToPdf(pdf, child);
                // addBlockquoteToPdf already adds some space
            }
        }
    }
    currentY += 5; // Space after the whole details block
    return currentY;
}


// --- Function to add "Resumo" section to PDF ---
async function addResumoToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('resumo');
    if (!sectionElement) {
        console.warn("Seção Resumo não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Resumo ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Resumo", { fontSize: 18, fontStyle: 'bold' });
    currentY += 10; 

    const titleElement = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (titleElement) {
        currentY = await addTextWithPageBreaks(pdf, titleElement.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 10;
    }

    const contentDiv = sectionElement.querySelector('.bg-white.p-6');
    if (!contentDiv) {
        console.warn("Div de conteúdo principal da Seção Resumo não encontrada.");
        return currentY;
    }
    
    // Iterate over child nodes of the main content div to process elements in order
    for (const child of contentDiv.childNodes) {
        if (child.nodeType !== Node.ELEMENT_NODE) continue; // Skip non-element nodes

        switch (child.tagName) {
            case 'H3':
                currentY = await addTextWithPageBreaks(pdf, child.textContent.trim(), { fontSize: 14, fontStyle: 'bold' });
                currentY += 5;
                break;
            case 'P':
                currentY = await addProcessedParagraph(pdf, child);
                currentY += 5; // Space after paragraph
                break;
            case 'DETAILS':
                currentY = await addDetailsElementToPdf(pdf, child);
                // addDetailsElementToPdf already adds space
                break;
            // BLOCKQUOTE elements are expected to be inside DETAILS for this section,
            // but if there were direct blockquotes in contentDiv, they could be handled here.
        }
    }

    currentY += defaultLineHeight; // Add some space after the section
    console.log("Seção Resumo adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Linha do Tempo" section to PDF ---
async function addLinhaDoTempoToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('linhadotempo');
    if (!sectionElement) {
        console.warn("Seção Linha do Tempo não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Linha do Tempo ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Linha do Tempo", { fontSize: 18, fontStyle: 'bold' });
    currentY += 10;

    const titleElement = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (titleElement) {
        currentY = await addTextWithPageBreaks(pdf, titleElement.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 10;
    }

    const timelineItems = sectionElement.querySelectorAll('div.timeline-item');
    if (!timelineItems || timelineItems.length === 0) {
        console.warn("Nenhum item da linha do tempo encontrado.");
        return currentY;
    }

    for (const item of timelineItems) {
        const h4Element = item.querySelector('h4');
        const subtitleElement = item.querySelector('p.text-sm.text-gray-500');
        const descriptionElement = item.querySelector('p.mt-1.text-sm');

        if (h4Element) {
            currentY = await addTextWithPageBreaks(pdf, h4Element.textContent.trim(), { fontSize: 14, fontStyle: 'bold' });
            currentY += 2; // Smaller space after year
        }
        if (subtitleElement) {
            currentY = await addTextWithPageBreaks(pdf, subtitleElement.textContent.trim(), { fontSize: 12, fontStyle: 'italic' });
            currentY += 3; // Smaller space after subtitle
        }
        if (descriptionElement) {
            // Adapt tooltip stripping logic from addProcessedParagraph
            const clonedDesc = descriptionElement.cloneNode(true);
            clonedDesc.querySelectorAll('.tooltip').forEach(tooltip => {
                let mainText = '';
                if (tooltip.firstChild && tooltip.firstChild.nodeType === Node.TEXT_NODE) {
                    mainText = tooltip.firstChild.textContent.trim();
                } else {
                    mainText = tooltip.childNodes.length > 0 ? tooltip.childNodes[0].textContent.trim() : '';
                }
                tooltip.replaceWith(document.createTextNode(mainText));
            });
            clonedDesc.querySelectorAll('svg').forEach(svg => svg.remove()); // Just in case
            
            const cleanedText = clonedDesc.textContent.trim();
            if (cleanedText) {
                currentY = await addTextWithPageBreaks(pdf, cleanedText, { fontSize: 12 });
            }
        }
        currentY += 10; // Space after each timeline item
    }

    currentY += defaultLineHeight; // Add some space after the section
    console.log("Seção Linha do Tempo adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Flashcards (FAQ)" section to PDF ---
async function addFlashcardsToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('flashcards'); 
    if (!sectionElement) {
        console.warn("Seção Flashcards (FAQ) não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Flashcards (FAQ) ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Flashcards (FAQ)", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;
    const h2Element = sectionElement.querySelector('h2');
    if (h2Element) {
        currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
    }
    currentY += 10;

    if (!faqData || faqData.length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhum flashcard disponível.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum flashcard encontrado.");
        return currentY;
    }

    const columnMargin = 20; 
    const leftColumnX = pageMargin;
    const columnWidth = (pdf.internal.pageSize.width - (2 * pageMargin) - columnMargin) / 2;
    const rightColumnX = pageMargin + columnWidth + columnMargin;
    
    let rowStartY = currentY;
    let leftCardEndY = currentY; // Tracks the bottom Y of the card in the left column for the current row

    for (let i = 0; i < faqData.length; i++) {
        const card = faqData[i];
        let currentX;
        let tempY = rowStartY; // Use a temporary Y for the current card, starting at rowStartY

        if (i % 2 === 0) { // Left column
            currentX = leftColumnX;
        } else { // Right column
            currentX = rightColumnX;
        }

        // Add Question
        let yAfterQuestion = await addTextWithPageBreaks(pdf, card.q, { 
            x: currentX, y: tempY, 
            maxWidth: columnWidth, 
            fontSize: 13, fontStyle: 'bold' 
        });
        tempY = yAfterQuestion + 5; // Add small space before answer

        // Add Answer
        let yAfterAnswer = await addTextWithPageBreaks(pdf, card.a, { 
            x: currentX, y: tempY, 
            maxWidth: columnWidth, 
            fontSize: 12 
        });
        let cardEndY = yAfterAnswer; // This is the end Y for the current card

        if (i % 2 === 0) { // Left column card was just processed
            leftCardEndY = cardEndY;
            if (i === faqData.length - 1) { // This is the last card and it's in the left column
                currentY = leftCardEndY + 20; // Ensure space after this last card
            }
        } else { // Right column card was just processed
            // The new currentY (which will become rowStartY for the next row) must be below the taller of the two cards
            currentY = Math.max(leftCardEndY, cardEndY) + 20; 
            rowStartY = currentY; 
        }
    }
    
    // If faqData is empty or has only one card, currentY is handled.
    // If faqData.length is even, currentY is updated after the right card.
    // If faqData.length is odd, currentY is updated after the last (left) card.
    
    console.log("Seção Flashcards (FAQ) adicionada ao PDF.");
    return currentY;
}

// --- Recursive helper to add Mind Map Node Info to PDF ---
async function addAllMindMapNodeInfo(pdf, node, indentLevel = 0) {
    const indent = "  ".repeat(indentLevel); // Two spaces per indent level
    
    // Add Node Text (as a small heading)
    if (node.text) {
        currentY = await addTextWithPageBreaks(pdf, `${indent}${node.text.replace(/\n/g, ' ')}`, { // Replace newlines in titles
            fontSize: 11, 
            fontStyle: 'bold',
            // Ensure X position is respected for indentation, if addTextWithPageBreaks uses pageMargin by default
            x: pageMargin + (indentLevel * 10) // Optional: Indent text visually in PDF
        });
    }

    // Add Node Info
    if (node.info) {
        currentY = await addTextWithPageBreaks(pdf, `${indent}${node.info}`, { 
            fontSize: 10,
            x: pageMargin + (indentLevel * 10) // Optional: Indent text visually in PDF
        });
    }
    currentY += 5; // Space after each node's info

    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            // currentY is updated globally by addTextWithPageBreaks and within this loop
            await addAllMindMapNodeInfo(pdf, child, indentLevel + 1);
        }
    }
    return currentY; // Return the updated Y position
}


// --- Function to add "Mapa Mental" section to PDF ---
async function addMapaMentalToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('mapamental');
    if (!sectionElement) {
        console.warn("Seção Mapa Mental não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Mapas Mentais ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Mapas Mentais", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;

    const h2Element = sectionElement.querySelector('h2');
    if (h2Element) {
        currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 5;
    }
    
    const introParagraph = sectionElement.querySelector('p.mb-4.text-slate-400');
    if (introParagraph) {
        // For this specific paragraph, we might want to use addProcessedParagraph if it could contain tooltips
        // or just its textContent if we are sure it's plain.
        currentY = await addProcessedParagraph(pdf, introParagraph, { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
    }

    if (!mindMapData || Object.keys(mindMapData).length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhum mapa mental disponível.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum mapa mental encontrado.");
        return currentY;
    }
    
    const mindMapSvgElement = document.getElementById('mindmapSvg');

    for (constmapKey of Object.keys(mindMapData)) {
        const mapDefinition = mindMapData[mapKey];
        
        currentY = await addTextWithPageBreaks(pdf, mapDefinition.title, { fontSize: 14, fontStyle: 'bold' });
        currentY += 10;

        if (mindMapSvgElement && typeof html2canvas !== 'undefined') {
            // Ensure the specific map is rendered to the SVG element
            renderMindMap(mapDefinition.data); 
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait for SVG to render

            try {
                const canvas = await html2canvas(mindMapSvgElement, { 
                    scale: 1.5, 
                    logging: false, 
                    useCORS: true,
                    backgroundColor: '#ffffff' // Explicitly set background
                });
                const imgDataUrl = canvas.toDataURL('image/png');
                
                const pdfImgWidth = pdf.internal.pageSize.width - (2 * pageMargin);
                const aspectRatio = canvas.width / canvas.height;
                let pdfImgHeight = pdfImgWidth / aspectRatio;

                // Cap image height to avoid excessively long images, e.g., max 60% of page height
                const maxImgHeight = pdf.internal.pageSize.height * 0.6;
                if (pdfImgHeight > maxImgHeight) {
                    pdfImgHeight = maxImgHeight;
                }

                if (currentY + pdfImgHeight > pdf.internal.pageSize.height - pageMargin) {
                    pdf.addPage();
                    currentY = pageMargin;
                }
                pdf.addImage(imgDataUrl, 'PNG', pageMargin, currentY, pdfImgWidth, pdfImgHeight);
                currentY += pdfImgHeight + 10; 
            } catch (error) {
                console.error(`Error rendering mind map '${mapDefinition.title}' to image:`, error);
                currentY = await addTextWithPageBreaks(pdf, "[Erro ao renderizar imagem do mapa mental. Conteúdo textual abaixo.]", { fontSize: 10, fontStyle: 'italic' });
                currentY += 5;
            }
        } else {
            currentY = await addTextWithPageBreaks(pdf, "[Visualização do mapa mental como imagem não disponível (SVG ou html2canvas não carregado/encontrado). Conteúdo textual abaixo.]", { fontSize: 10, fontStyle: 'italic' });
            currentY += 5;
        }
        
        // Add textual content for the current mind map
        currentY = await addTextWithPageBreaks(pdf, "Conteúdo Textual do Mapa:", { fontSize: 12, fontStyle: 'bold' });
        currentY += 5;
        currentY = await addAllMindMapNodeInfo(pdf, mapDefinition.data); // Pass the root node
        currentY += 15; // Extra space after each complete mind map (image + text)
    }
    
    console.log("Seção Mapas Mentais adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Personagens" section to PDF ---
async function addPersonagensToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('personagens');
    if (!sectionElement) {
        console.warn("Seção Personagens não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Personagens ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Personagens e Atores Relevantes", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;

    const h2Element = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (h2Element) {
        // The main title "Personagens e Atores Relevantes" is already added above with size 18.
        // If there's a specific H2 inside the section with slightly different text or for structure,
        // we might add it or choose to use the one above as the primary.
        // For now, let's assume the one above is sufficient and we just add spacing.
        // If h2Element.textContent.trim() is different, we could add it:
        // currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 5; // Additional spacing if H2 was present
    }
    
    const characterItems = sectionElement.querySelectorAll('.grid > div.bg-white.p-4.rounded-lg.shadow-md');
    if (!characterItems || characterItems.length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhum personagem/ator listado.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum item de personagem encontrado.");
        return currentY;
    }

    for (const item of characterItems) {
        const nameElement = item.querySelector('h4');
        const descriptionElement = item.querySelector('p.text-sm.mt-1'); // Standard p selector

        if (nameElement) {
            currentY = await addTextWithPageBreaks(pdf, nameElement.textContent.trim(), { fontSize: 14, fontStyle: 'bold' });
            currentY += 3; // Space after name
        }

        if (descriptionElement) {
            // Use the existing addProcessedParagraph to handle tooltips and add text
            currentY = await addProcessedParagraph(pdf, descriptionElement, { fontSize: 12 });
        }
        
        currentY += 10; // Space after each character entry
    }
    
    currentY += defaultLineHeight; // Add some space after the section
    console.log("Seção Personagens adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Glossário" section to PDF ---
async function addGlossarioToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('glossario');
    if (!sectionElement) {
        console.warn("Seção Glossário não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Glossário ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Glossário", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;

    const h2Element = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (h2Element) {
        currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 10;
    }

    if (!glossarioData || glossarioData.length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhum termo no glossário.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum termo de glossário encontrado.");
        return currentY;
    }

    for (const item of glossarioData) {
        currentY = await addTextWithPageBreaks(pdf, item.term, { fontSize: 14, fontStyle: 'bold' });
        currentY += 3; // Space after term

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.def;
        
        tempDiv.querySelectorAll('.tooltip').forEach(tooltip => {
            let mainText = '';
            // Attempt to get text directly preceding the .tooltiptext span
            // This assumes the main text is directly before the inner span, possibly with other HTML tags.
            let node = tooltip.firstChild;
            let textContentBeforeTooltipText = '';
            while(node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('tooltiptext')) {
                    break;
                }
                textContentBeforeTooltipText += node.textContent;
                node = node.nextSibling;
            }
            mainText = textContentBeforeTooltipText.trim();

            if (!mainText) { // Fallback if the above logic doesn't capture text (e.g. only tooltiptext present)
                 // Try to get text of the first child if it's a text node
                if (tooltip.firstChild && tooltip.firstChild.nodeType === Node.TEXT_NODE) {
                    mainText = tooltip.firstChild.textContent.trim();
                } else { 
                    // Last resort, try to get any text content excluding the tooltiptext span's content
                    const tooltipTextSpan = tooltip.querySelector('.tooltiptext');
                    mainText = tooltip.textContent.replace(tooltipTextSpan?.textContent || '', '').trim();
                }
            }
            tooltip.replaceWith(document.createTextNode(mainText));
        });

        const cleanedDefinition = tempDiv.textContent.trim();
        if (cleanedDefinition) {
            currentY = await addTextWithPageBreaks(pdf, cleanedDefinition, { fontSize: 12 });
        }
        
        currentY += 10; // Space after each glossary entry
    }

    currentY += defaultLineHeight; // Add some space after the section
    console.log("Seção Glossário adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Correlações" section to PDF ---
async function addCorrelacoesToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('correlacoes');
    if (!sectionElement) {
        console.warn("Seção Correlações não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Correlações ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Correlações", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;

    const h2Element = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (h2Element) {
        currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 10;
    }

    const correlationBlocks = sectionElement.querySelectorAll('div.space-y-6 > div.bg-white.p-6');
    if (!correlationBlocks || correlationBlocks.length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhuma correlação listada.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum bloco de correlação encontrado.");
        return currentY;
    }

    for (const block of correlationBlocks) {
        const titleElement = block.querySelector('h3');
        const paragraphElement = block.querySelector('p');

        if (titleElement) {
            currentY = await addTextWithPageBreaks(pdf, titleElement.textContent.trim(), { fontSize: 14, fontStyle: 'bold' });
            currentY += 3; // Space after title
        }

        if (paragraphElement) {
            // Use the existing addProcessedParagraph which handles tooltips within P tags
            // It internally clones the paragraph and processes .tooltip elements
            currentY = await addProcessedParagraph(pdf, paragraphElement, { fontSize: 12 });
        }
        
        currentY += 10; // Space after each correlation block
    }

    currentY += defaultLineHeight; // Add some space after the section
    console.log("Seção Correlações adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Quiz" section to PDF ---
async function addQuizToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('quiz');
    if (!sectionElement) {
        console.warn("Seção Quiz não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Quiz ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Quiz", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;

    const h2Element = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (h2Element) {
        currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 10;
    }

    if (!quizData || quizData.length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhum quiz disponível.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum item de quiz encontrado.");
        return currentY;
    }

    for (let qIndex = 0; qIndex < quizData.length; qIndex++) {
        const item = quizData[qIndex];

        // Question
        currentY = await addTextWithPageBreaks(pdf, `${qIndex + 1}. ${item.question}`, { fontSize: 13, fontStyle: 'bold' });
        currentY += 5; // Space after question

        // Options
        if (item.options && item.options.length > 0) {
            for (let optIndex = 0; optIndex < item.options.length; optIndex++) {
                const optionText = `   ${String.fromCharCode(97 + optIndex)}) ${item.options[optIndex]}`;
                currentY = await addTextWithPageBreaks(pdf, optionText, { fontSize: 12, x: pageMargin + 15 });
            }
        }
        currentY += 5; // Space after options

        // Answer
        currentY = await addTextWithPageBreaks(pdf, `Resposta correta: ${item.answer}`, { fontSize: 12, fontStyle: 'bold' });
        currentY += 3; // Space after answer

        // Explanation
        if (item.explanation) {
            currentY = await addTextWithPageBreaks(pdf, item.explanation, { fontSize: 12, fontStyle: 'italic' });
        }
        
        currentY += 15; // Space after each complete quiz item
    }

    currentY += defaultLineHeight; // Add some space after the section
    console.log("Seção Quiz adicionada ao PDF.");
    return currentY;
}

// --- Function to add "Exemplos de Provas" section to PDF ---
async function addExemplosProvasToPdf(pdf, initialY) {
    currentY = initialY;
    const sectionElement = document.getElementById('exemplosprovas');
    if (!sectionElement) {
        console.warn("Seção Exemplos de Provas não encontrada para PDF.");
        return currentY;
    }

    console.log("Adicionando Seção Exemplos de Provas ao PDF...");

    currentY = await addTextWithPageBreaks(pdf, "Exemplos de Provas", { fontSize: 18, fontStyle: 'bold' });
    currentY += 5;

    const h2Element = sectionElement.querySelector('h2.text-3xl.font-bold');
    if (h2Element) {
        currentY = await addTextWithPageBreaks(pdf, h2Element.textContent.trim(), { fontSize: 16, fontStyle: 'bold' });
        currentY += 10;
    }

    if (!examExamplesData || examExamplesData.length === 0) {
        currentY = await addTextWithPageBreaks(pdf, "Nenhum exemplo de prova disponível.", { fontSize: 12, fontStyle: 'italic' });
        currentY += 10;
        console.log("Nenhum exemplo de prova encontrado.");
        return currentY;
    }

    for (const exam of examExamplesData) {
        currentY = await addTextWithPageBreaks(pdf, `Prova Versão ${exam.version}`, { fontSize: 14, fontStyle: 'bold' });
        currentY += 10;

        for (let qIdx = 0; qIdx < exam.questions.length; qIdx++) {
            const question = exam.questions[qIdx];

            // Question Text
            currentY = await addTextWithPageBreaks(pdf, `${qIdx + 1}. ${question.text}`, { fontSize: 13, fontStyle: 'bold' });
            currentY += 5;

            // Gabarito
            currentY = await addTextWithPageBreaks(pdf, "Gabarito:", { fontSize: 12, fontStyle: 'bold' });
            currentY = await addTextWithPageBreaks(pdf, question.gabarito, { fontSize: 12, x: pageMargin + 10 }); // Indented
            currentY += 5;

            // Respostas Exemplo
            currentY = await addTextWithPageBreaks(pdf, "Exemplos de Resposta:", { fontSize: 12, fontStyle: 'bold' });
            if (question.respostasExemplo && question.respostasExemplo.length > 0) {
                for (let i = 0; i < question.respostasExemplo.length; i++) {
                    const resposta = question.respostasExemplo[i];
                    currentY = await addTextWithPageBreaks(pdf, `Exemplo ${i + 1}:`, { fontSize: 12, fontStyle: 'italic', x: pageMargin + 10 }); // Indented label
                    currentY = await addTextWithPageBreaks(pdf, resposta, { fontSize: 12, x: pageMargin + 20 }); // Further indented text
                    currentY += 5;
                }
            } else {
                currentY = await addTextWithPageBreaks(pdf, "Nenhum exemplo de resposta fornecido.", { fontSize: 12, fontStyle: 'italic', x: pageMargin + 10 });
                currentY += 5;
            }
            
            currentY += 15; // Space after each complete question block
        }
        currentY += 20; // Space after each exam version
    }

    currentY += defaultLineHeight; // Add some space after the entire section
    console.log("Seção Exemplos de Provas adicionada ao PDF.");
    return currentY;
}
