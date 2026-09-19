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
        const prefix = window.root !== undefined ? window.root : "";
        
        const hasThumb = item.thumb && item.thumb.trim() !== "";
        const bgStyle = hasThumb ? `style="background-image:url('${prefix}${item.thumb}')"` : "";
        const cardContent = hasThumb ? "" : "COMING SOON";

        return `
        <a href="${prefix}${item.url}" class="card" data-title="${item.title.toLowerCase()}">
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
       LOAD DATA & SEARCH SYSTEM
    ======================================== */
    fetch(dataPath)
    .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil data.json");
        return response.json();
    })
    .then(data => {
        /* HOME SLIDERS */
        render("games-slider", data.filter(item => item.type === "game"));
        render("tools-slider", data.filter(item => item.type === "tool"));
        render("invitations-slider", data.filter(item => item.type === "invitation"));

        /* PAGE LISTS */
        render("games-list", data.filter(item => item.type === "game"));
        render("tools-list", data.filter(item => item.type === "tool"));
        render("invitations-list", data.filter(item => item.type === "invitation"));

        /* ========================================
           FITUR SEARCH BAR (Pencarian Real-time)
        ======================================== */
        const searchInput = document.getElementById("search-input");

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                const keyword = e.target.value.toLowerCase().trim();
                const cards = document.querySelectorAll(".card");

                cards.forEach(card => {
                    const cardTitle = card.getAttribute("data-title") || "";
                    
                    if (cardTitle.includes(keyword)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        }
    })
    .catch(error => {
        console.error("DATA.JSON ERROR:", error);
    });
});