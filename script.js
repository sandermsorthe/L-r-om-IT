const menyKnapp = document.getElementById("menuKnapp");
const meny = document.getElementById("meny");

menyKnapp.addEventListener("click", () => {
    meny.classList.toggle("vis");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => meny.classList.remove("vis"));
});

document.querySelectorAll(".valg-kort").forEach(kort => {
    kort.addEventListener("click", () => {
        document.getElementById(kort.dataset.target).scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* QUIZ */
const spørsmål = [
    {
        tekst: "Wi-Fi fungerer ikke på PC-en. Hva gjør du først?",
        svar: [
            "Installerer Windows på nytt",
            "Sjekker om Wi-Fi er slått på og undersøker problemet",
            "Kjøper en ny PC",
            "Slår av hele nettverket"
        ],
        riktig: 1
    },
    {
        tekst: "En nettside ser helt feil ut. Hva kan du sjekke?",
        svar: [
            "HTML og CSS",
            "PC-ens høyttalere",
            "Musmatten",
            "Webkameraet"
        ],
        riktig: 0
    },
    {
        tekst: "Du får en mistenkelig lenke på e-post. Hva gjør du?",
        svar: [
            "Klikker med en gang",
            "Sender den til alle",
            "Sjekker avsender og lenken før jeg gjør noe",
            "Skriver inn passordet mitt"
        ],
        riktig: 2
    },
    {
        tekst: "Du har en idé til en app. Hva kan du gjøre?",
        svar: [
            "Bare glemme den",
            "Lære programmering og prøve å lage en prototype",
            "Kjøpe en server først",
            "Det er umulig uten å være ekspert"
        ],
        riktig: 1
    },
    {
        tekst: "Hva er en viktig egenskap i IT?",
        svar: [
            "Å kunne alt fra før",
            "Å aldri gjøre feil",
            "Å være nysgjerrig og like å løse problemer",
            "Å være god i alle fag"
        ],
        riktig: 2
    }
];

let quizIndex = 0;
let quizPoeng = 0;

function visQuiz() {
    const innhold = document.getElementById("quizInnhold");

    if (quizIndex >= spørsmål.length) {
        let melding = "Bra jobbet! 🎉";
        if (quizPoeng === spørsmål.length) {
            melding = "5 av 5! Du tenker som en IT-person. 🔥";
        } else if (quizPoeng >= 3) {
            melding = "Du har god IT-tenking! 💻";
        } else {
            melding = "Du har startet – det er sånn man lærer! 🚀";
        }

        innhold.innerHTML = `
            <p class="spørsmål">${melding}</p>
            <p>Du fikk <strong>${quizPoeng} av ${spørsmål.length}</strong> riktige.</p>
            <button class="knapp" id="startQuizPåNytt">Ta quiz på nytt</button>
        `;

        document.getElementById("startQuizPåNytt").addEventListener("click", () => {
            quizIndex = 0;
            quizPoeng = 0;
            visQuiz();
        });
        return;
    }

    const q = spørsmål[quizIndex];

    innhold.innerHTML = `
        <p>Spørsmål ${quizIndex + 1} av ${spørsmål.length}</p>
        <p class="spørsmål">${q.tekst}</p>
        <div class="alternativer">
            ${q.svar.map((svar, index) =>
                `<button data-index="${index}">${svar}</button>`
            ).join("")}
        </div>
        <p id="quizResultat" class="resultat"></p>
    `;

    document.querySelectorAll("#quizInnhold .alternativer button").forEach(knapp => {
        knapp.addEventListener("click", () => {
            const valgt = Number(knapp.dataset.index);
            const resultat = document.getElementById("quizResultat");

            document.querySelectorAll("#quizInnhold .alternativer button")
                .forEach(b => b.disabled = true);

            if (valgt === q.riktig) {
                quizPoeng++;
                resultat.textContent = "✅ Riktig!";
            } else {
                resultat.textContent = "❌ Ikke helt. Men det er sånn man lærer!";
            }

            setTimeout(() => {
                quizIndex++;
                visQuiz();
            }, 850);
        });
    });
}

visQuiz();

/* CYBER */
document.getElementById("sjekkPassord").addEventListener("click", sjekkPassord);
document.getElementById("passord").addEventListener("keydown", e => {
    if (e.key === "Enter") sjekkPassord();
});

function sjekkPassord() {
    const input = document.getElementById("passord");
    const resultat = document.getElementById("cyberResultat");
    const svar = input.value.trim().toLowerCase();

    if (svar === "nettverk") {
        resultat.textContent = "🎉 Riktig! Du fant passordet.";
        resultat.style.color = "#72d779";
    } else {
        resultat.textContent = "❌ Prøv igjen. Se nøye på hintet!";
        resultat.style.color = "#ff8c8c";
    }
}

/* FINN FEILEN */
document.querySelectorAll("#feilAlternativer button").forEach(knapp => {
    knapp.addEventListener("click", () => {
        const resultat = document.getElementById("feilResultat");

        if (knapp.textContent === "Spørre hva som faktisk ikke fungerer") {
            resultat.textContent = "✅ Riktig! God IT-support starter med å finne ut hva problemet faktisk er.";
            resultat.style.color = "#72d779";
        } else {
            resultat.textContent = "❌ Ikke helt. Start med å undersøke problemet før du gjør store endringer.";
            resultat.style.color = "#ff8c8c";
        }
    });
});

/* NETTSIDEBYGGER */
const navn = document.getElementById("navn");
const tekst = document.getElementById("tekst");
const farge = document.getElementById("farge");
const emoji = document.getElementById("emoji");

const previewNavn = document.getElementById("previewNavn");
const previewTekst = document.getElementById("previewTekst");
const preview = document.getElementById("preview");
const previewEmoji = document.getElementById("previewEmoji");
const previewKnapp = document.getElementById("previewKnapp");
const klikkResultat = document.getElementById("klikkResultat");

function oppdaterNettside() {
    previewNavn.textContent = navn.value || "Min nettside";
    previewTekst.textContent = tekst.value || "Skriv noe!";
    previewEmoji.textContent = emoji.value;
    previewKnapp.style.background = farge.value;
}

navn.addEventListener("input", oppdaterNettside);
tekst.addEventListener("input", oppdaterNettside);
farge.addEventListener("input", oppdaterNettside);
emoji.addEventListener("change", oppdaterNettside);

previewKnapp.addEventListener("click", () => {
    klikkResultat.textContent = "🔥 Du har laget en interaktiv nettside!";
});

oppdaterNettside();
