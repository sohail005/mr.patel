"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const CursorEffect = dynamic(
  () => import("@/components/effects/CursorEffect"),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/effects/ScrollProgress"),
  { ssr: false }
);

/* ─── Tool definitions ──────────────────────────────────────────────── */
const TOOLS = [
  { id: "color-palette",   icon: "🎨", label: "Color Palette",       badge: "Generator", color: "#6c63ff" },
  { id: "gradient",        icon: "🌈", label: "CSS Gradient",         badge: "Builder",   color: "#00d4ff" },
  { id: "base64",          icon: "🔐", label: "Base64 Encoder",       badge: "Encoder",   color: "#ff6fd8" },
  { id: "json",            icon: "📋", label: "JSON Formatter",       badge: "Formatter", color: "#f59e0b" },
  { id: "password",        icon: "🔑", label: "Password Generator",   badge: "Generator", color: "#10b981" },
  { id: "markdown",        icon: "📝", label: "Markdown Previewer",   badge: "Preview",   color: "#3b82f6" },
  { id: "unit",            icon: "📐", label: "Unit Converter",       badge: "Converter", color: "#ec4899" },
  { id: "qrcode",          icon: "📱", label: "QR Code Generator",    badge: "Generator", color: "#8b5cf6" },
  { id: "wordcount",       icon: "📊", label: "Word Counter",         badge: "Analyzer",  color: "#06b6d4" },
  { id: "boxshadow",       icon: "🖼️", label: "Box Shadow Builder",   badge: "Builder",   color: "#f97316" },
  { id: "insta-reel",      icon: "🎥", label: "Insta Reel Downloader", badge: "New Tool",  color: "#e1306c" },
];

/* ════════════════════════════════════════════════════════════
   Individual Tool Panels
════════════════════════════════════════════════════════════ */

/* 1. Color Palette Generator */
function ColorPalette() {
  const [base, setBase] = useState("#6c63ff");
  const [palette, setPalette] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    const sl = s / 100, ll = l / 100;
    const a = sl * Math.min(ll, 1 - ll);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generate = useCallback(() => {
    const [h, s, l] = hexToHsl(base);
    const generated = [
      hslToHex((h + 30) % 360, s, l),
      hslToHex((h + 60) % 360, s, Math.min(l + 10, 90)),
      base,
      hslToHex((h + 180) % 360, s, l),
      hslToHex((h + 210) % 360, s, Math.max(l - 10, 15)),
      hslToHex((h + 270) % 360, Math.min(s + 15, 100), l),
      hslToHex(h, Math.max(s - 20, 10), Math.min(l + 20, 90)),
      hslToHex(h, s, Math.max(l - 20, 10)),
    ];
    setPalette(generated);
  }, [base]);

  useEffect(() => { generate(); }, [generate]);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <label className="text-sm text-[var(--color-text-muted)]">Base Color</label>
        <input type="color" value={base} onChange={e => setBase(e.target.value)}
          className="w-12 h-12 rounded-xl border-2 border-[rgba(108,99,255,0.3)] bg-transparent cursor-pointer" />
        <span className="font-mono text-sm text-white">{base.toUpperCase()}</span>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={generate}
          className="ml-auto px-5 py-2 rounded-full text-sm bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium">
          ✨ Regenerate
        </motion.button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {palette.map((hex, i) => (
          <motion.button key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.04 }} whileHover={{ scale: 1.08, y: -4 }}
            onClick={() => copy(hex)}
            className="relative group aspect-square rounded-2xl flex flex-col items-center justify-end pb-2 overflow-hidden shadow-lg"
            style={{ background: hex }}>
            <span className="text-[10px] font-mono text-white/80 drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {copied === hex ? "✓ Copied!" : hex.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">Click any swatch to copy its hex value</p>
    </div>
  );
}

