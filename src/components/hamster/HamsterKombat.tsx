import { useEffect, useRef, useState } from "react";
import hcoin from "@/assets/hcoin.png";
import hamster from "@/assets/hamster.png";

type Pop = { id: number; x: number; y: number; v: number };
type Upgrade = { id: string; name: string; emoji: string; baseCost: number; effect: number; type: "tap" | "passive" };

const UPGRADES: Upgrade[] = [
  { id: "paw", name: "Stronger Paws", emoji: "🥊", baseCost: 100, effect: 1, type: "tap" },
  { id: "wheel", name: "Hamster Wheel", emoji: "⚙️", baseCost: 250, effect: 2, type: "passive" },
  { id: "farm", name: "Seed Farm", emoji: "🌾", baseCost: 1200, effect: 10, type: "passive" },
  { id: "ceo", name: "CEO Suit", emoji: "💼", baseCost: 5000, effect: 5, type: "tap" },
  { id: "exchange", name: "Crypto Exchange", emoji: "🏦", baseCost: 12000, effect: 75, type: "passive" },
  { id: "rocket", name: "To The Moon", emoji: "🚀", baseCost: 80000, effect: 500, type: "passive" },
];

const KEY = "hk_save_v1";
const MAX_ENERGY = 1500;

const fmt = (n: number) => {
  if (n < 1000) return Math.floor(n).toString();
  if (n < 1e6) return (n / 1e3).toFixed(2) + "K";
  if (n < 1e9) return (n / 1e6).toFixed(2) + "M";
  return (n / 1e9).toFixed(2) + "B";
};

const LEAGUES = [
  { name: "Bronze", min: 0 },
  { name: "Silver", min: 5_000 },
  { name: "Gold", min: 50_000 },
  { name: "Platinum", min: 250_000 },
  { name: "Diamond", min: 1_000_000 },
  { name: "Master", min: 10_000_000 },
];

