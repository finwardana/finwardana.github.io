
console.log("FINWARDANA Loaded");

/* ========================================
   DATA.JSON PATH
======================================== */

// Menggunakan window.isSubPage dari layout.js agar tidak terjadi deklarasi ganda
const dataPath = window.isSubPage
    ? "../data.json"
    : "data.json";

/* ========================================
   CARD TEMPLATE
======================================== */

function createCard(item){
    const prefix = window.isSubPage ? "../" : "";
    
    // Cek apakah item punya thumb dan tidak kosong
    const bgStyle = (item.thumb && item.thumb.trim() !== "") 
        ? `style="background-image:url('${prefix}${item.thumb}')"` 
        : "";

    return `
    <a href="${prefix}${item.url}" class="card">
        <div class="thumb" ${bgStyle}>COMING SOON</div>
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
    render("recent-slider", data.slice(0,10));
    render("games-slider", data.filter(item => item.type === "game"));
    render("tools-slider", data.filter(item => item.type === "tool"));
    render("invitations-slider", data.filter(item => item.type === "invitation"));

    /* PAGE */
    render("games-list", data.filter(item => item.type === "game"));
    render("tools-list", data.filter(item => item.type === "tool"));
    render("invitations-list", data.filter(item => item.type === "invitation"));

})
.catch(error => {
    console.error("DATA.JSON ERROR:", error);
});