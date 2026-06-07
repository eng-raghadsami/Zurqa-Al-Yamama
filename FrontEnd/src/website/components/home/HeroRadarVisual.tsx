import { useReducedMotion } from "@core/hooks/useReducedMotion";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwETDnAo27sVhZY3SpgYYKHTPluKhVuATAx-x-dXjXJ2Fkzz7dVQs_O6E-c2Oufpvm3GYVD3AaWTIaQK3qZ3eXlDW26IokpTj-D6Rkczmk262u9ShWNwFOOL7S3hrVlvSc7rv20lsoT2pwDUlG33e1ZrhmH0cBtRxcf5s_Nx2HxLp44bL5OapAfrJdvz0_4ymjonP_BrN1TvRrSupFV-woNwbvHZ0hr1YgyKdrcKLJ-yXgqVYdIvGMSIm7WMMkvqsufz8sFO7yYT_E";

const NODES = [
  { cx: 72, cy: 48, delay: 0 },
  { cx: 168, cy: 72, delay: 0.4 },
  { cx: 200, cy: 140, delay: 0.8 },
  { cx: 148, cy: 196, delay: 1.2 },
  { cx: 52, cy: 168, delay: 1.6 },
  { cx: 28, cy: 96, delay: 2 },
];

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 3],
  [1, 4],
];

export default function HeroRadarVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center home-hero-visual-enter">
      <div
        className={`absolute inset-0 bg-secondary/5 rounded-full blur-3xl ${
          reducedMotion ? "" : "home-hero-glow"
        }`}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 240 240"
        aria-hidden
      >
        <circle
          cx="120"
          cy="120"
          r="108"
          fill="none"
          stroke="rgba(212,175,55,0.08)"
          strokeWidth="1"
        />
        <circle
          cx="120"
          cy="120"
          r="82"
          fill="none"
          stroke="rgba(212,175,55,0.12)"
          strokeWidth="1"
          strokeDasharray="4 8"
          className={reducedMotion ? "" : "home-radar-ring-slow"}
        />
        <circle
          cx="120"
          cy="120"
          r="56"
          fill="none"
          stroke="rgba(212,175,55,0.18)"
          strokeWidth="1"
          strokeDasharray="2 6"
          className={reducedMotion ? "" : "home-radar-ring-reverse"}
        />

        {CONNECTIONS.map(([from, to], index) => (
          <line
            key={`${from}-${to}`}
            x1={NODES[from].cx}
            y1={NODES[from].cy}
            x2={NODES[to].cx}
            y2={NODES[to].cy}
            stroke="rgba(212,175,55,0.15)"
            strokeWidth="1"
            className={reducedMotion ? "" : "home-network-line"}
            style={{ animationDelay: `${index * 0.3}s` }}
          />
        ))}

        {NODES.map((node, index) => (
          <g key={index}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#D4AF37"
              className={reducedMotion ? "" : "home-network-node"}
              style={{ animationDelay: `${node.delay}s` }}
            />
            {!reducedMotion && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
                className="home-network-pulse"
                style={{ animationDelay: `${node.delay}s` }}
              />
            )}
          </g>
        ))}

        {!reducedMotion && (
          <g className="home-radar-sweep" style={{ transformOrigin: "120px 120px" }}>
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="18"
              stroke="url(#homeRadarSweepGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        <defs>
          <linearGradient id="homeRadarSweepGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(212,175,55,0.9)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={`relative z-20 w-[85%] aspect-square bg-surface-container-lowest rounded-xl shadow-xl flex items-center justify-center p-8 border border-outline-variant/10 ${
          reducedMotion ? "" : "home-logo-float"
        }`}
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          {!reducedMotion && <div className="home-logo-shine" />}
        </div>
        <img
          alt="شعار زرقاء اليمامة"
          className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
          src={LOGO_SRC}
        />
      </div>

      {!reducedMotion && (
        <>
          <div className="home-orbit-dot home-orbit-dot-1" />
          <div className="home-orbit-dot home-orbit-dot-2" />
          <div className="home-orbit-dot home-orbit-dot-3" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-30 pointer-events-none" />
    </div>
  );
}
