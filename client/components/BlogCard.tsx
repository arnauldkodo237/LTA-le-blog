import { Link } from "react-router-dom";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  date: string; // ISO
  author: string;
  tags: string[];
}

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-md">
      <Link to={`/article/${post.slug}`} className="block">
        <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
          <img
            src={post.cover}
            alt={`Image de couverture pour ${post.title}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
              {post.category}
            </span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <h3 className="text-lg font-semibold leading-snug group-hover:text-secondary">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