/* 2. CSS Gradient Builder */
function GradientBuilder() {
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: "#6c63ff", pos: 0 },
    { color: "#00d4ff", pos: 50 },
    { color: "#ff6fd8", pos: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const css = type === "linear"
    ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.pos}%`).join(", ")})`
    : type === "radial"
      ? `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.pos}%`).join(", ")})`
      : `conic-gradient(from ${angle}deg, ${stops.map(s => `${s.color} ${s.pos}%`).join(", ")})`;

  const copy = () => {
    navigator.clipboard.writeText(`background: ${css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div className="w-full h-40 rounded-2xl transition-all duration-300 shadow-lg" style={{ background: css }} />

      <div className="flex gap-2 flex-wrap">
        {(["linear", "radial", "conic"] as const).map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition-all ${type === t ? "bg-[var(--color-primary)] text-white" : "bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10"}`}>
            {t}
          </button>
        ))}
      </div>

      {type !== "radial" && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-[var(--color-text-muted)] w-20">Angle: {angle}°</label>
          <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)}
            className="flex-1 accent-[var(--color-primary)]" />
        </div>
      )}

      <div className="space-y-3">
        {stops.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <input type="color" value={s.color}
              onChange={e => setStops(st => st.map((x, j) => j === i ? { ...x, color: e.target.value } : x))}
              className="w-9 h-9 rounded-lg border border-[rgba(108,99,255,0.3)] bg-transparent cursor-pointer" />
            <input type="range" min={0} max={100} value={s.pos}
              onChange={e => setStops(st => st.map((x, j) => j === i ? { ...x, pos: +e.target.value } : x))}
              className="flex-1 accent-[var(--color-primary)]" />
            <span className="text-xs font-mono text-[var(--color-text-muted)] w-8">{s.pos}%</span>
          </div>
        ))}
      </div>

      <div className="relative bg-[rgba(255,255,255,0.04)] rounded-xl p-4 font-mono text-xs text-[var(--color-secondary)] border border-[rgba(108,99,255,0.2)]">
        <span>background: {css};</span>
        <motion.button whileTap={{ scale: 0.95 }} onClick={copy}
          className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs bg-[var(--color-primary)] text-white">
          {copied ? "✓" : "Copy"}
        </motion.button>
      </div>
    </div>
  );
}

/* 3. Base64 Encoder / Decoder */
function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const run = () => {
    try {
      setOutput(mode === "encode" ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input))));
    } catch { setOutput("⚠️ Invalid input for decoding"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition-all ${mode === m ? "bg-[var(--color-primary)] text-white" : "bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10"}`}>
            {m}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} placeholder="Paste text here…"
        className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-[var(--color-primary)] transition-colors font-mono" />
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={run}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium text-sm">
        {mode === "encode" ? "🔐 Encode" : "🔓 Decode"}
      </motion.button>
      {output && (
        <div className="bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 font-mono text-xs text-[var(--color-secondary)] break-all">
          {output}
          <button onClick={() => navigator.clipboard.writeText(output)} className="ml-2 text-[var(--color-text-muted)] hover:text-white text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}

/* 4. JSON Formatter */
function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <motion.button whileTap={{ scale: 0.96 }} onClick={format}
          className="px-4 py-1.5 rounded-full text-sm bg-[var(--color-primary)] text-white">Beautify</motion.button>
        <motion.button whileTap={{ scale: 0.96 }} onClick={minify}
          className="px-4 py-1.5 rounded-full text-sm bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10">Minify</motion.button>
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => { setInput(""); setOutput(""); setError(""); }}
          className="px-4 py-1.5 rounded-full text-sm bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10">Clear</motion.button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={7} placeholder='Paste your JSON here… {"key": "value"}'
        className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-[var(--color-primary)] transition-colors font-mono" />
      {error && <div className="text-red-400 text-sm px-1">⚠️ {error}</div>}
      {output && (
        <div className="relative bg-[rgba(5,8,22,0.8)] border border-[rgba(108,99,255,0.2)] rounded-xl p-4 font-mono text-xs text-[var(--color-secondary)] overflow-auto max-h-60">
          <pre>{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs bg-[var(--color-primary)] text-white">Copy</button>
        </div>
      )}
    </div>
  );
}

