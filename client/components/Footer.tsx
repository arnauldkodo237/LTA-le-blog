import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-card">
      <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            À propos
          </h4>
          <p className="mt-3 text-sm text-muted-foreground/90">
            "Let's Talk About" — explorations d'Anime, Manga, Pop culture, Design
            et Tendances avec un regard éditorial moderne.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Catégories
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Anime",
              "Manga",
              "Pop culture",
              "Design",
              "Tendances",
            ].map((c) => (
              <li key={c}>
                <Link to={`/category/${encodeURIComponent(c)}`} className="hover:text-secondary">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Suivez-nous
          </h4>
          <div className="mt-3 flex gap-3">
            {[
              { href: "https://twitter.com/intent/tweet?text=Let%27s%20Talk%20About", label: "X" },
              { href: "https://www.facebook.com/sharer/sharer.php?u=https://example.com", label: "Facebook" },
              { href: "https://www.linkedin.com/sharing/share-offsite/?url=https://example.com", label: "LinkedIn" },
              { href: "https://wa.me/?text=Let%27s%20Talk%20About", label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-3 py-1 text-sm hover:bg-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Newsletter
          </h4>
          <p className="mt-3 text-sm text-muted-foreground/90">
            Recevez chaque semaine une sélection d'articles et tendances.
          </p>
          <Link
            to="#newsletter"
            className="mt-3 inline-block rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90"
          >
            S'inscrire
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Let's Talk About. Tous droits réservés.
      </div>
    </footer>
  );
}