const HamsterKombat = () => {
  const [coins, setCoins] = useState(0);
  const [total, setTotal] = useState(0);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [levels, setLevels] = useState<Record<string, number>>({});
  const [pops, setPops] = useState<Pop[]>([]);
  const [tab, setTab] = useState<"home" | "mine" | "league">("home");
  const [press, setPress] = useState(false);
  const popId = useRef(0);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const s = JSON.parse(raw);
        setCoins(s.coins ?? 0);
        setTotal(s.total ?? 0);
        setLevels(s.levels ?? {});
        setEnergy(s.energy ?? MAX_ENERGY);
      } catch {}
    }
  }, []);

  const tapPower = 1 + UPGRADES.filter((u) => u.type === "tap").reduce((a, u) => a + (levels[u.id] ?? 0) * u.effect, 0);
  const passive = UPGRADES.filter((u) => u.type === "passive").reduce((a, u) => a + (levels[u.id] ?? 0) * u.effect, 0);
  const league = [...LEAGUES].reverse().find((l) => total >= l.min) ?? LEAGUES[0];

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ coins, total, levels, energy }));
  }, [coins, total, levels, energy]);

  useEffect(() => {
    const t = setInterval(() => {
      setCoins((c) => c + passive / 10);
      setTotal((tt) => tt + passive / 10);
      setEnergy((e) => Math.min(MAX_ENERGY, e + 3));
    }, 100);
    return () => clearInterval(t);
  }, [passive]);

  const tap = (e: React.MouseEvent | React.TouchEvent) => {
    if (energy < tapPower) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;
    setCoins((c) => c + tapPower);
    setTotal((c) => c + tapPower);
    setEnergy((en) => Math.max(0, en - tapPower));
    setPress(true);
    setTimeout(() => setPress(false), 100);
    const id = ++popId.current;
    setPops((p) => [...p, { id, x, y, v: tapPower }]);
    setTimeout(() => setPops((p) => p.filter((pp) => pp.id !== id)), 900);
  };

  const cost = (u: Upgrade) => Math.floor(u.baseCost * Math.pow(1.5, levels[u.id] ?? 0));
  const buy = (u: Upgrade) => {
    const c = cost(u);
    if (coins < c) return;
    setCoins((x) => x - c);
    setLevels((l) => ({ ...l, [u.id]: (l[u.id] ?? 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-hk-bg text-hk-text font-hk pb-28">
      {/* Top bar */}
      <div className="px-5 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-hk-card flex items-center justify-center text-xl">🐹</div>
            <div>
              <p className="text-xs text-hk-muted">Player</p>
              <p className="text-sm font-semibold">CryptoHamster</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-hk-card border border-hk-border text-xs">
            🏆 {league.name}
          </div>
        </div>

        {/* Coin counter */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <img src={hcoin} alt="coin" className="w-10 h-10" />
            <span className="text-5xl font-bold tabular-nums">{fmt(coins)}</span>
          </div>
          <p className="text-xs text-hk-muted mt-2">
            +{tapPower} per tap · +{fmt(passive)}/sec · Total mined {fmt(total)}
          </p>
        </div>
      </div>

      {tab === "home" && (
        <div className="max-w-md mx-auto px-5">
          {/* Hamster tap area */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute w-[300px] h-[300px] rounded-full bg-hk-accent/20 blur-3xl" />
            <button
              onMouseDown={tap}
              onTouchStart={(e) => {
                e.preventDefault();
                tap(e);
              }}
              className={`relative w-[280px] h-[280px] rounded-full bg-gradient-to-br from-hk-accent to-hk-accent2 flex items-center justify-center shadow-[0_20px_60px_-10px_hsl(var(--hk-accent)/0.6)] active:scale-95 transition-transform select-none ${
                energy < tapPower ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${press ? "scale-95" : ""}`}
            >
              <img
                src={hamster}
                alt="Hamster CEO"
                draggable={false}
                className="w-[260px] h-[260px] object-contain pointer-events-none"
              />
              {pops.map((p) => (
                <span
                  key={p.id}
                  className="absolute text-3xl font-bold text-white pointer-events-none animate-hk-rise"
                  style={{ left: p.x, top: p.y, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  +{p.v}
                </span>
              ))}
            </button>
          </div>

          {/* Energy */}
          <div className="mt-2">
            <div className="flex justify-between text-xs text-hk-muted mb-1.5">
              <span>⚡ Energy</span>
              <span className="tabular-nums">
                {Math.floor(energy)} / {MAX_ENERGY}
              </span>
            </div>
            <div className="h-2 rounded-full bg-hk-card overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-hk-accent2 to-hk-accent transition-all"
                style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {tab === "mine" && (
        <div className="max-w-md mx-auto px-5 mt-4">
          <h2 className="text-lg font-bold mb-3">⛏️ Mine — Upgrades</h2>
          <div className="grid grid-cols-2 gap-3">
            {UPGRADES.map((u) => {
              const lvl = levels[u.id] ?? 0;
              const c = cost(u);
              const can = coins >= c;
              return (
                <button
                  key={u.id}
                  disabled={!can}
                  onClick={() => buy(u)}
                  className={`p-4 rounded-2xl bg-hk-card border text-left transition-all ${
                    can ? "border-hk-accent/40 hover:border-hk-accent active:scale-95" : "border-hk-border opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="text-3xl mb-2">{u.emoji}</div>
                  <p className="font-semibold text-sm">{u.name}</p>
                  <p className="text-xs text-hk-muted mt-1">
                    +{u.effect} {u.type === "tap" ? "/ tap" : "/ sec"}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-hk-border">
                    <span className="text-xs text-hk-muted">Lvl {lvl}</span>
                    <span className="text-sm font-bold text-hk-accent">{fmt(c)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {tab === "league" && (
        <div className="max-w-md mx-auto px-5 mt-4">
          <h2 className="text-lg font-bold mb-3">🏆 Leagues</h2>
          <div className="space-y-2">
            {LEAGUES.map((l, i) => {
              const active = league.name === l.name;
              const reached = total >= l.min;
              return (
                <div
                  key={l.name}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    active ? "bg-hk-accent/10 border-hk-accent" : "bg-hk-card border-hk-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-hk-bg flex items-center justify-center text-lg">
                      {reached ? "🏆" : "🔒"}
                    </div>
                    <div>
                      <p className="font-semibold">{l.name}</p>
                      <p className="text-xs text-hk-muted">From {fmt(l.min)} coins</p>
                    </div>
                  </div>
                  {active && <span className="text-xs px-2 py-1 rounded-full bg-hk-accent text-black font-bold">YOU</span>}
                  {i === LEAGUES.length - 1 && !active && reached && (
                    <span className="text-xs text-hk-muted">MAX</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="fixed bottom-0 inset-x-0 bg-hk-card/95 backdrop-blur-xl border-t border-hk-border z-40">
        <div className="max-w-md mx-auto grid grid-cols-3">
          {([
            { id: "home", label: "Tap", icon: "🐹" },
            { id: "mine", label: "Mine", icon: "⛏️" },
            { id: "league", label: "League", icon: "🏆" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                tab === t.id ? "text-hk-accent" : "text-hk-muted"
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HamsterKombat;
