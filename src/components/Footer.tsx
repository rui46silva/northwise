import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-14">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo className="h-9" withWordmark />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {siteConfig.tagline} A web development studio in {siteConfig.location},
              building strategic websites and custom web platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <p className="eyebrow">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-slate-400 transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 transition hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 transition hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Get started</p>
              <a href="#start" className="btn-primary mt-4">
                <span className="bracket">Start a project.</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
