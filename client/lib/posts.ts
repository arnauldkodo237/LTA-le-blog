import { BlogPostMeta } from "@/components/BlogCard";

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export const allPosts: BlogPost[] = [
  {
    slug: "design-affiches-anime-2025",
    title: "Design d'affiches d'anime: tendances 2025",
    excerpt:
      "De la typographie audacieuse aux palettes rétro, tour d'horizon des tendances visuelles qui marquent l'animation.",
    cover:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
    category: "Design",
    date: "2025-01-15",
    author: "Rina S.",
    tags: ["design", "anime", "typographie"],
    contentHtml:
      `<p>Le design graphique dans l'animation connaît une maturité remarquable. Les studios misent sur des <strong>compositions typographiques</strong> très lisibles et des palettes limitées.</p>
      <h2>Titres impactants</h2>
      <p>Les familles serif comme <em>Playfair</em> apportent une touche éditoriale. Couplées à des sans-serif fonctionnelles, elles structurent l'information.</p>
      <blockquote>« Less is more » reste une ligne directrice — lisibilité et hiérarchie priment.</blockquote>
      <p>Les textures grainées et les motifs organiques reviennent également, rappelant l'esthétique imprimée.</p>
      <img src="https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1400&auto=format&fit=crop" alt="Exemple d'affiche stylisée" />`,
  },
  {
    slug: "guide-manga-debutants",
    title: "Guide des mangas pour débutants",
    excerpt:
      "Comprendre les genres, les formats et par où commencer sans se perdre dans l'immense univers du manga.",
    cover:
      "https://images.unsplash.com/photo-1581065178040-3b6e7f2ea8d6?q=80&w=1600&auto=format&fit=crop",
    category: "Manga",
    date: "2025-01-10",
    author: "Kenji T.",
    tags: ["manga", "guide"],
    contentHtml:
      `<p>Shōnen, Seinen, Josei… ces catégories servent de <strong>repères</strong> sans enfermer les œuvres. Le mieux est d'explorer en suivant vos centres d'intérêt.</p>
      <h2>Les formats</h2>
      <p>One-shot, série courte, magazine prépublié : chaque format a ses forces. <strong>Les séries courtes</strong> sont idéales pour débuter.</p>
      <ul><li>Découvrir par thématique</li><li>Lire des extraits en ligne légalement</li><li>Suivre des recommandations de curateurs</li></ul>`,
  },
  {
    slug: "pop-culture-et-marques",
    title: "Quand la pop culture rencontre les marques",
    excerpt:
      "Collaborations, capsules et co-branding : pourquoi l'imaginaire geek façonne la communication des marques.",
    cover:
      "https://images.unsplash.com/photo-1548181779-1f08ec0bb41e?q=80&w=1600&auto=format&fit=crop",
    category: "Pop culture",
    date: "2025-01-05",
    author: "Maya L.",
    tags: ["branding", "culture"],
    contentHtml:
      `<p>Les marques adoptent les codes de la pop culture afin de toucher des communautés engagées. <strong>Transparence</strong> et <strong>respect</strong> sont essentiels pour éviter le "washing".</p>
      <h2>Co-création</h2>
      <p>La réussite tient souvent à la co-création avec des artistes et studios indépendants.</p>`,
  },
  {
    slug: "anime-incontournables-hiver",
    title: "5 animes incontournables cet hiver",
    excerpt:
      "Sélection de séries à ne pas manquer pour bien commencer la saison, entre nouveautés et suites attendues.",
    cover:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
    category: "Anime",
    date: "2024-12-28",
    author: "Léo P.",
    tags: ["anime", "tendances"],
    contentHtml:
      `<p>Un hiver riche en productions avec des univers variés : science-fiction, tranche de vie et dark fantasy.</p>`,
  },
  {
    slug: "tendances-ui-2025",
    title: "Tendances UI 2025 inspirées par l'édition",
    excerpt:
      "Mise en page modulaire, interlignage généreux et contraste de corps : quand l'éditorial façonne l'interface.",
    cover:
      "https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?q=80&w=1600&auto=format&fit=crop",
    category: "Tendances",
    date: "2024-12-20",
    author: "Aline R.",
    tags: ["design", "ui"],
    contentHtml:
      `<p>L'interface s'inspire des règles de la presse : <strong>grilles</strong>, <strong>rythme vertical</strong> et sobriété des éléments décoratifs.</p>`,
  },
];

export const categories = Array.from(new Set(allPosts.map((p) => p.category))).sort();

export function getPostBySlug(slug: string) {
  return allPosts.find((p) => p.slug === slug);
}

export function searchPosts(q: string) {
  const query = q.toLowerCase();
  return allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.tags.join(" ").toLowerCase().includes(query),
  );
}

export function getPopular(limit = 5) {
  return allPosts.slice(0, limit);
}
