import BlogCard from "@/components/BlogCard";
import { allPosts } from "@/lib/posts";
import { setSEO } from "@/lib/seo";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { name } = useParams();
  const decoded = decodeURIComponent(name || "");

  useEffect(() => {
    setSEO(`${decoded} — Let's Talk About`, `Articles de la catégorie ${decoded}.`);
  }, [decoded]);

  const items = useMemo(() => allPosts.filter((p) => p.category.toLowerCase() === decoded.toLowerCase()), [decoded]);

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl py-8">
        <h1 className="text-2xl font-bold">{decoded}</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
