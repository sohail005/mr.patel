"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const themes = [
  { id: "midnight", name: "Midnight", swatch: "#8fc7ff" },
  { id: "emerald", name: "Emerald", swatch: "#7fe0c3" },
  { id: "ember", name: "Ember", swatch: "#ff9f6e" },
  { id: "violet", name: "Violet", swatch: "#c4a7ff" },
  { id: "daylight", name: "Daylight", swatch: "#2563eb" },
] as const;

type ThemeId = (typeof themes)[number]["id"];
type SwatchStyle = CSSProperties & { "--theme-swatch": string };

const storageKey = "portfolio-theme";

function isThemeId(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "midnight";
    const savedTheme = localStorage.getItem(storageKey);
    return isThemeId(savedTheme) ? savedTheme : "midnight";
  });
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const setTheme = (theme: ThemeId) => {
    setActiveTheme(theme);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
  };

  return (
    <div ref={menuRef} className="theme-switcher" aria-label="Theme settings">
      <button
        type="button"
        className="theme-quick"
        aria-pressed={activeTheme !== "daylight"}
        onClick={() => setTheme("midnight")}
      >
        Dark
      </button>
      <button
        type="button"
        className="theme-quick"
        aria-pressed={activeTheme === "daylight"}
        onClick={() => setTheme("daylight")}
      >
        White
      </button>
      <button
        type="button"
        className="theme-menu-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        Themes
      </button>

      {open ? (
        <div className="theme-dropdown" role="menu">
          {themes.map((theme) => {
            const selected = theme.id === activeTheme;

            return (
              <button
                key={theme.id}
                type="button"
                className="theme-option"
                style={{ "--theme-swatch": theme.swatch } as SwatchStyle}
                aria-checked={selected}
                role="menuitemradio"
                onClick={() => {
                  setTheme(theme.id);
                  setOpen(false);
                }}
              >
                <span className="theme-swatch" aria-hidden="true">
                  <span />
                </span>
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
