
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
 * Inicializa las funcionalidades de la página.
 */
function initializeWebsite() {
    initializeNavigation();
    updateCopyrightYear();
}


// Ejecutamos la inicialización.
initializeWebsite();
