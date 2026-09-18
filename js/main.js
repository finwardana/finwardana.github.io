console.log("FINWARDANA Loaded");

/* ========================================
   DATA.JSON PATH
======================================== */
const dataPath = window.root ? window.root + "data.json" : "data.json";

/* ========================================
   CARD TEMPLATE
======================================== */
function createCard(item){
    const prefix = window.root || "";
    
    const hasThumb = item.thumb && item.thumb.trim() !== "";
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
    render("recent-slider", data.slice(0,10));
    render("games-slider", data.filter(item => item.type === "game"));
    render("tools-slider", data.filter(item => item.type === "tool"));
    render("invitations-slider", data.filter(item => item.type === "invitation"));

    render("games-list", data.filter(item => item.type === "game"));
    render("tools-list", data.filter(item => item.type === "tool"));
    render("invitations-list", data.filter(item => item.type === "invitation"));
})
.catch(error => {
    console.error("DATA.JSON ERROR:", error);
});