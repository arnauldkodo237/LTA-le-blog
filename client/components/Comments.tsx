import { useEffect, useState } from "react";

interface CommentItem {
  id: string;
  name: string;
  message: string;
  date: string; // ISO
}

export default function Comments({ slug }: { slug: string }) {
  const storageKey = `lta_comments_${slug}`;
  const [items, setItems] = useState<CommentItem[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next: CommentItem[] = [
      { id: crypto.randomUUID(), name: name.trim(), message: message.trim(), date: new Date().toISOString() },
      ...items,
    ];
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setMessage("");
  };

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold">Commentaires</h3>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div className="flex gap-3 max-sm:flex-col">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-56 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-secondary"
            aria-label="Nom"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrire un commentaire…"
            className="min-h-[90px] flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-secondary"
            aria-label="Commentaire"
            required
          />
        </div>
        <button className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">Publier</button>
      </form>

      <ul className="mt-6 space-y-4">
        {items.length === 0 && (
          <li className="text-sm text-muted-foreground">Aucun commentaire pour le moment.</li>
        )}
        {items.map((c) => (
          <li key={c.id} className="rounded-lg border border-border p-3">
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{c.name}</span>
              <span>•</span>
              <time dateTime={c.date}>{new Date(c.date).toLocaleString()}</time>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
