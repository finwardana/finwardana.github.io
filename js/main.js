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
           SEARCH BAR
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

    /* ========================================
       LIVE 5 STATUS BARS (ALL HIGH vs ALL LOW LOGIC)
    ======================================== */
    const creativeFill = document.querySelector(".creative-fill");
    const energyFill = document.querySelector(".energy-fill");
    const consistencyFill = document.querySelector(".consistency-fill");
    const boredomFill = document.querySelector(".boredom-fill");
    const sanityFill = document.querySelector(".sanity-fill");

    const statusItems = document.querySelectorAll(".status-bars-container .status-item");
    const creativeVal = statusItems[0]?.querySelector(".status-value");
    const energyVal = statusItems[1]?.querySelector(".status-value");
    const consistencyVal = statusItems[2]?.querySelector(".status-value");
    const boredomVal = statusItems[3]?.querySelector(".status-value");
    const sanityVal = statusItems[4]?.querySelector(".status-value");

    let isStateAlt = false;

    function animateValue(element, start, end, duration) {
        if (!element) return;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / duration, 1);
            let current = Math.floor(progress * (end - start) + start);
            element.textContent = current + "%";
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    function runStatusLoop() {
        // Mode 1 (Max / Full): Semua serba tinggi/maksimal
        // Mode 2 (Min / Minus/Low): Semua serba turun/minimum sesuai range
        
        let targetCreative = isStateAlt ? 50 : 100;
        let startCreative = isStateAlt ? 100 : 50;

        let targetEnergy = isStateAlt ? 0 : 20;
        let startEnergy = isStateAlt ? 20 : 0;

        let targetConsistency = isStateAlt ? 0 : 50;
        let startConsistency = isStateAlt ? 50 : 0;

        let targetBoredom = isStateAlt ?  0 : 100;
        let startBoredom = isStateAlt ? 100 : 0;

        let targetSanity = isStateAlt ? 0 : 10;
        let startSanity = isStateAlt ? 10 : 0;

        // Update lebar bar CSS
        if (creativeFill) creativeFill.style.width = targetCreative + "%";
        if (energyFill) energyFill.style.width = targetEnergy + "%";
        if (consistencyFill) consistencyFill.style.width = targetConsistency + "%";
        if (boredomFill) boredomFill.style.width = targetBoredom + "%";
        if (sanityFill) sanityFill.style.width = targetSanity + "%";

        // Update angka teks dengan animasi halus (Sanity lebih cepat meledaknya)
        animateValue(creativeVal, startCreative, targetCreative, 1500);
        animateValue(energyVal, startEnergy, targetEnergy, 1500);
        animateValue(consistencyVal, startConsistency, targetConsistency, 1500);
        animateValue(boredomVal, startBoredom, targetBoredom, 1500);
        animateValue(sanityVal, startSanity, targetSanity, 800);

        isStateAlt = !isStateAlt;
    }

    setTimeout(runStatusLoop, 500);
    setInterval(runStatusLoop, 4000);
});