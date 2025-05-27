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

        exp
