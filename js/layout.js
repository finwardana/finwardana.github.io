/* ========================================
   FINWARDANA LAYOUT
   Header + Footer Global
======================================== */

/* ========================================
   DETECT PAGE
======================================== */

const path = window.location.pathname;

window.isSubPage =
    path.includes("/games/") ||
    path.includes("/tools/") ||
    path.includes("/invitations/");

window.root = window.isSubPage ? "../" : "";

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

            <img
                src="${window.root}assets/img/logo.png"
                alt="FINWARDANA"
                class="logo-icon">

            <span>FINWARDANA</span>

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