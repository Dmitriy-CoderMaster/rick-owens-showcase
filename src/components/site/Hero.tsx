import hero from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src={hero}
        alt="Rick Owens FW collection editorial"
        width={1080}
        height={1920}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/30" />

      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-12 pt-32 pb-12">
        <div className="flex justify-between micro text-foreground/70">
          <span>FW 26 / Trinity</span>
          <span className="hidden md:inline">Paris — 2026</span>
        </div>

        <div className="max-w-4xl">
          <p className="micro text-foreground/60 mb-6">New Collection — Chapter VII</p>
          <h1 className="display text-[clamp(3.5rem,12vw,11rem)] text-bone">
            Trinity
            <br />
            <span className="italic text-foreground/80">of dust</span>
          </h1>
          <p className="mt-8 max-w-md text-sm md:text-base text-foreground/70 leading-relaxed font-light">
            Garments shaped by silence and weight. A meditation on architecture, the body and the void it inhabits.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#collection"
              className="micro px-8 py-4 bg-bone text-void hover:bg-foreground transition-colors duration-500"
            >
              Enter Collection
            </a>
            <a
              href="#lookbook"
              className="micro px-8 py-4 border border-foreground/40 hover:border-bone hover:text-bone transition-colors duration-500"
            >
              View Lookbook
            </a>
          </div>
        </div>

        <div className="flex justify-between items-end micro text-foreground/50">
          <span>Scroll —</span>
          <span className="hidden md:inline">Drape · Leather · Bone</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
