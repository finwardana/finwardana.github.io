/* ========================================
   FINWARDANA LAYOUT
   Header + Footer Global
======================================== */

/* ========================================
   DETECT PAGE
======================================== */

const path = window.location.pathname;

const isSubPage =
    path.includes("/games/") ||
    path.includes("/tools/") ||
    path.includes("/invitations/");

const root = isSubPage ? "../" : "";

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
                src="${root}img/logo.png"
                alt="FINWARDANA"
                class="logo-icon">

            <span>FINWARDANA</span>

        </div>

        <nav class="navbar">

            <a
                href="${root}"
                class="${active.home ? "active" : ""}">
                Home
            </a>

            <a
                href="${root}games/"
                class="${active.games ? "active" : ""}">
                Games
            </a>

            <a
                href="${root}tools/"
                class="${active.tools ? "active" : ""}">
                Tools
            </a>

            <a
                href="${root}invitations/"
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