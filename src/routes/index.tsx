import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sun, Zap, ShieldCheck, TrendingUp, Users, Sparkles, Check, ChevronRight, Wallet, Smartphone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LiveTicker } from "@/components/ticker";
import { PANELS, fmt } from "@/lib/demo-store";
import waveLogo from "@/assets/wave.jpg.asset.json";
import orangeLogo from "@/assets/orange-money.jpg.asset.json";
import moovLogo from "@/assets/moov-africa.jpg.asset.json";
import personAminata from "@/assets/person-aminata.jpg.asset.json";
import personMariama from "@/assets/person-mariama.jpg.asset.json";
import personIbrahim from "@/assets/person-ibrahim.jpg.asset.json";
import personFatou from "@/assets/person-fatou.jpg.asset.json";
import communityImg from "@/assets/community-celebration.jpg.asset.json";

// Positions figées des particules pour éviter les erreurs d'hydratation SSR
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  const s2 = Math.sin(i * 78.233) * 43758.5453;
  const s3 = Math.sin(i * 39.346) * 43758.5453;
  const s4 = Math.sin(i * 94.673) * 43758.5453;
  return {
    left: ((s - Math.floor(s)) * 100).toFixed(2),
    top: ((s2 - Math.floor(s2)) * 100).toFixed(2),
    dur: 2 + (s3 - Math.floor(s3)) * 3,
    delay: (s4 - Math.floor(s4)) * 2,
  };
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fadoul Investment — Investissez dans le soleil de l'Afrique" },
      { name: "description", content: "Plateforme leader d'investissement solaire. Jusqu'à 15% par jour pendant 60 jours. Dépôts Wave, Orange Money, Moov." },
    ],
  }),
  component: Index,
});

