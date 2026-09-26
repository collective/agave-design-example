// Agave — Tweaks panel app. Loaded on every page; delegates theme application
// to AgaveChrome (in chrome.js) and mirrors values to localStorage so choices
// carry across pages.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "logo": "plone",
  "accent": "clay",
  "radius": 6,
  "font": "hanken"
}/*EDITMODE-END*/;

function AgaveTweaks() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem("agave:tweaks") || "{}"); } catch (e) {}
  const [t, setTweak] = useTweaks({ ...TWEAK_DEFAULTS, ...saved });

  React.useEffect(() => {
    if (window.AgaveChrome) { window.AgaveChrome.applyTweaks(t); window.AgaveChrome.save(t); }
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand" />
      <TweakRadio label="Logo" value={t.logo}
        options={[{ value: "plone", label: "Plone" }, { value: "agave", label: "Agave" }]}
        onChange={(v) => setTweak("logo", v)} />

      <TweakSection label="Colour" />
      <TweakRadio label="Warm accent" value={t.accent}
        options={[{ value: "clay", label: "Clay" }, { value: "coral", label: "Coral" }, { value: "amber", label: "Amber" }]}
        onChange={(v) => setTweak("accent", v)} />

      <TweakSection label="Shape & type" />
      <TweakRadio label="Corners" value={t.radius}
        options={[{ value: 2, label: "Sharp" }, { value: 6, label: "Soft" }, { value: 12, label: "Round" }]}
        onChange={(v) => setTweak("radius", v)} />
      <TweakRadio label="Typeface" value={t.font}
        options={[{ value: "hanken", label: "Hanken" }, { value: "public", label: "Public" }, { value: "system", label: "System" }]}
        onChange={(v) => setTweak("font", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("agave-tweaks")).render(<AgaveTweaks />);
