import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import { allPosts, getPopular } from "@/lib/posts";
import { setSEO } from "@/lib/seo";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function Index() {
  useEffect(() => {
    setSEO(
      "Let's Talk About — Blog",
      "Un blog moderne autour de l'Anime, du Manga, de la Pop culture, du Design et des Tendances."
    );
  }, []);

  const popular = useMemo(() => getPopular(5), []);
  const tags = useMemo(
    () =>
      Array.from(
        new Set(allPosts.flatMap((p) => p.tags.map((t) => t.toLowerCase())))
      ).sort(),
    []
  );

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="container mx-auto px-4">
      <section className="mt-8 rounded-2xl bg-[hsl(var(--primary))] px-6 py-10 text-[hsl(var(--primary-foreground))] md:px-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold md:text-5xl">Let's Talk About</h1>
          <p className="mt-3 text-base/7 text-[hsl(var(--primary-foreground))]/85 md:text-lg/8">
            Analyses, décryptages et inspirations — un regard éditorial sur l'Anime, le Manga et la Pop culture.
          </p>
          <form onSubmit={submit} className="mt-6 flex max-w-lg overflow-hidden rounded-lg border border-border bg-background">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher des articles…"
              className="flex-1 px-4 py-3 text-sm text-foreground outline-none"
              aria-label="Recherche"
            />
            <button className="bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
              Rechercher
            </button>
          </form>
        </div>
      </section>

      <section className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Populaires
            </h3>
            <ul className="mt-3 space-y-3">
              {popular.map((p) => (
                <li key={p.slug} className="text-sm leading-6">
                  <Link to={`/article/${p.slug}`} className="hover:text-secondary">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Link
                  key={t}
                  to={`/search?q=${encodeURIComponent(t)}`}
                  className="rounded-md border border-border px-2 py-1 text-xs hover:bg-accent"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
          <Newsletter />
        </aside>
      </section>

      <Newsletter variant="popup" />
    </main>
  );
}
