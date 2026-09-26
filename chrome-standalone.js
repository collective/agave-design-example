/* ============================================================
   Agave — shared site chrome (Header A + Footer)
   Injected into every page so header/footer stay identical.
   Markup is intentionally simple so it's easy to port into a
   real Plone theme template.
   ============================================================ */
(function () {
  const NAV = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "News", href: "news.html", key: "news" },
    { label: "Events", href: "event.html", key: "events" },
    { label: "Publications", href: "#", key: "pubs" },
    { label: "About", href: "page.html", key: "about", caret: true },
    { label: "Contact", href: "#", key: "contact" },
  ];

  const AGAVE_MARK = `<svg class="brand__mark" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <polygon points="14,25 16,25 6,7"  fill="var(--green-300)"/>
      <polygon points="14,25 16,25 23,6"  fill="var(--green-300)"/>
      <polygon points="14,25 16,25 10,4"  fill="var(--green-500)"/>
      <polygon points="14,25 16,25 20,4"  fill="var(--green-500)"/>
      <polygon points="14,25 16,25 15,2"  fill="var(--green-600)"/>
    </svg>`;
  const AGAVE_MARK_LIGHT = AGAVE_MARK
    .replace(/var\(--green-300\)/g, "var(--green-400)")
    .replace(/var\(--green-500\)/g, "var(--green-300)")
    .replace(/var\(--green-600\)/g, "#fff");

  const iSearch = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>`;
  const iUser = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5"/></svg>`;
  const iCaret = `<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="6 9 12 15 18 9"/></svg>`;

  function brand(light) {
    return `<a class="brand" href="index.html" aria-label="Home">
      <img class="as-plone plone-mark" src="${light ? (window.__resources && window.__resources.ploneLogoLight || 'plone-logo-light.svg') : (window.__resources && window.__resources.ploneLogo || 'plone-logo.svg')}" alt="Plone" width="158" height="41">
      <span class="as-agave">${light ? AGAVE_MARK_LIGHT : AGAVE_MARK}<span class="brand__word">ag<b>ave</b></span></span>
    </a>`;
  }

  function nav(active) {
    return `<nav class="mainnav" aria-label="Main">` + NAV.map(n =>
      `<a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}>${n.label}${n.caret ? iCaret : ""}</a>`
    ).join("") + `</nav>`;
  }

  function header(active) {
    return `<header class="ah ah--single">
      <div class="ah__inner">
        ${brand(false)}
        ${nav(active)}
        <div class="ah__tools">
          <form class="search" role="search" onsubmit="return false">
            ${iSearch}<input type="search" placeholder="Search…" aria-label="Search the site">
          </form>
          <a class="login" href="#">${iUser}Log in</a>
        </div>
      </div>
    </header>`;
  }

  function footer() {
    const explore = NAV.filter(n => n.key !== "contact").map(n =>
      `<li><a href="${n.href}">${n.label}</a></li>`).join("");
    return `<footer class="site-footer">
      <div class="ftr__top">
        <div class="ftr__about">
          ${brand(true)}
          <p class="ftr__tagline">An open, lightweight theme for Plone — light on its feet, and easy to make your own.</p>
          <div class="social" aria-label="Social links">
            <a href="#" title="Mastodon">Ma</a>
            <a href="#" title="Bluesky">Bs</a>
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="YouTube">▶</a>
          </div>
        </div>
        <div class="ftr__col">
          <h4>Explore</h4>
          <ul>${explore}</ul>
        </div>
        <div class="ftr__col">
          <h4>Contact</h4>
          <address class="ftr__addr">
            Fundación Agave<br>Av. Reforma 122, Piso 4<br>06600 Ciudad de México<br>
            <a href="mailto:hola@agave.org">hola@agave.org</a><br>+52 55 1234 5678
          </address>
        </div>
        <div class="ftr__col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Cookie settings</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Site map</a></li>
          </ul>
        </div>
      </div>
      <div class="ftr__bar">
        <div class="ftr__bar-inner">
          <span>© 2026 Fundación Agave. Powered by Plone.</span>
          <span class="spacer"></span>
          <div class="ftr__legal"><a href="#">Español</a><a href="#">English</a></div>
        </div>
      </div>
    </footer>`;
  }

  // ---- Theme tweaks (accent / radius / font / logo) ----
  const ACCENTS = {
    clay:  ["#fbf0ea", "#f6ddd0", "#e6ab8c", "#cf7d5b", "#bd6644", "#9d5031"],
    coral: ["#fcedea", "#f8d7d0", "#eea799", "#db7d6a", "#c8634f", "#a44d3c"],
    amber: ["#faf3de", "#f4e6bd", "#ecce81", "#d2a63f", "#b88a2a", "#8f6c1c"],
  };
  const CLAY_KEYS = ["--clay-50", "--clay-100", "--clay-300", "--clay-500", "--clay-600", "--clay-700"];
  const FONTS = {
    hanken: "'Hanken Grotesk', system-ui, sans-serif",
    public: "'Public Sans', system-ui, sans-serif",
    system: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  };

  function ensureFont(f) {
    if (f === "public" && !document.getElementById("agave-font-public")) {
      const l = document.createElement("link");
      l.id = "agave-font-public"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap";
      document.head.appendChild(l);
    }
  }

  function applyTweaks(t) {
    if (!t) return;
    const r = document.documentElement;
    if (t.logo) r.setAttribute("data-logo", t.logo);
    const acc = ACCENTS[t.accent] || ACCENTS.clay;
    acc.forEach((c, i) => r.style.setProperty(CLAY_KEYS[i], c));
    if (t.radius != null) r.style.setProperty("--radius", t.radius + "px");
    if (t.font) { r.style.setProperty("--font", FONTS[t.font] || FONTS.hanken); ensureFont(t.font); }
  }

  // apply saved tweaks as early as possible (avoid a flash)
  let savedTweaks = {};
  try { savedTweaks = JSON.parse(localStorage.getItem("agave:tweaks") || "{}"); } catch (e) {}
  try {
    document.documentElement.setAttribute("data-logo", savedTweaks.logo || localStorage.getItem("agave:logo") || "plone");
  } catch (e) {
    document.documentElement.setAttribute("data-logo", "plone");
  }
  applyTweaks(savedTweaks);

  function mount() {
    const h = document.querySelector("[data-agave-header]");
    if (h) h.innerHTML = header(h.getAttribute("data-nav") || "");
    const f = document.querySelector("[data-agave-footer]");
    if (f) f.innerHTML = footer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  window.AgaveChrome = {
    setLogo(v) { document.documentElement.setAttribute("data-logo", v); try { localStorage.setItem("agave:logo", v); } catch (e) {} },
    applyTweaks,
    save(t) { try { localStorage.setItem("agave:tweaks", JSON.stringify(t)); } catch (e) {} },
  };
})();
