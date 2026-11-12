 
"use strict";

/* =========================================
   MENTES INQUIETAS
   Funcionalidades principales
   ========================================= */


/**
 * Inicializa el menú de navegación para móviles.
 */
function initializeNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("nav-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    // Cierra el menú después de seleccionar una sección.
    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("nav-open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Abrir menú");
        });
    });
}


/**
 * Actualiza automáticamente el año del copyright.
 */
function updateCopyrightYear() {
    const yearElement = document.querySelector("#current-year");

    if (!yearElement) {
        return;
    }

    yearElement.textContent = new Date().getFullYear();
}


/**
 * Inicializa las votaciones de la pregunta semanal.
 */
function initializeVoting() {
    const opinionButtons = document.querySelectorAll(".opinion-button");
    const voteMessage = document.getElementById("vote-message");

    opinionButtons.forEach((button) => {
        button.addEventListener("click", () => {

            opinionButtons.forEach((item) => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            const opinion = button.dataset.opinion;

            if (opinion === "acercan") {
                voteMessage.textContent =
                    "Has elegido: las redes sociales nos acercan.";
            } else {
                voteMessage.textContent =
                    "Has elegido: las redes sociales nos alejan.";
            }
        });
    });
}


/**
 * Inicializa el formulario de propuestas.
 */
function initializeSuggestionForm() {
    const suggestionForm = document.getElementById("suggestion-form");
    const suggestionInput = document.getElementById("suggestion");
    const suggestionMessage = document.getElementById("suggestion-message");

    if (!suggestionForm || !suggestionInput || !suggestionMessage) {
        return;
    }

    suggestionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const suggestion = suggestionInput.value.trim();

        if (suggestion.length < 5) {
            suggestionMessage.textContent =
                "Escribe una propuesta un poquito más larga.";
            return;
        }

        suggestionMessage.textContent =
            "¡Gracias por compartir tu idea!";

        suggestionForm.reset();
    });
}


/**
 * Filtra las reflexiones según la categoría seleccionada
 * y desplaza la página hasta la sección de reflexiones.
 */
function initializeCategoryFilters() {
    const categoryFilters = document.querySelectorAll(".category-filter");
    const articles = document.querySelectorAll(".article-card");
    const reflectionsSection = document.querySelector("#reflexiones");

    categoryFilters.forEach((button) => {
        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.filter;

            // Actualizamos el botón seleccionado.
            categoryFilters.forEach((filter) => {
                filter.classList.remove("is-active");
                filter.setAttribute("aria-pressed", "false");
            });

            button.classList.add("is-active");
            button.setAttribute("aria-pressed", "true");

            // Mostramos las reflexiones de la categoría elegida.
            articles.forEach((article) => {
                const articleCategory = article.dataset.category;

                const matchesCategory =
                    selectedCategory === "todas" ||
                    articleCategory === selectedCategory;

                article.hidden = !matchesCategory;
            });

            // Subimos suavemente hasta las reflexiones.
            if (reflectionsSection) {
                reflectionsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });
    });
}


/**
 * Inicializa todas las funcionalidades de la página.
 */
function initializeWebsite() {
    initializeNavigation();
    updateCopyrightYear();
    initializeVoting();
    initializeSuggestionForm();
    initializeCategoryFilters();
}


// Ejecutamos la inicialización.
initializeWebsite();
