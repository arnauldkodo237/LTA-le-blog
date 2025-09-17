import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "@/components/Comments";
import { getPostBySlug } from "@/lib/posts";
import { setSEO } from "@/lib/seo";

function shareUrl(url: string, text: string) {
  return {
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    wa: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
  };
}

export default function ArticlePage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || "");

  useEffect(() => {
    if (post) setSEO(`${post.title} — Let's Talk About`, post.excerpt);
  }, [post]);

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-16">
        <p>Article introuvable.</p>
        <Link to="/" className="mt-4 inline-block text-secondary underline">
          Retour à l'accueil
        </Link>
      </main>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}/article/${post.slug}`;
  const share = shareUrl(url, post.title);

  return (
    <main className="container mx-auto px-4">
      <article className="mx-auto max-w-3xl py-8">
        <header className="space-y-3">
          <div className="text-xs text-muted-foreground">
            <Link to={`/category/${encodeURIComponent(post.category)}`} className="rounded bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
              {post.category}
            </Link>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div className="mt-3 flex gap-2">
            <a className="rounded-md border border-border px-3 py-1 text-xs hover:bg-accent" href={share.x} target="_blank" rel="noopener noreferrer">Partager sur X</a>
            <a className="rounded-md border border-border px-3 py-1 text-xs hover:bg-accent" href={share.fb} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="rounded-md border border-border px-3 py-1 text-xs hover:bg-accent" href={share.li} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="rounded-md border border-border px-3 py-1 text-xs hover:bg-accent" href={share.wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </header>

        <figure className="mt-6 overflow-hidden rounded-xl">
          <img src={post.cover} alt={`Image de couverture pour ${post.title}`} className="w-full object-cover" />
        </figure>

        <section className="prose prose-neutral mt-6 max-w-none dark:prose-invert prose-img:rounded-lg prose-a:text-secondary">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t} to={`/search?q=${encodeURIComponent(t)}`} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-accent">
              #{t}
            </Link>
          ))}
        </div>

        <Comments slug={post.slug} />
      </article>
    </main>
  );
}
