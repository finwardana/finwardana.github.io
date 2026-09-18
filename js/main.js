console.log("FINWARDANA Loaded");

/* ========================================
   DATA.JSON PATH
======================================== */

const isSubPage =
    window.location.pathname.includes("/games/") ||
    window.location.pathname.includes("/tools/") ||
    window.location.pathname.includes("/invitations/");

const dataPath = isSubPage
    ? "../data.json"
    : "data.json";

/* ========================================
   CARD TEMPLATE
======================================== */

function createCard(item){
    return `
    <a href="/${item.url}" class="card">

        <div
            class="thumb"
            style="background-image:url('/${item.thumb}')">
        </div>

        <h3>${item.title}</h3>

    </a>
    `;
}

/* ========================================
   RENDER CONTAINER
======================================== */

function render(id, items){

    const container = document.getElementById(id);

    if(!container) return;

    container.innerHTML = items
        .map(createCard)
        .join("");
}

/* ========================================
   LOAD DATA
======================================== */

fetch(dataPath)

.then(response => response.json())

.then(data => {

    /* HOME */

    render(
        "recent-slider",
        data.slice(0,10)
    );

    render(
        "games-slider",
        data.filter(item => item.type === "game")
    );

    render(
        "tools-slider",
        data.filter(item => item.type === "tool")
    );

    render(
        "invitations-slider",
        data.filter(item => item.type === "invitation")
    );

    /* PAGE */

    render(
        "games-list",
        data.filter(item => item.type === "game")
    );

    render(
        "tools-list",
        data.filter(item => item.type === "tool")
    );

    render(
        "invitations-list",
        data.filter(item => item.type === "invitation")
    );

})

.catch(error => {

    console.error(
        "DATA.JSON ERROR:",
        error
    );

});