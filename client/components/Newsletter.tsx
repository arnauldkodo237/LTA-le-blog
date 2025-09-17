import { useEffect, useState } from "react";

export default function Newsletter({ variant = "banner" as "banner" | "popup" }) {
  const [email, setEmail] = useState("");
  const [closed, setClosed] = useState(false);
  const key = "lta_newsletter_optin";

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved === "1") setClosed(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Email invalide");
    localStorage.setItem(key, "1");
    setClosed(true);
    alert("Merci ! Vous êtes bien inscrit(e).");
  };

  if (closed) return null;

  if (variant === "popup") {
    return (
      <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[92%] max-w-2xl rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Rejoignez la newsletter</p>
            <p className="text-xs text-muted-foreground">
              Les meilleurs articles chaque semaine, sans spam.
            </p>
          </div>
          <form onSubmit={submit} className="flex min-w-0 flex-1 items-center">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="min-w-0 flex-1 rounded-l-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-secondary"
              aria-label="Email"
            />
            <button className="rounded-r-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
              S'inscrire
            </button>
          </form>
          <button className="ml-2 text-sm text-muted-foreground hover:text-foreground" onClick={() => setClosed(true)}>
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="newsletter" className="rounded-xl border border-border bg-accent/50 p-5">
      <div className="mb-2 text-sm font-semibold">Newsletter</div>
      <p className="text-sm text-muted-foreground">
        Recevez les nouveautés d'Anime, Manga et Pop culture.
      </p>
      <form onSubmit={submit} className="mt-3 flex">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="w-full rounded-l-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-secondary"
          aria-label="Email"
        />
        <button className="rounded-r-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