/* 5. Password Generator */
function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [pass, setPass] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (nums)  chars += "0123456789";
    if (syms)  chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { setPass(""); return; }
    setPass(Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(""));
  }, [len, upper, lower, nums, syms]);

  useEffect(() => { generate(); }, [generate]);

  const strength = [upper, lower, nums, syms].filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981", "#6c63ff"][strength];

  const copy = () => { navigator.clipboard.writeText(pass); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const Toggle = ({ label, val, set }: { label: string; val: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!val)}
      className={`px-3 py-1.5 rounded-full text-xs transition-all ${val ? "bg-[var(--color-primary)] text-white" : "bg-white/5 text-[var(--color-text-muted)]"}`}>
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="relative bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 flex items-center gap-3">
        <span className="flex-1 font-mono text-lg text-white tracking-widest break-all">{pass}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={copy}
          className="shrink-0 px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)] text-white">
          {copied ? "✓" : "Copy"}
        </motion.button>
      </div>

      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div animate={{ width: `${(strength / 4) * 100}%`, backgroundColor: strengthColor }}
          transition={{ duration: 0.4 }} className="h-full rounded-full" />
      </div>
      <p className="text-sm" style={{ color: strengthColor }}>Strength: {strengthLabel}</p>

      <div className="flex items-center gap-3">
        <label className="text-sm text-[var(--color-text-muted)] w-24">Length: {len}</label>
        <input type="range" min={8} max={64} value={len} onChange={e => setLen(+e.target.value)}
          className="flex-1 accent-[var(--color-primary)]" />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Toggle label="A-Z Uppercase" val={upper} set={setUpper} />
        <Toggle label="a-z Lowercase" val={lower} set={setLower} />
        <Toggle label="0-9 Numbers" val={nums} set={setNums} />
        <Toggle label="!@# Symbols" val={syms} set={setSyms} />
      </div>

      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={generate}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium text-sm">
        🔄 Generate New
      </motion.button>
    </div>
  );
}

/* 6. Markdown Previewer */
function MarkdownPreviewer() {
  const [md, setMd] = useState(`# Hello World 👋\n\nThis is **bold** and _italic_ text.\n\n- Item one\n- Item two\n- Item three\n\n\`\`\`js\nconsole.log("Hello!")\n\`\`\`\n\n> A beautiful blockquote here.\n\n[Visit Google](https://google.com)`);

  const toHtml = (text: string) => text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^\> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-[var(--color-secondary)] underline">$1</a>')
    .replace(/\n\n/g, "<br/><br/>");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-80">
      <textarea value={md} onChange={e => setMd(e.target.value)}
        className="w-full h-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-[var(--color-primary)] transition-colors font-mono" />
      <div className="h-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 overflow-auto prose-custom text-sm text-[var(--color-text)]"
        dangerouslySetInnerHTML={{ __html: toHtml(md) }} />
    </div>
  );
}

