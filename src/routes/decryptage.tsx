import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Eye, Zap, Lock, Megaphone, Clock, ShieldOff, Pyramid } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/decryptage")({
  head: () => ({ meta: [
    { title: "Décryptage — Comment reconnaître un système de Ponzi" },
    { name: "description", content: "Analyse pédagogique des mécanismes Ponzi à partir du site Fadoul Investment." },
  ] }),
  component: Decrypt,
});

const SIGNALS = [
  { i: TrendingDown, t: "Rendements irréalistes", d: "10 à 15% par JOUR. Soit ~3 650% par an. Aucun investissement légal n'atteint ces chiffres. Un livret bancaire offre 3-5% par AN." },
  { i: Users, t: "Système de parrainage à plusieurs niveaux", d: "10% / 5% / 2% sur 3 niveaux. C'est la pyramide : recruter de nouvelles victimes devient la principale source de revenus." },
  { i: Eye, t: "Faux témoignages et fausses photos", d: "Noms inventés, photos générées par IA, gains exagérés. Aucun moyen de vérifier que ces personnes existent vraiment." },
  { i: Megaphone, t: "Ticker d'activité fabriqué", d: "« Aminata vient de retirer 45 000 FCFA » défile en boucle. Ces transactions n'existent pas, elles sont générées aléatoirement par le code." },
  { i: ShieldOff, t: "Fausse régulation", d: "« Régulé par la BCEAO », faux numéro RCCM. La BCEAO n'agrée pas de plateformes promettant 10%/jour. Vérifiez toujours sur les registres officiels." },
  { i: Zap, t: "Promesse de retraits instantanés 24/7", d: "Au début, les retraits passent (avec l'argent des nouveaux entrants). Puis ils deviennent « en attente » jusqu'à l'effondrement." },
  { i: Lock, t: "Bonus d'inscription, urgence artificielle", d: "« 2 500 FCFA offerts », « Plus que X places ». Tactiques pour court-circuiter votre réflexion critique." },
  { i: Clock, t: "Modèle économique opaque", d: "« On vend de l'électricité à la Senelec ». Aucun contrat public, aucun audit, aucune transparence sur l'origine réelle des paiements." },
  { i: Pyramid, t: "Structure pyramidale", d: "L'argent des nouvelles victimes paie les anciennes. Quand le recrutement ralentit, le système s'effondre. C'est mathématique." },
  { i: AlertTriangle, t: "Absence de produit réel", d: "Aucun panneau n'est vraiment installé. La société n'a aucun actif productif. Tout l'« investissement » est une illusion comptable." },
];

function Decrypt() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-night text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-grid h-16 w-16 place-items-center rounded-full bg-destructive shadow-2xl">
            <AlertTriangle className="h-8 w-8" />
          </motion.div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">Décryptage : <span className="text-destructive">Fadoul Investment</span> est un Ponzi</h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
            Cette page existe à des fins <b>pédagogiques</b>. Le site que vous venez de visiter reproduit fidèlement les mécanismes des arnaques pyramidales qui font des milliers de victimes en Afrique de l'Ouest.
          </p>
          <div className="mt-6">
            <a href="#signaux" className="inline-flex rounded-full bg-gold text-night px-6 py-3 font-bold">Voir les 10 signaux d'alerte</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold">Qu'est-ce qu'un système de Ponzi ?</h2>
        <p className="mt-4 text-muted-foreground">
          Un schéma de Ponzi (du nom de Charles Ponzi, 1920) est une arnaque qui rémunère les anciens investisseurs avec l'argent des nouveaux, en faisant croire qu'il s'agit de rendements légitimes. Tant que de nouvelles personnes investissent, le système tient. Quand le recrutement ralentit, il s'effondre — et la grande majorité des participants perd tout.
        </p>
        <p className="mt-3 text-muted-foreground">
          Les cas célèbres incluent Bernard Madoff (50 milliards $), MMM en Russie, et plus récemment des plateformes ouest-africaines comme <b>Be Forward Lion</b>, <b>Liyeplimal</b> ou les multiples « plateformes solaires » qui ont laissé des milliers de familles ruinées.
        </p>
      </section>

      <section id="signaux" className="bg-sand py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center">Les 10 signaux d'alerte</h2>
          <p className="mt-3 text-center text-muted-foreground">Activez le bouton « Décryptage » en haut à droite pour les voir surlignés en rouge sur le site.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {SIGNALS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border-l-4 border-destructive bg-card p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-destructive/10 text-destructive shrink-0">
                    <s.i className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">{i + 1}. {s.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-display text-3xl font-bold">Pourquoi 10%/jour est mathématiquement impossible</h2>
        <div className="mt-6 rounded-2xl bg-card border border-border p-6">
          <p className="text-sm">
            Avec 10% de rendement quotidien composé, <b>1 FCFA devient 1,3 milliard de FCFA en un an</b>. Avec 15%/jour, c'est <b>2 200 milliards</b>. Aucune activité économique au monde ne génère ce type de rendement. Pour comparaison :
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Un livret d'épargne BCEAO : <b>3,5% par an</b></li>
            <li>• L'action moyenne du S&P 500 : <b>~10% par an</b></li>
            <li>• Le meilleur hedge fund du monde (Renaissance Medallion) : <b>~39% par an</b></li>
            <li>• Fadoul Investment promet : <b className="text-destructive">~3 650% par an</b></li>
          </ul>
        </div>
      </section>

      <section className="bg-night text-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-3xl font-bold">Comment se protéger</h2>
          <ul className="mt-6 space-y-3 text-white/80">
            <li>✅ Vérifiez l'agrément sur le site officiel de la <b>BCEAO</b> et de votre régulateur national.</li>
            <li>✅ Demandez les comptes audités, le siège physique, les noms des dirigeants.</li>
            <li>✅ Méfiez-vous de tout rendement supérieur à 15% PAR AN garanti.</li>
            <li>✅ Si on vous demande de recruter pour gagner plus : c'est une pyramide.</li>
            <li>✅ Signalez les arnaques à la <b>DIC</b> (Sénégal), <b>PLCC</b> (Côte d'Ivoire) ou à votre cybercriminalité nationale.</li>
          </ul>
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex rounded-full bg-white text-night px-6 py-3 font-bold hover:scale-105 transition">Revenir au site démo</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
