import { useEffect, useRef, useState } from "react";
import coin from "@/assets/coin.png";

type Pop = { id: number; x: number; y: number; value: number };
type Upgrade = { id: string; name: string; desc: string; baseCost: number; baseEffect: number; type: "tap" | "passive" };

const UPGRADES: Upgrade[] = [
  { id: "ritual", name: "Ritual", desc: "+1 per tap", baseCost: 50, baseEffect: 1, type: "tap" },
  { id: "drape", name: "Drape", desc: "+1 / sec", baseCost: 120, baseEffect: 1, type: "passive" },
  { id: "leather", name: "Leather", desc: "+5 / sec", baseCost: 600, baseEffect: 5, type: "passive" },
  { id: "void", name: "Void", desc: "+25 / sec", baseCost: 3200, baseEffect: 25, type: "passive" },
  { id: "trinity", name: "Trinity", desc: "+5 per tap", baseCost: 5000, baseEffect: 5, type: "tap" },
  { id: "atelier", name: "Atelier", desc: "+150 / sec", baseCost: 18000, baseEffect: 150, type: "passive" },
];

const STORAGE_KEY = "ro_kombat_v1";
const MAX_ENERGY = 1000;

const fmt = (n: number) => {
  if (n < 1000) return Math.floor(n).toString();
  if (n < 1_000_000) return (n / 1000).toFixed(2) + "K";
  if (n < 1_000_000_000) return (n / 1_000_000).toFixed(2) + "M";
  return (n / 1_000_000_000).toFixed(2) + "B";
};

const Kombat = () => {
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [levels, setLevels] = useState<Record<string, number>>({});
  const [pops, setPops] = useState<Pop[]>([]);
  const [tab, setTab] = useState<"tap" | "shop">("tap");
  const [pressed, setPressed] = useState(false);
  const popId = useRef(0);

  // load
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const s = JSON.parse(raw);
        setCoins(s.coins ?? 0);
        setLevels(s.levels ?? {});
        setEnergy(s.energy ?? MAX_ENERGY);
      } catch {}
    }
  }, []);

  // derived
  const tapPower = 1 + UPGRADES.filter((u) => u.type === "tap").reduce((a, u) => a + (levels[u.id] ?? 0) * u.baseEffect, 0);
  const passive = UPGRADES.filter((u) => u.type === "passive").reduce((a, u) => a + (levels[u.id] ?? 0) * u.baseEffect, 0);

  // save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ coins, levels, energy }));
  }, [coins, levels, energy]);

  // passive income + energy regen
  useEffect(() => {
    const t = setInterval(() => {
      setCoins((c) => c + passive / 10);
      setEnergy((e) => Math.min(MAX_ENERGY, e + 3));
    }, 100);
    return () => clearInterval(t);
  }, [passive]);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (energy < tapPower) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    setCoins((c) => c + tapPower);
    setEnergy((en) => Math.max(0, en - tapPower));
    setPressed(true);
    setTimeout(() => setPressed(false), 120);

    const id = ++popId.current;
    setPops((p) => [...p, { id, x, y, value: tapPower }]);
    setTimeout(() => setPops((p) => p.filter((pp) => pp.id !== id)), 900);
  };

  const cost = (u: Upgrade) => Math.floor(u.baseCost * Math.pow(1.6, levels[u.id] ?? 0));

  const buy = (u: Upgrade) => {
    const c = cost(u);
    if (coins < c) return;
    setCoins((x) => x - c);
    setLevels((l) => ({ ...l, [u.id]: (l[u.id] ?? 0) + 1 }));
  };

  return (
    <section className="min-h-screen bg-background pt-28 pb-32 px-6 md:px-12 relative">
      {/* Header stats */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="micro text-foreground/60 mb-3">Owens Kombat — Tap Ritual</p>
          <div className="flex items-center justify-center gap-3">
            <span className="display text-6xl md:text-7xl text-bone tabular-nums">{fmt(coins)}</span>
          </div>
          <p className="micro text-foreground/50 mt-3">
            +{tapPower} / tap · +{fmt(passive)} / sec
          </p>
        </div>

        {tab === "tap" && (
          <>
            {/* Coin */}
            <div className="relative flex items-center justify-center mb-8">
              <button
                onMouseDown={handleTap}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleTap(e);
                }}
                className={`relative select-none touch-none transition-transform duration-100 ${
                  pressed ? "scale-95" : "scale-100"
                } ${energy < tapPower ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                style={{ filter: "drop-shadow(0 30px 60px hsl(var(--bone) / 0.15))" }}
              >
                <img
                  src={coin}
                  alt="Ritual coin"
                  draggable={false}
                  className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain pointer-events-none"
                />
                {pops.map((p) => (
                  <span
                    key={p.id}
                    className="absolute display text-3xl md:text-4xl text-bone pointer-events-none animate-[rise_0.9s_ease-out_forwards]"
                    style={{ left: p.x, top: p.y }}
                  >
                    +{p.value}
                  </span>
                ))}
              </button>
            </div>

            {/* Energy */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between micro text-foreground/60 mb-2">
                <span>Energy</span>
                <span className="tabular-nums">
                  {Math.floor(energy)} / {MAX_ENERGY}
                </span>
              </div>
              <div className="h-px bg-border relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-bone transition-all duration-200"
                  style={{ width: `${(energy / MAX_ENERGY) * 100}%`, height: "2px", top: "-0.5px" }}
                />
              </div>
            </div>
          </>
        )}

        {tab === "shop" && (
          <div className="space-y-3">
            {UPGRADES.map((u) => {
              const lvl = levels[u.id] ?? 0;
              const c = cost(u);
              const can = coins >= c;
              return (
                <button
                  key={u.id}
                  disabled={!can}
                  onClick={() => buy(u)}
                  className={`w-full flex items-center justify-between p-5 border text-left transition-colors ${
                    can ? "border-foreground/30 hover:border-bone hover:bg-secondary" : "border-border opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div>
                    <p className="display text-2xl text-bone">{u.name}</p>
                    <p className="micro text-foreground/60 mt-1">
                      Lvl {lvl} · {u.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="micro text-foreground/50">Cost</p>
                    <p className="text-lg tabular-nums text-bone">{fmt(c)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="fixed bottom-0 inset-x-0 border-t border-border bg-background/95 backdrop-blur-md z-40">
        <div className="max-w-2xl mx-auto grid grid-cols-2">
          {(["tap", "shop"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-5 micro transition-colors ${tab === t ? "text-bone" : "text-foreground/50"}`}
            >
              {t === "tap" ? "Ritual" : "Atelier"}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rise {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -180%) scale(1.1); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Kombat;
