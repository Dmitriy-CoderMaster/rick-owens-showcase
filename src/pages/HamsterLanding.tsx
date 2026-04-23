import { Link } from "react-router-dom";
import { useEffect } from "react";
import hamster from "@/assets/hamster.png";
import hcoin from "@/assets/hcoin.png";

const HamsterLanding = () => {
  useEffect(() => {
    document.title = "Hamster Kombat — Tap. Earn. Conquer.";
  }, []);

  const features = [
    { icon: "🐹", title: "Tap to Earn", desc: "Every tap of your CEO hamster mines real coins. Endless dopamine." },
    { icon: "⚙️", title: "Passive Mining", desc: "Buy upgrades and earn even while you sleep. Hamsters never rest." },
    { icon: "🏆", title: "Leagues", desc: "Climb from Bronze to Master. Prove you're the alpha hamster." },
    { icon: "🚀", title: "To The Moon", desc: "Stack coins, scale your exchange, and ride the rocket to the top." },
  ];

  return (
    <div className="min-h-screen bg-hk-bg text-hk-text font-hk overflow-hidden">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-hk-bg/80 backdrop-blur-xl border-b border-hk-border">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={hcoin} alt="" className="w-8 h-8" />
            <span className="font-bold text-lg">HAMSTER KOMBAT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-hk-muted">
            <a href="#features" className="hover:text-hk-text transition-colors">Features</a>
            <a href="#how" className="hover:text-hk-text transition-colors">How it works</a>
            <a href="#stats" className="hover:text-hk-text transition-colors">Stats</a>
          </div>
          <Link
            to="/play"
            className="px-5 py-2 rounded-full bg-hk-accent text-black font-bold text-sm hover:scale-105 transition-transform"
          >
            Play Now
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-hk-accent/20 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hk-card border border-hk-border text-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-hk-accent animate-pulse" />
              250M+ players worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-6">
              Tap. Earn.<br />
              <span className="bg-gradient-to-r from-hk-accent to-hk-accent2 bg-clip-text text-transparent">
                Conquer.
              </span>
            </h1>
            <p className="text-lg text-hk-muted max-w-md mb-8 leading-relaxed">
              The biggest tap-to-earn game in the universe. Build your crypto empire, one hamster paw at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/play"
                className="px-8 py-4 rounded-full bg-hk-accent text-black font-bold hover:scale-105 transition-transform shadow-[0_10px_40px_-10px_hsl(var(--hk-accent))]"
              >
                🐹 Start Tapping
              </Link>
              <a
                href="#how"
                className="px-8 py-4 rounded-full border border-hk-border hover:border-hk-accent transition-colors"
              >
                Learn More
              </a>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-hk-border">
              <div>
                <p className="text-2xl font-bold text-hk-accent">250M+</p>
                <p className="text-xs text-hk-muted uppercase tracking-wider">Players</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-hk-accent">∞</p>
                <p className="text-xs text-hk-muted uppercase tracking-wider">Taps / day</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-hk-accent">100%</p>
                <p className="text-xs text-hk-muted uppercase tracking-wider">Free</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-hk-accent to-hk-accent2 rounded-full blur-3xl opacity-30 animate-pulse" />
            <img
              src={hamster}
              alt="Hamster CEO"
              className="relative w-full max-w-md drop-shadow-[0_20px_50px_rgba(250,204,21,0.4)] animate-hk-float"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Why <span className="text-hk-accent">millions</span> can't stop tapping
          </h2>
          <p className="text-center text-hk-muted mb-16 max-w-xl mx-auto">
            Simple mechanics, addictive progression, and the dream of becoming the world's richest hamster.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-hk-card border border-hk-border hover:border-hk-accent/50 transition-colors"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-hk-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-20 px-6 bg-hk-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            Three steps to <span className="text-hk-accent">empire</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Tap the Hamster", d: "Every tap mines a coin. Hold the screen, build a rhythm, watch numbers go up." },
              { n: "02", t: "Buy Upgrades", d: "Spend coins on the wheel, the farm, the exchange. Each upgrade multiplies your power." },
              { n: "03", t: "Climb Leagues", d: "From Bronze to Master. The whole world is watching, hamster." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="text-7xl font-black text-hk-accent/20 mb-2">{s.n}</div>
                <h3 className="text-2xl font-bold mb-3">{s.t}</h3>
                <p className="text-hk-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="stats" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <img src={hcoin} alt="" className="w-24 h-24 mx-auto mb-6 animate-hk-float" />
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Your hamster <span className="text-hk-accent">is waiting.</span>
          </h2>
          <p className="text-hk-muted text-lg mb-10 max-w-xl mx-auto">
            Don't be the last one in. Every second you wait, someone else is mining your coins.
          </p>
          <Link
            to="/play"
            className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-hk-accent to-hk-accent2 text-black font-black text-lg hover:scale-105 transition-transform shadow-[0_20px_60px_-10px_hsl(var(--hk-accent))]"
          >
            🚀 Start Mining Now
          </Link>
        </div>
      </section>

      <footer className="border-t border-hk-border py-8 px-6 text-center text-sm text-hk-muted">
        © 2026 Hamster Kombat. Not affiliated. Built for fun. 🐹
      </footer>
    </div>
  );
};

export default HamsterLanding;
