import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

const products = [
  { id: 1, img: p1, name: "Asymmetric Biker", category: "Outerwear", price: "€ 3 240" },
  { id: 2, img: p2, name: "Bozo Tractor Boot", category: "Footwear", price: "€ 1 890" },
  { id: 3, img: p3, name: "Crater Tunic Knit", category: "Knitwear", price: "€ 1 460" },
  { id: 4, img: p4, name: "Dropped Cargo", category: "Trousers", price: "€ 1 120" },
];

const Collection = () => {
  return (
    <section id="collection" className="py-24 md:py-40 px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
        <div>
          <p className="micro text-foreground/60 mb-4">001 — Selected Pieces</p>
          <h2 className="display text-5xl md:text-7xl">
            New <span className="italic">arrivals</span>
          </h2>
        </div>
        <a href="#" className="micro hover:text-bone transition-colors self-start md:self-end">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {products.map((p) => (
          <article key={p.id} className="group cursor-pointer">
            <div className="relative overflow-hidden bg-secondary aspect-[4/5] mb-5">
              <img
                src={p.img}
                alt={p.name}
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-void to-transparent">
                <span className="micro text-bone">+ Add to bag</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="micro text-foreground/50 mb-2">{p.category}</p>
                <h3 className="font-light tracking-wide">{p.name}</h3>
              </div>
              <span className="text-sm text-foreground/80">{p.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Collection;
