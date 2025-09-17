import BlogCard from "@/components/BlogCard";
import { allPosts, searchPosts } from "@/lib/posts";
import { setSEO } from "@/lib/seo";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

function useQueryParam(name: string) {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(name) || "", [search, name]);
}

export default function SearchPage() {
  const q = useQueryParam("q");

  useEffect(() => {
    setSEO(
      `Recherche "${q}" — Let's Talk About`,
      `Résultats pour la recherche ${q} sur Let's Talk About.`
    );
  }, [q]);

  const results = useMemo(() => (q ? searchPosts(q) : allPosts), [q]);

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl py-8">
        <h1 className="text-2xl font-bold">Recherche</h1>
        {q && (
          <p className="mt-2 text-sm text-muted-foreground">
            {results.length} résultat(s) pour "{q}"
          </p>
        )}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
