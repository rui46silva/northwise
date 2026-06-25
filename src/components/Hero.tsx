export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-28 pt-40 md:pb-40 md:pt-48">
      {/* Glowing planet horizon */}
      <div className="horizon animate-glow-pulse" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow animate-fade-up">
            Web Development Studio / Northern Portugal
          </p>

          <h1 className="mt-6 animate-fade-up text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
            Direction over noise.
          </h1>

          <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-300">
            Northwise builds strategic websites, landing pages and custom web
            platforms for businesses that need clarity, performance and growth.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#start" className="btn-primary w-full sm:w-auto">
              <span className="bracket">Start a project.</span>
            </a>
            <a href="#solutions" className="btn-ghost w-full sm:w-auto">
              Explore solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
