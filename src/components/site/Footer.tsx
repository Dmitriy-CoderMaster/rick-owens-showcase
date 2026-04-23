const Footer = () => {
  const cols = [
    { title: "Shop", items: ["Women", "Men", "DRKSHDW", "Lilies", "Footwear", "Accessories"] },
    { title: "House", items: ["About", "Atelier", "Stockists", "Press", "Journal"] },
    { title: "Service", items: ["Contact", "Shipping", "Returns", "Care", "FAQ"] },
  ];

  return (
    <footer className="border-t border-border bg-void px-6 md:px-12 pt-20 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2">
          <h3 className="display text-3xl md:text-4xl mb-4">Subscribe</h3>
          <p className="text-sm text-foreground/60 mb-6 max-w-sm font-light">
            Letters from the atelier. New collections, runway notes, occasional silence.
          </p>
          <form className="flex border-b border-border pb-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your.email@void"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-foreground/40"
            />
            <button className="micro hover:text-bone transition-colors">Send →</button>
          </form>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="micro text-foreground/60 mb-6">{c.title}</p>
            <ul className="space-y-3">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-bone transition-colors">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 border-t border-border micro text-foreground/40">
        <span>© 2026 Owenscorp — All rights reserved</span>
        <span>Paris · Milan · Tokyo · Concept Site</span>
      </div>
    </footer>
  );
};

export default Footer;
