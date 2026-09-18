/* ========================================
   HEADER
======================================== */

const header = document.getElementById("header");

if(header){

    const isSubPage =
        location.pathname.includes("/games/") ||
        location.pathname.includes("/tools/") ||
        location.pathname.includes("/invitations/");

    const root = isSubPage ? "../" : "";

    header.innerHTML = `
    <header class="header">

        <div class="logo-bar">

            <img
                src="${root}img/logo.png"
                class="logo-icon"
                alt="Logo">

            <span>FINWARDANA</span>

        </div>

        <nav class="navbar">

            <a href="${root}">
                Home
            </a>

            <a href="${root}games/">
                Games
            </a>

            <a href="${root}tools/">
                Tools
            </a>

            <a href="${root}invitations/">
                Invitations
            </a>

        </nav>

    </header>
    `;
}

/* ========================================
   FOOTER
======================================== */

const footer = document.getElementById("footer");

if(footer){

    footer.innerHTML = `
    <footer>
        © 2026 FINWARDANA
    </footer>
    `;
}