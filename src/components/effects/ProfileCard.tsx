"use client";

import {
  CSSProperties,
  PointerEvent,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import "./ProfileCard.css";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,rgba(96,73,110,0.55) 0%,rgba(113,196,255,0.27) 100%)";

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

type ProfileCardProps = {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  children?: ReactNode;
};

type CardVars = CSSProperties & Record<`--${string}`, string>;

function ProfileCardComponent({
  avatarUrl,
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name = "Sohail Patel",
  title = "Software Developer",
  handle = "sohailpatel",
  status = "Available",
  contactText = "Contact",
  showUserInfo = true,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const setVarsFromXY = useCallback((x: number, y: number) => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;

    const width = shell.clientWidth || 1;
    const height = shell.clientHeight || 1;
    const percentX = clamp((100 / width) * x);
    const percentY = clamp((100 / height) * y);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    wrap.style.setProperty("--pointer-x", `${percentX}%`);
    wrap.style.setProperty("--pointer-y", `${percentY}%`);
    wrap.style.setProperty("--background-x", `${adjust(percentX, 0, 100, 35, 65)}%`);
    wrap.style.setProperty("--background-y", `${adjust(percentY, 0, 100, 35, 65)}%`);
    wrap.style.setProperty(
      "--pointer-from-center",
      `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`
    );
    wrap.style.setProperty("--pointer-from-top", `${percentY / 100}`);
    wrap.style.setProperty("--pointer-from-left", `${percentX / 100}`);
    wrap.style.setProperty("--rotate-x", `${round(-(centerX / 5))}deg`);
    wrap.style.setProperty("--rotate-y", `${round(centerY / 4)}deg`);
  }, []);

  const animateToTarget = useCallback(() => {
    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      setVarsFromXY(current.x, current.y);

      if (Math.hypot(target.x - current.x, target.y - current.y) > 0.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    tick();
  }, [setVarsFromXY]);

  const setTarget = useCallback(
    (x: number, y: number) => {
      targetRef.current = { x, y };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animateToTarget);
      }
    },
    [animateToTarget]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!enableTilt) return;
      const shell = shellRef.current;
      if (!shell) return;
      const rect = shell.getBoundingClientRect();
      setTarget(event.clientX - rect.left, event.clientY - rect.top);
    },
    [enableTilt, setTarget]
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const shell = shellRef.current;
      if (!shell || !enableTilt) return;
      shell.classList.add("active");
      const rect = shell.getBoundingClientRect();
      setTarget(event.clientX - rect.left, event.clientY - rect.top);
    },
    [enableTilt, setTarget]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !enableTilt) return;
    shell.classList.remove("active");
    setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
  }, [enableTilt, setTarget]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const center = { x: shell.clientWidth / 2, y: shell.clientHeight / 2 };
    currentRef.current = center;
    targetRef.current = center;
    setVarsFromXY(center.x, center.y);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [setVarsFromXY]);

  const cardStyle = useMemo<CardVars>(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      "--behind-glow-color": behindGlowColor ?? "rgba(125,190,255,0.67)",
      "--behind-glow-size": behindGlowSize ?? "50%",
    }),
    [behindGlowColor, behindGlowSize, grainUrl, iconUrl, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      {behindGlowEnabled ? <div className="pc-behind" /> : null}
      <div
        ref={shellRef}
        className="pc-card-shell"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <section className="pc-card" aria-label={`${name} profile card`}>
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name} profile`}
                loading="eager"
              />
              {showUserInfo ? (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name} mini profile`}
                        loading="lazy"
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={handleContactClick}
                    type="button"
                    aria-label={`Contact ${name}`}
                  >
                    {contactText}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3 className="text-[#224248]">{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const ProfileCard = memo(ProfileCardComponent);
export default ProfileCard;
