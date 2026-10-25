(() => {
    const scriptUrl = document.currentScript.src;
    const siteRoot = new URL("", scriptUrl);
    // Paste the full Zoom link here (https://...). The button is hidden until a valid link is set.
    const zoomUrl = "https://us06web.zoom.us/j/87341214838?pwd=brjpkqubEkjoa2rDmV47nhGND36wPf.1";
    // const zoomUrl = "";
    const zoomLabel = "Join the reveal event today";
    // Event schedule uses Swedish time (UTC+01:00); cases=show bypasses both time windows.
    const showCasesOverride = new URLSearchParams(location.search).get("cases") === "show";
    const zoomFrom = new Date("2026-10-26T00:00:00+01:00").getTime();
    const casesFrom = new Date("2026-10-26T15:30:00+01:00").getTime();
    const isCasesPublic = () => Date.now() >= casesFrom || showCasesOverride;
    const isZoomPublic = () => {
        const now = Date.now();
        return (now >= zoomFrom && now < casesFrom) || showCasesOverride;
    };
    const zoomIcon = `<svg class="zoom-btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h7A2.5 2.5 0 0 1 15 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 3 16.5v-9Zm13 3.2 5-3.2v9l-5-3.2v-2.6Z"/></svg>`;
    const headerMarkup = `
        <nav class="absolute top-0 w-full z-50">
            <div class="flex md:hidden bg-white h-20 px-6 items-center justify-between">
                <div class="w-12 text-[#0033FF]">
                    <a data-site-href="index.html#home" aria-label="Nordic Circular Investments home" class="hover:opacity-70 transition">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 5.5L4.5 20.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 5.5H19.5V15" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
                <div class="flex-grow flex justify-center px-2">
                    <a data-site-href="index.html" aria-label="Nordic Circular Investments home" class="hover:opacity-70 transition">
                        <img data-site-src="images/frombelieftobankability_logo.png" alt="From Belief to Bankability" class="h-24 w-auto object-contain">
                    </a>
                </div>
                <button type="button" data-menu-toggle aria-label="Open menu" aria-controls="site-mobile-menu" aria-expanded="false" class="w-12 flex justify-end text-[#0033FF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                        <line x1="4" y1="8" x2="20" y2="8" />
                        <line x1="4" y1="16" x2="16" y2="16" />
                    </svg>
                </button>
            </div>

            <div class="hidden md:grid max-w-7xl mx-auto px-24 h-40 grid-cols-2 items-center relative">
                <div class="flex justify-start items-center">
                    <div class="h-32 flex items-center">
                        <a data-site-href="index.html" aria-label="Nordic Circular Investments home" class="hover:opacity-70 transition">
                            <img data-site-src="images/frombelieftobankability_logo.png" alt="From Belief to Bankability" class="h-full w-auto object-contain">
                        </a>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <div class="flex space-x-12 text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                        <a data-site-href="index.html#signup" class="hover:opacity-70 transition">Sign up</a>
                        <a data-site-href="index.html#meet-us" class="hover:opacity-70 transition">Meet us</a>
                        <a data-site-href="cases.html" data-page-link="cases" data-home-case-link class="hover:opacity-70 transition">Cases</a>
                        <a data-site-href="index.html#about" class="hover:opacity-70 transition">About us</a>
                    </div>
                </div>
            </div>

            <div id="site-mobile-menu" class="fixed inset-0 bg-[#0033FF] z-50 transform translate-x-full md:hidden flex flex-col items-center justify-center space-y-8 text-white text-xl font-bold uppercase tracking-widest transition-transform duration-300">
                <button type="button" data-menu-toggle aria-label="Close menu" class="absolute top-8 right-8 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <a data-zoom-link target="_blank" rel="noopener" class="zoom-btn zoom-btn--large">${zoomIcon}<span>${zoomLabel}</span></a>
                <a data-site-href="index.html#signup">Sign up</a>
                <a data-site-href="index.html#meet-us">Meet us</a>
                <a data-site-href="cases.html" data-page-link="cases" data-home-case-link>Cases</a>
                <a data-site-href="index.html#about">About us</a>
            </div>
        </nav>

        <div class="hidden md:block diagonal-pil text-white brightness-0 invert">
            <a data-site-href="index.html#home" aria-label="Nordic Circular Investments home" class="hover:opacity-70 transition">
                <svg class="h-10 w-10 md:h-20 md:w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
            </a>
        </div>

        <a data-zoom-link target="_blank" rel="noopener" class="zoom-btn zoom-btn--floating">${zoomIcon}<span>${zoomLabel}</span></a>`;

    class SiteHeader extends HTMLElement {
        connectedCallback() {
            this.innerHTML = headerMarkup;
            const showCases = isCasesPublic();
            this.querySelectorAll("[data-home-case-link]").forEach((element) => {
                element.hidden = !showCases;
                element.style.display = showCases ? "" : "none";
            });
            if (this.dataset.page === "home") {
                const casesSection = document.getElementById("cases");
                if (casesSection) {
                    casesSection.hidden = !showCases;
                    casesSection.style.display = showCases ? "" : "none";
                }
            }

            this.querySelectorAll("[data-site-href]").forEach((link) => {
                link.href = new URL(link.dataset.siteHref, siteRoot).href;
            });
            const zoomValid = /^https:\/\//i.test(zoomUrl) && isZoomPublic();
            this.querySelectorAll("[data-zoom-link]").forEach((link) => {
                if (zoomValid) {
                    link.href = zoomUrl;
                } else {
                    link.hidden = true;
                }
            });
            const floating = this.querySelector(".zoom-btn--floating");
            if (floating && zoomValid) {
                const update = () => {
                    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
                    floating.classList.toggle("zoom-btn--away", atBottom);
                };
                window.addEventListener("scroll", update, { passive: true });
                window.addEventListener("resize", update);
                update();
            }
            this.querySelectorAll("[data-site-src]").forEach((image) => {
                image.src = new URL(image.dataset.siteSrc, siteRoot).href;
            });

            if (location.pathname.endsWith("/cases.html")) {
                this.querySelectorAll('[data-page-link="cases"]').forEach((link) => {
                    link.setAttribute("aria-current", "page");
                });
            }

            this.querySelectorAll("[data-menu-toggle]").forEach((button) => {
                button.addEventListener("click", () => this.toggleMenu());
            });
            this.querySelectorAll("#site-mobile-menu a").forEach((link) => {
                link.addEventListener("click", () => this.setMenuOpen(false));
            });
        }

        toggleMenu() {
            const menu = this.querySelector("#site-mobile-menu");
            this.setMenuOpen(menu.classList.contains("translate-x-full"));
        }

        setMenuOpen(isOpen) {
            const menu = this.querySelector("#site-mobile-menu");
            const toggle = this.querySelector('[aria-controls="site-mobile-menu"]');
            menu.classList.toggle("translate-x-full", !isOpen);
            document.body.classList.toggle("overflow-hidden", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        }
    }

    customElements.define("site-header", SiteHeader);
})();