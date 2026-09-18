/* ========================================
   FINWARDANA LAYOUT
   Header + Footer Global
======================================== */

/* ========================================
   DETECT PATH & DEPTH
======================================== */

const path = window.location.pathname;

// Deteksi apakah berada di dalam sub-folder (tools, games, invitations)
window.isSubPage =
    path.includes("/games/") ||
    path.includes("/tools/") ||
    path.includes("/invitations/");

// Deteksi kedalaman folder (apakah berada di dalam sub-folder dari sub-folder, misal /tools/fin-z-layer/)
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

function renderHeader(){

    const header = document.getElementById("header");

    if(!header) return;

    header.innerHTML = `
    <header class="header">

        <div class="logo-bar">

            <a href="${window.root}" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit;">
                <img
                    src="${window.root}assets/img/logo.png"
                    alt="FINWARDANA"
                    class="logo-icon">
                <span>FINWARDANA</span>
            </a>

        </div>

        <nav class="navbar">

            <a
                href="${window.root}"
                class="${active.home ? "active" : ""}">
                Home
            </a>

            <a
                href="${window.root}games/"
                class="${active.games ? "active" : ""}">
                Games
            </a>

            <a
                href="${window.root}tools/"
                class="${active.tools ? "active" : ""}">
                Tools
            </a>

            <a
                href="${window.root}invitations/"
                class="${active.invitations ? "active" : ""}">
                Invitations
            </a>

        </nav>

    </header>
    `;
}

/* ========================================
   FOOTER
======================================== */

function renderFooter(){

    const footer = document.getElementById("footer");

    if(!footer) return;

    const year = new Date().getFullYear();

    footer.innerHTML = `
    <footer>
        © ${year} FINWARDANA
    </footer>
    `;
}

/* ========================================
   INIT
======================================== */

renderHeader();
renderFooter();