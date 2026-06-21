import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/mentions")({
  head: () => ({ meta: [{ title: "Mentions légales — Fadoul Investment" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-4 py-16 prose">
        <h1 className="text-3xl font-bold">Mentions légales</h1>
        <div className="mt-6 rounded-2xl border-l-4 border-destructive bg-destructive/5 p-5 text-sm">
          <b>⚠ Avertissement important.</b> Ce site est une <b>démonstration pédagogique</b> créée dans le cadre d'une exposition sur les systèmes de Ponzi. Aucune transaction réelle n'est effectuée, aucun panneau solaire n'existe, aucune société « Fadoul Energy SARL » n'est enregistrée. Toutes les données, témoignages, statistiques, logos et coordonnées sont fictifs et destinés uniquement à illustrer les mécanismes d'une arnaque pyramidale.
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Aucune donnée personnelle n'est transmise à un serveur. Toutes les informations que vous saisissez restent dans le stockage local de votre navigateur et peuvent être effacées à tout moment en vidant le cache.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Pour comprendre les mécanismes mis en scène, consultez la page <a className="text-primary underline" href="/decryptage">Décryptage</a>.
        </p>
      </section>
      <SiteFooter />
    </div>
  ),
});
