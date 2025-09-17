import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F221bd8804c9a48f6a0a3a294d111f809%2Fb95cd763bb3241f8bcbcfd42520d347f?format=webp&width=200";

export const categories = [
  "Anime",
  "Manga",
  "Pop culture",
  "Design",
  "Tendances",
] as const;

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const el = document.getElementById("global-search");
        el?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Let's Talk About - logo"
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
            <span className="sr-only">Accueil</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-secondary">
              Accueil
            </Link>
            {categories.map((c) => (
              <Link key={c} to={`/category/${encodeURIComponent(c)}`} className="hover:text-secondary">
                {c}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <form onSubmit={submit} className="hidden sm:flex items-center">
            <input
              id="global-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher des articles… (⌘K)"
              className="w-64 rounded-l-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-secondary"
              aria-label="Recherche"
            />
            <button
              type="submit"
              className="rounded-r-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90"
              aria-label="Chercher"
            >
              Rechercher
            </button>
          </form>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            <Link to="/" className="py-2" onClick={() => setOpen(false)}>
              Accueil
            </Link>
            {categories.map((c) => (
              <Link key={c} to={`/category/${encodeURIComponent(c)}`} className="py-2" onClick={() => setOpen(false)}>
                {c}
              </Link>
            ))}
            <form onSubmit={submit} className="mt-2 flex items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher des articles…"
                className="flex-1 rounded-l-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-secondary"
                aria-label="Recherche"
              />
              <button type="submit" className="rounded-r-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
                OK
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
