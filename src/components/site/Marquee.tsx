const Marquee = () => {
  const items = ["Trinity FW26", "—", "Now in Atelier", "—", "Free Shipping Worldwide", "—", "Made in Italy", "—"];
  return (
    <div className="border-y border-border py-4 overflow-hidden bg-background">
      <div className="flex gap-12 animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="micro text-foreground/60">
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
