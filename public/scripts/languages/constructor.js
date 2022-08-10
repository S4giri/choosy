const langEl = document.querySelector('.langWrap');
const langs = document.querySelectorAll('[lang-data]');
const titleEl = document.querySelector('.title');
const descEl = document.querySelector('.desc');

langs.forEach(el => {
    el.addEventListener('click', () => {
        langEl.querySelector('.active').classList.remove('active');
        el.classList.add('active');

        const attr = el.getAttribute('language');

        fetch("/scripts/languages/" + attr + "/header.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Header
                titleEl.textContent = data.title;
                descEl.textContent = data.desc;

                // Main
                // . . .

                // footer
                // . . .
            })

    });
});

// Achar uma maneira de ocultar esse script no console onde
// é exibido na aba 'Fontes - /scripts/languages/constructor.js'