function useCounter(target: number, duration = 2000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function Index() {
  const distributed = useCounter(2_847_000_000);
  const investors = useCounter(48_392);
  const panels = useCounter(127_504);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden sun-gradient text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur ponzi-flag"
              data-flag="Faux gage de confiance"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              Régulé BCEAO · Plateforme #1 en Afrique de l'Ouest
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-5 text-4xl md:text-6xl font-bold leading-tight"
            >
              Investissez dans le <span className="gold-text">soleil</span><br />
              de l'Afrique.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-white/80 max-w-lg"
            >
              Achetez votre panneau solaire dès <b className="text-gold">10 000 FCFA</b> et touchez{" "}
              <span className="ponzi-flag inline" data-flag="Rendement mathématiquement impossible : 10%/jour = 3650%/an">
                <b className="text-gold">10 à 15% par jour</b>
              </span>{" "}
              pendant 60 jours. Retraits instantanés via Wave, Orange Money et Moov.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/auth" className="shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-amber-500 px-6 py-3 font-bold text-night shadow-xl hover:scale-105 transition">
                <Sparkles className="h-4 w-4" /> Commencer maintenant
              </Link>
              <Link to="/simulateur" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-medium hover:bg-white/10 transition">
                Simuler mes gains <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <div className="mt-8 flex items-center gap-6 text-xs text-white/60">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Sans frais cachés</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Retrait 24/7</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Garantie 100%</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="relative"
          >
            <LiveTicker />
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="ponzi-flag absolute -bottom-6 -left-6 rounded-xl bg-white text-foreground p-4 shadow-2xl"
              data-flag="Faux témoignage"
            >
              <div className="flex items-center gap-3">
                <img src={personAminata.url} alt="Aminata Diop" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold" />
                <div>
                  <div className="text-sm font-bold">Aminata Diop</div>
                  <div className="text-xs text-muted-foreground">+1 250 000 FCFA en 60 jours</div>
                </div>
              </div>
              <div className="mt-2 flex text-gold text-sm">★★★★★</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-10">
        <div className="ponzi-flag grid md:grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-6 shadow-xl" data-flag="Chiffres inventés, invérifiables">
          <Stat label="FCFA distribués aux investisseurs" value={fmt(distributed)} icon={<Wallet className="h-5 w-5" />} />
          <Stat label="Investisseurs actifs" value={investors.toLocaleString("fr-FR")} icon={<Users className="h-5 w-5" />} />
          <Stat label="Panneaux installés" value={panels.toLocaleString("fr-FR")} icon={<Zap className="h-5 w-5" />} />
        </div>
      </section>

      {/* PANELS */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">Nos panneaux</div>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold">Choisissez votre puissance solaire</h2>
          <p className="mt-3 text-muted-foreground">Six packs adaptés à tous les budgets. Plus vous investissez, plus votre rendement quotidien est élevé.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PANELS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="relative ponzi-flag"
              data-flag={`${p.dailyPct}%/jour = ${(p.dailyPct * 365).toLocaleString()}%/an — impossible`}
            >
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-2xl transition">
                <div className={`h-32 bg-gradient-to-br ${p.color} relative flex items-center justify-center`}>
                  <Sun className="h-16 w-16 text-white/90 drop-shadow-lg" />
                  {p.badge && (
                    <div className="absolute top-3 right-3 rounded-full bg-night text-gold px-3 py-1 text-[10px] font-bold uppercase">{p.badge}</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-xl font-bold">Panneau {p.name}</div>
                    <div className="text-xs text-muted-foreground">{Math.floor(50 + Math.random() * 300)} ce mois</div>
                  </div>
                  <div className="mt-2 text-3xl font-bold gold-text">{fmt(p.price)}</div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Rendement quotidien</span><b className="text-primary">{p.dailyPct}%</b></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Gain par jour</span><b>{fmt(p.price * p.dailyPct / 100)}</b></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Durée</span><b>{p.durationDays} jours</b></div>
                    <div className="flex justify-between border-t border-border pt-2"><span className="text-muted-foreground">Gain total</span><b className="text-primary">{fmt(p.price * p.dailyPct / 100 * p.durationDays)}</b></div>
                  </div>
                  <Link to="/auth" className="mt-5 block text-center w-full rounded-xl bg-gradient-to-r from-primary to-emerald-700 py-2.5 font-semibold text-white shadow hover:shadow-lg transition">
                    Investir maintenant
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Comment ça marche</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold">4 étapes vers la liberté financière</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { i: "01", t: "Inscrivez-vous", d: "Créez votre compte en 30 secondes avec votre email et votre numéro." },
              { i: "02", t: "Déposez", d: "Rechargez via Wave, Orange Money ou Moov à partir de 10 000 FCFA." },
              { i: "03", t: "Choisissez votre panneau", d: "6 packs disponibles. Plus le panneau est grand, plus le rendement est élevé." },
              { i: "04", t: "Retirez chaque jour", d: "Vos gains sont crédités quotidiennement. Retrait instantané 24/7." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border">
                <div className="font-display text-4xl font-bold gold-text">{s.i}</div>
                <div className="mt-3 font-bold text-lg">{s.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="mx-auto max-w-7xl px-4 py-24 ponzi-flag" data-flag="Imagerie émotionnelle = levier classique d'arnaque pour créer un sentiment d'appartenance">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-primary/30 blur-2xl rounded-3xl" />
            <img
              src={communityImg.url}
              alt="Communauté Fadoul Investment célébrant ensemble"
              loading="lazy"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[420px]"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-5 -right-5 rounded-2xl bg-card border border-border p-4 shadow-xl flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                <img src={personAminata.url} alt="" className="h-9 w-9 rounded-full ring-2 ring-card object-cover" />
                <img src={personIbrahim.url} alt="" className="h-9 w-9 rounded-full ring-2 ring-card object-cover" />
                <img src={personFatou.url} alt="" className="h-9 w-9 rounded-full ring-2 ring-card object-cover" />
              </div>
              <div className="text-xs">
                <div className="font-bold">+48 392 investisseurs</div>
                <div className="text-muted-foreground">rejoignent chaque mois</div>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">Notre communauté</div>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
              Une famille qui <span className="gold-text">prospère ensemble</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              De Dakar à Cotonou, des milliers d'investisseurs ont changé leur quotidien grâce au soleil africain. Rejoignez une communauté soudée, joyeuse et engagée.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[personAminata, personMariama, personFatou].map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 ? 2 : -2 }}
                  className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-border shadow-md"
                >
                  <img src={p.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </div>
            <Link to="/auth" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-700 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition">
              <Users className="h-4 w-4" /> Rejoindre la communauté
            </Link>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Dépôts & retraits instantanés</h2>
          <p className="mt-3 text-muted-foreground">Tous les opérateurs mobile money d'Afrique de l'Ouest</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Wave", color: "from-sky-400 to-sky-600", logo: waveLogo.url },
            { name: "Orange Money", color: "from-neutral-800 to-black", logo: orangeLogo.url },
            { name: "Moov Africa", color: "from-blue-600 to-blue-800", logo: moovLogo.url },
          ].map((m) => (
            <div key={m.name} className={`rounded-2xl bg-gradient-to-br ${m.color} p-8 text-white text-center shadow-lg`}>
              <div className="h-16 w-16 mx-auto mb-3 rounded-xl overflow-hidden bg-white/10 ring-1 ring-white/20"><img src={m.logo} alt={m.name} className="h-full w-full object-cover" /></div>
              <div className="font-bold text-lg">{m.name}</div>
              <div className="text-xs opacity-80 mt-1">Instantané · 24/7</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-night text-white py-24 ponzi-flag" data-flag="Témoignages fabriqués : photos générées, identités inventées">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">Ils nous font confiance</h2>
            <p className="mt-3 text-white/70">Plus de 48 000 investisseurs en Afrique de l'Ouest</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Mariama Sow", c: "Dakar", q: "J'ai démarré avec 30 000 FCFA. En 2 mois j'ai pu rembourser ma machine à coudre et lancer mon atelier.", g: 198_000, img: personMariama.url },
              { n: "Ibrahim Konaté", c: "Abidjan", q: "Le retrait via Wave est instantané. Je suis passé du pack Or au Diamant après 1 mois.", g: 4_500_000, img: personIbrahim.url },
              { n: "Fatou N'diaye", c: "Bamako", q: "Une équipe pro, des gains réguliers. Je recommande à tous mes proches grâce au parrainage.", g: 780_000, img: personFatou.url },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
                <div className="text-gold mb-3">★★★★★</div>
                <p className="text-sm text-white/80">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.img} alt={t.n} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/60" />
                  <div>
                    <div className="font-bold">{t.n}</div>
                    <div className="text-xs text-white/60">{t.c} · A gagné {fmt(t.g)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERRAL CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="ponzi-flag rounded-3xl bg-gradient-to-br from-primary via-emerald-600 to-emerald-800 text-white p-10 md:p-16 relative overflow-hidden" data-flag="Système de parrainage = colonne vertébrale d'un Ponzi (recruter des nouvelles victimes)">
          <Sun className="absolute -right-20 -top-20 h-80 w-80 text-white/10" />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Users className="h-3.5 w-3.5" /> Programme parrainage
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">Parrainez et gagnez 10% à vie</h2>
            <p className="mt-4 text-white/90">
              Invitez vos amis et touchez <b>10%</b> sur leurs dépôts, <b>5%</b> sur les filleuls de niveau 2, <b>2%</b> sur le niveau 3. Sans plafond.
            </p>
            <Link to="/auth" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold text-night px-6 py-3 font-bold shadow-lg hover:scale-105 transition">
              <TrendingUp className="h-4 w-4" /> Activer mon lien de parrainage
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Questions fréquentes</h2>
        <div className="space-y-3">
          {[
            { q: "Comment Fadoul peut-il garantir 10 à 15% par jour ?", a: "Grâce à la vente d'électricité solaire à des opérateurs nationaux et aux contrats long terme signés avec la Senelec, CIE et EDM. (Note décryptage : aucun investissement réel ne peut soutenir 10%/jour. C'est mathématiquement impossible.)" },
            { q: "Mes fonds sont-ils sécurisés ?", a: "Notre plateforme est régulée par la BCEAO et nos panneaux sont assurés. Vous pouvez retirer à tout moment." },
            { q: "Combien de temps pour un retrait ?", a: "Instantané via Wave, Orange Money et Moov. Plafond illimité." },
            { q: "Y a-t-il des frais ?", a: "Aucun frais d'inscription, de dépôt ou de retrait." },
          ].map((f, i) => (
            <details key={i} className="group rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer font-semibold flex justify-between items-center">
                {f.q}
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-gold/20 text-primary">{icon}</div>
      <div>
        <div className="font-display text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
