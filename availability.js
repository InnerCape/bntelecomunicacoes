// ======================================================
// BN Soluções - Internet Availability Checker
// Ready for future integration with JSON/API/Database
// ======================================================

// ---------- CONFIGURATION ----------

const COVERAGE = {
    VERO: [
        "ALFREDO VASCONCELOS",
        "ANTÔNIO CARLOS",
        "BARÃO DE COCAIS",
        "BARROSO",
        "BELO HORIZONTE",
        "BETIM",
        "BICAS",
        "BOA ESPERANÇA",
        "BOM DESPACHO",
        "BOM SUCESSO",
        "BRUMADINHO",
        "CAETÉ",
        "CAMPO BELO",
        "CARATINGA",
        "CARMO DA MATA",
        "CARMÓPOLIS DE MINAS",
        "CAXAMBU",
        "CLÁUDIO",
        "CONCEIÇÃO DA BARRA DE MINAS",
        "CONGONHAS",
        "CONSELHEIRO LAFAIETE",
        "CONTAGEM",
        "CORONEL FABRICIANO",
        "CRISTIANO OTONI",
        "DIVINÓPOLIS",
        "DORES DE CAMPOS",
        "ENTRE RIOS DE MINAS",
        "ESMERALDAS",
        "GOVERNADOR VALADARES",
        "GUARARÁ",
        "IGARAPÉ",
        "IPATINGA",
        "ITABIRA",
        "ITABIRITO",
        "ITAGUARA",
        "ITATIAIUÇU",
        "ITAÚNA",
        "JECEABA",
        "JOÃO MONLEVADE",
        "JUIZ DE FORA",
        "LAVRAS",
        "LEOPOLDINA",
        "LIMA DUARTE",
        "MANHUAÇU",
        "MAR DE ESPANHA",
        "MARIANA",
        "MARTINHO CAMPOS",
        "MATIAS BARBOSA",
        "MATOZINHOS",
        "NEPOMUCENO",
        "NOVA LIMA",
        "NOVA SERRANA",
        "OLIVEIRA",
        "OURO BRANCO",
        "OURO PRETO",
        "PARÁ DE MINAS",
        "PEDRO LEOPOLDO",
        "PEQUERI",
        "PERDÕES",
        "PONTE NOVA",
        "RESSAQUINHA",
        "RIBEIRÃO DAS NEVES",
        "RIBEIRÃO VERMELHO",
        "SABARÁ",
        "SANTA BÁRBARA",
        "SANTA CRUZ DE MINAS",
        "SANTA LUZIA",
        "SANTANA DO PARAÍSO",
        "SANTO ANTÔNIO DO AMPARO",
        "SANTOS DUMONT",
        "SÃO BRÁS DO SUAÇUÍ",
        "SÃO FRANCISCO DE PAULA",
        "SÃO JOAQUIM DE BICAS",
        "SÃO JOSÉ DA LAPA",
        "SÃO LOURENÇO",
        "SETE LAGOAS",
        "TEÓFILO OTONI",
        "TIMÓTEO",
        "TIRADENTES",
        "UBÁ",
        "VESPASIANO",
        "VIÇOSA",
        "VISCONDE DO RIO BRANCO"
    ],

    NIO: [
        "MURIAÉ",
        "JOÃO MONLEVADE",
        "ITABIRA",
        "LAVRAS",
        "SABARÁ",
        "SANTA RITA DO SAPUCAÍ",
        "CAXAMBU",
        "ESMERALDAS",
        "ARAGUARI",
        "GOVERNADOR VALADARES",
        "PATROCÍNIO",
        "PARACATU",
        "CORONEL FABRICIANO",
        "TIMÓTEO"
    ],

    ALGAR: [
        "BELO HORIZONTE",
        "BERIZAL",
        "BETIM",
        "CARATINGA",
        "CATAGUASES",
        "CONTAGEM",
        "DIVINÓPOLIS",
        "IBIRITÉ",
        "IPATINGA",
        "JUIZ DE FORA",
        "LAGOA SANTA",
        "LEOPOLDINA",
        "MONTES CLAROS",
        "NOVA LIMA",
        "POÇOS DE CALDAS",
        "POUSO ALEGRE",
        "RIBEIRÃO DAS NEVES",
        "SANTA LUZIA",
        "SÃO LOURENÇO",
        "SETE LAGOAS",
        "UBÁ",
        "VARGINHA",
        "VESPASIANO"
    ]
};

// ---------- OPERATOR DETAILS ----------

const OPERATORS = {
    VERO: {
        name: "VERO",
        logo: "images/logo-vero.png",
        url: "VERO.html"
    },

    NIO: {
        name: "NIO",
        logo: "images/logo-nio.png",
        url: "NIO.html"
    },

    ALGAR: {
        name: "Algar",
        logo: "images/logo-algar.png",
        url: "Algar.html"
    }
};

// ---------- HELPERS ----------

function normalize(text) {
    return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function getAvailableOperators(search) {

    const value = normalize(search);

    if (value === "BH") {
        return ["VERO", "ALGAR"];
    }

    const available = [];

    Object.keys(COVERAGE).forEach(operator => {

        const found = COVERAGE[operator].some(city =>
            value.includes(normalize(city))
        );

        if (found) {
            available.push(operator);
        }

    });

    return available;
}

// ---------- SEARCH ----------

document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector("#availability-search");
    const input = document.querySelector("#availability-input");
    const results = document.querySelector("#availability-results");

    if (!button || !input || !results) return;

    button.addEventListener("click", () => {

        const operators = getAvailableOperators(input.value);

        results.innerHTML = "";

        if (operators.length === 0) {

            results.innerHTML = `
                <div class="availability-empty">
                    <h3>Ainda não encontramos cobertura para esta região.</h3>

                    <p>
                        Entre em contato com nossa equipe para verificarmos
                        outras opções disponíveis.
                    </p>

                    <a class="btn btn-whatsapp"
                       href="https://wa.me/5531983618918?text=Ol%C3%A1!%20Gostaria%20de%20verificar%20a%20disponibilidade%20de%20internet%20no%20meu%20endere%C3%A7o."
                       target="_blank">
                        Falar no WhatsApp
                    </a>
                </div>
            `;

            return;
        }

        operators.forEach(op => {

            const data = OPERATORS[op];

            results.innerHTML += `
                <div class="availability-card">

                    <img src="${data.logo}"
                         alt="${data.name}"
                         onerror="this.style.display='none'">

                    <h3>${data.name}</h3>

                    <p>✅ Disponível na sua região</p>

                    <a href="${data.url}"
                       class="btn btn-primary">
                       Ver Planos
                    </a>

                </div>
            `;

        });

    });

});