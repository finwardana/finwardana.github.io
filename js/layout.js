/* ========================================
             FINWARDANA LAYOUT
         ( Header + Footer Global)
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    // Deteksi apakah berada di dalam sub-folder (tools, games, invitations)
    window.isSubPage =
        path.includes("/games/") ||
        path.includes("/tools/") ||
        path.includes("/invitations/");

    // Deteksi kedalaman folder (misal /tools/fin-z-layer/)
    const isDeepSubPage = 
        (path.includes("/tools/") && path.split("/tools/")[1].includes("/")) ||
        (path.includes("/games/") && path.split("/games/")[1].includes("/")) ||
        (path.includes("/invitations/") && path.split("/invitations/")[1].includes("/"));

    // Menyesuaikan root path secara dinamis
    window.root = isDeepSubPage ? "../../" : (window.isSubPage ? "../" : "");

    /* ========================================
                  ACTIVE MENU
    ======================================== */
    const active = {
        home:
            path === "/" ||
            path.endsWith("/index.html") ||
            path.endsWith("/FINWARDANA/"),

        games:
            path.includes("/games/"),

        tools:
            path.includes("/tools/"),

        invitations:
            path.includes("/invitations/")
    };

    /* ========================================
                       HEADER
    ======================================== */
    const header = document.getElementById("header");
    if (header) {
        header.innerHTML = `
        <header class="header">
            <div class="logo-bar">
                <a href="${window.root}" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit;">
                    <img src="${window.root}assets/img/logo.png" alt="FINWARDANA" class="logo-icon">
                    <span>FINWARDANA</span>
                </a>
            </div>
            <nav class="navbar">
                <a href="${window.root}" class="${active.home ? "active" : ""}">Home</a>
                <a href="${window.root}games/" class="${active.games ? "active" : ""}">Games</a>
                <a href="${window.root}tools/" class="${active.tools ? "active" : ""}">Tools</a>
                <a href="${window.root}invitations/" class="${active.invitations ? "active" : ""}">Invitations</a>
            </nav>
        </header>
        `;
    }

    /* ========================================
                        FOOTER
    ======================================== */
    const footer = document.getElementById("footer");
    if (footer) {
        const currentYear = new Date().getFullYear();
        const yearDisplay = currentYear > 2013 ? `2013 - ${currentYear}` : "2013";

        footer.innerHTML = `
        <footer>
            &copy; ${yearDisplay} FINWARDANA
        </footer>
        `;
    }
});