/* 7. Unit Converter */
function UnitConverter() {
  const categories = {
    Length: { units: ["m", "km", "cm", "mm", "inch", "ft", "yd", "mile"], toBase: [1, 1000, 0.01, 0.001, 0.0254, 0.3048, 0.9144, 1609.34] },
    Weight: { units: ["kg", "g", "mg", "lb", "oz", "ton"], toBase: [1, 0.001, 0.000001, 0.453592, 0.0283495, 1000] },
    Temperature: { units: ["°C", "°F", "K"], toBase: [1, 1, 1] },
    Data: { units: ["B", "KB", "MB", "GB", "TB"], toBase: [1, 1024, 1048576, 1073741824, 1099511627776] },
  };

  const [cat, setCat] = useState<keyof typeof categories>("Length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState("1");

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";
    const { units, toBase } = categories[cat];
    if (cat === "Temperature") {
      const f = units[fromUnit], t = units[toUnit];
      let celsius = f === "°C" ? v : f === "°F" ? (v - 32) * 5 / 9 : v - 273.15;
      if (t === "°C") return celsius.toFixed(4);
      if (t === "°F") return (celsius * 9 / 5 + 32).toFixed(4);
      return (celsius + 273.15).toFixed(4);
    }
    return ((v * toBase[fromUnit]) / toBase[toUnit]).toFixed(6).replace(/\.?0+$/, "");
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {Object.keys(categories).map(c => (
          <button key={c} onClick={() => { setCat(c as keyof typeof categories); setFromUnit(0); setToUnit(1); }}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${cat === c ? "bg-[var(--color-primary)] text-white" : "bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">From</label>
          <select value={fromUnit} onChange={e => setFromUnit(+e.target.value)}
            className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-2 text-white text-sm mb-2 outline-none">
            {categories[cat].units.map((u, i) => <option key={u} value={i} className="bg-[#050816]">{u}</option>)}
          </select>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value"
            className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-2 text-white text-sm outline-none focus:border-[var(--color-primary)]" />
        </div>
        <div>
          <label className="text-xs text-[var(--color-text-muted)] mb-1 block">To</label>
          <select value={toUnit} onChange={e => setToUnit(+e.target.value)}
            className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-2 text-white text-sm mb-2 outline-none">
            {categories[cat].units.map((u, i) => <option key={u} value={i} className="bg-[#050816]">{u}</option>)}
          </select>
          <div className="w-full bg-white/5 border border-[rgba(108,99,255,0.3)] rounded-xl p-2 text-[var(--color-secondary)] text-sm font-mono">
            {convert()}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 8. QR Code Generator */
function QrCodeGenerator() {
  const [text, setText] = useState("https://sohailpatel.dev");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(text, {
        width: 256, margin: 2,
        color: { dark: "#6c63ff", light: "#050816" },
      });
      setQrUrl(url);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [text]);

  useEffect(() => { generate(); }, [generate]);

  const download = () => {
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="space-y-5 flex flex-col items-center">
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter URL or text…"
        className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-3 text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {loading && <div className="text-[var(--color-text-muted)] text-sm animate-pulse">Generating…</div>}
      {qrUrl && !loading && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-2xl border border-[rgba(108,99,255,0.3)] bg-[#050816]">
          <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
        </motion.div>
      )}
      <div className="flex gap-3">
        <motion.button whileTap={{ scale: 0.95 }} onClick={generate}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm">
          🔄 Generate
        </motion.button>
        {qrUrl && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={download}
            className="px-5 py-2 rounded-xl bg-white/5 border border-[rgba(108,99,255,0.3)] text-white text-sm">
            ⬇ Download
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* 9. Word Counter */
function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { label: "Words", value: words, color: "#6c63ff" },
    { label: "Characters", value: chars, color: "#00d4ff" },
    { label: "No Spaces", value: charsNoSpace, color: "#ff6fd8" },
    { label: "Sentences", value: sentences, color: "#f59e0b" },
    { label: "Paragraphs", value: paragraphs, color: "#10b981" },
    { label: "Read (min)", value: readTime, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
        placeholder="Start typing or paste your content here to get real-time statistics…"
        className="w-full bg-white/5 border border-[rgba(108,99,255,0.2)] rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-[var(--color-primary)] transition-colors" />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {stats.map(s => (
          <motion.div key={s.label} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 0.2 }}
            className="glass-card p-3 rounded-xl text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 10. CSS Box Shadow Builder */
function BoxShadowBuilder() {
  const [shadows, setShadows] = useState([
    { x: 0, y: 8, blur: 24, spread: 0, color: "#6c63ff", alpha: 0.35, inset: false },
  ]);
  const [copied, setCopied] = useState(false);

  const css = shadows.map(s =>
    `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}${Math.round(s.alpha * 255).toString(16).padStart(2, "0")}`
  ).join(", ");

  const update = (i: number, key: string, val: number | boolean | string) =>
    setShadows(prev => prev.map((s, j) => j === i ? { ...s, [key]: val } : s));

  const copy = () => { navigator.clipboard.writeText(`box-shadow: ${css};`); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-5">
      <div className="w-full h-32 rounded-2xl bg-white/5 border border-[rgba(108,99,255,0.15)] flex items-center justify-center">
        <div className="w-24 h-24 rounded-xl bg-[var(--color-surface)]" style={{ boxShadow: css }} />
      </div>

      {shadows.map((s, i) => (
        <div key={i} className="space-y-3 p-4 rounded-xl bg-white/5 border border-[rgba(108,99,255,0.2)]">
          {[
            { label: `X: ${s.x}px`, key: "x", min: -100, max: 100, val: s.x },
            { label: `Y: ${s.y}px`, key: "y", min: -100, max: 100, val: s.y },
            { label: `Blur: ${s.blur}px`, key: "blur", min: 0, max: 100, val: s.blur },
            { label: `Spread: ${s.spread}px`, key: "spread", min: -50, max: 50, val: s.spread },
            { label: `Alpha: ${s.alpha}`, key: "alpha", min: 0, max: 1, val: s.alpha, step: 0.01 },
          ].map(({ label, key, min, max, val, step }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-[var(--color-text-muted)] w-28">{label}</span>
              <input type="range" min={min} max={max} step={step ?? 1} value={val as number}
                onChange={e => update(i, key, parseFloat(e.target.value))}
                className="flex-1 accent-[var(--color-primary)]" />
            </div>
          ))}
          <div className="flex items-center gap-4">
            <input type="color" value={s.color} onChange={e => update(i, "color", e.target.value)}
              className="w-9 h-9 rounded-lg border border-[rgba(108,99,255,0.3)] bg-transparent cursor-pointer" />
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] cursor-pointer">
              <input type="checkbox" checked={s.inset} onChange={e => update(i, "inset", e.target.checked)}
                className="accent-[var(--color-primary)]" />
              Inset
            </label>
          </div>
        </div>
      ))}

      <div className="relative bg-[rgba(5,8,22,0.8)] border border-[rgba(108,99,255,0.2)] rounded-xl p-4 font-mono text-xs text-[var(--color-secondary)]">
        box-shadow: {css};
        <motion.button whileTap={{ scale: 0.95 }} onClick={copy}
          className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs bg-[var(--color-primary)] text-white">
          {copied ? "✓ Copied" : "Copy CSS"}
        </motion.button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Tool Panel Map
════════════════════════════════════════════════════════════ */
const PANELS: Record<string, React.ReactNode> = {
  "color-palette": <ColorPalette />,
  "gradient":      <GradientBuilder />,
  "base64":        <Base64Tool />,
  "json":          <JsonFormatter />,
  "password":      <PasswordGenerator />,
  "markdown":      <MarkdownPreviewer />,
  "unit":          <UnitConverter />,
  "qrcode":        <QrCodeGenerator />,
  "wordcount":     <WordCounter />,
  "boxshadow":     <BoxShadowBuilder />,
};

/* ════════════════════════════════════════════════════════════
   Main FreeTools Page
════════════════════════════════════════════════════════════ */
export default function FreeTools() {
  const [active, setActive] = useState<string | null>(null);
  const activeTool = TOOLS.find(t => t.id === active);

  const handleToolClick = (id: string) => {
    if (id === "insta-reel") {
      window.location.href = "/tools/instagram-downloader";
      return;
    }
    setActive(active === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] relative overflow-hidden">
      <ScrollProgress />
      <CursorEffect />
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 bg-[rgba(108,99,255,0.12)] border border-[rgba(108,99,255,0.25)] text-[var(--color-primary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            100% Free · No Login · No Limits
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Free Web</span>{" "}
            <span className="text-white">Tools</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
            The best browser-based utilities — all in one place. Instant, private, and always free.
          </p>
        </motion.div>

        {/* Tool Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {TOOLS.map((tool, i) => (
            <motion.button
              key={tool.id}
              id={`tool-card-${tool.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleToolClick(tool.id)}
              className={`relative glass-card p-5 rounded-2xl flex flex-col items-center gap-3 text-center transition-all duration-300 cursor-pointer group overflow-hidden ${
                active === tool.id ? "border-[var(--color-primary)] shadow-[0_0_25px_rgba(108,99,255,0.3)]" : ""
              }`}
            >
              {/* Glow on active */}
              {active === tool.id && (
                <motion.div layoutId="tool-glow" className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${tool.color}22, transparent 70%)` }} />
              )}

              {/* Hover shimmer */}
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="text-3xl">{tool.icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{tool.label}</p>
                <span className="text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${tool.color}22`, color: tool.color, border: `1px solid ${tool.color}44` }}>
                  {tool.badge}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Expanded Tool Panel */}
        <AnimatePresence mode="wait">
          {active && activeTool && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass-card rounded-3xl p-6 md:p-8 border border-[rgba(108,99,255,0.25)] relative overflow-hidden"
            >
              {/* Panel top shimmer */}
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${activeTool.color}88, transparent)` }} />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activeTool.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-white">{activeTool.label}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${activeTool.color}22`, color: activeTool.color, border: `1px solid ${activeTool.color}44` }}>
                      {activeTool.badge}
                    </span>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActive(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[var(--color-text-muted)] hover:text-white transition-all flex items-center justify-center text-lg leading-none">
                  ×
                </motion.button>
              </div>

              <div>{PANELS[active]}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-center mt-8 text-[var(--color-text-muted)] text-sm">
            👆 Click any tool above to get started
          </motion.div>
        )}

        {/* Footer badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-center mt-20">
          <p className="text-xs text-[var(--color-text-muted)]">
            All tools run entirely in your browser — no data is sent to any server 🔒
          </p>
        </motion.div>
      </div>
    </main>
  );
}
