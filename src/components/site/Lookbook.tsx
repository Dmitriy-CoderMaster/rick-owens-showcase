import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import hero from "@/assets/hero.jpg";

const Lookbook = () => {
  return (
    <section id="lookbook" className="py-24 md:py-40 px-6 md:px-12 bg-secondary">
      <div className="mb-16 md:mb-24">
        <p className="micro text-foreground/60 mb-4">002 — The Lookbook</p>
        <h2 className="display text-5xl md:text-7xl max-w-3xl">
          A meditation on <span className="italic">silhouette</span> and shadow.
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-8 aspect-[3/2] overflow-hidden">
          <img src={look1} alt="Lookbook editorial" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-6 md:col-span-4 aspect-[3/4] overflow-hidden">
          <img src={look2} alt="Hooded portrait" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-6 md:col-span-4 aspect-[3/4] overflow-hidden">
          <img src={hero} alt="Editorial figure" loading="lazy" className="w-full h-full object-cover object-top" />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col justify-end p-6 md:p-12 border border-border">
          <p className="display text-3xl md:text-5xl italic text-bone leading-tight mb-6">
            "I'm not a minimalist. I'm a maximalist of a single idea."
          </p>
          <p className="micro text-foreground/60">— RO, Atelier Notes</p>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
