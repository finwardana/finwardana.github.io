document.addEventListener("DOMContentLoaded", () => {
    console.log("FINWARDANA Loaded");

    /* ========================================
       DATA.JSON PATH
    ======================================== */
    const dataPath = (window.root !== undefined ? window.root : "") + "data.json";

    /* ========================================
       CARD TEMPLATE
    ======================================== */
    function createCard(item){
        // Pastikan prefix mengambil window.root yang sudah dihitung oleh layout.js
        const prefix = window.root !== undefined ? window.root : "";
        
        const hasThumb = item.thumb && item.thumb.trim() !== "";
        // Jika berada di sub-folder, prefix (misal "../" atau "../../") akan digabung dengan item.thumb
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
    .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data.json");
        return response.json();
    })
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
});