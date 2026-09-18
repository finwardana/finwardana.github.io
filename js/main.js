console.log("FINWARDANA Loaded");

/* ========================================
   DATA.JSON PATH
======================================== */

// Menyesuaikan jalur data.json secara dinamis berdasarkan keberadaan window.root dari layout.js
const dataPath = window.root ? window.root + "data.json" : "data.json";

/* ========================================
   CARD TEMPLATE
======================================== */

function createCard(item){
    // Menggunakan window.root agar path gambar selalu akurat dari root direktori utama
    const prefix = window.root || "";
    
    // Cek apakah thumb benar-benar ada dan tidak kosong
    const hasThumb = item.thumb && item.thumb.trim() !== "" && item.thumb !== "undefined";
    
    const bgStyle = hasThumb ? `style="background-image:url('${prefix}${item.thumb}')"` : "";
    const cardContent = hasThumb ? "" : "COMING SOON";

    return `
    <a href="${prefix}${item.url}" class="card">
        <div class="thumb" ${bgStyle}>${cardContent}</div>
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