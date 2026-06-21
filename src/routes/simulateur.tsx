import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PANELS, fmt } from "@/lib/demo-store";

export const Route = createFileRoute("/simulateur")({
  head: () => ({ meta: [{ title: "Simulateur de gains — Fadoul Investment" }] }),
  component: Sim,
});

function Sim() {
  const [amount, setAmount] = useState(50_000);
  const [pct, setPct] = useState(12);
  const [days, setDays] = useState(60);

  const perDay = amount * pct / 100;
  const total = perDay * days;
  const yearly = (Math.pow(1 + pct / 100, 365) - 1) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center">Simulateur de gains</h1>
        <p className="text-center text-muted-foreground mt-3">Découvrez combien vous pouvez gagner</p>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
            <div>
              <label className="text-sm font-semibold">Montant investi</label>
              <div className="mt-2 font-display text-3xl font-bold gold-text">{fmt(amount)}</div>
              <input type="range" min={10000} max={500000} step={10000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-3 w-full accent-primary" />
              <div className="mt-3 flex flex-wrap gap-2">
                {PANELS.map(p => (
                  <button key={p.id} onClick={() => { setAmount(p.price); setPct(p.dailyPct); }} className="rounded-full border border-border px-3 py-1 text-xs hover:bg-muted">{p.name}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold">Rendement quotidien : <b className="text-primary">{pct}%</b></label>
              <input type="range" min={10} max={15} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="mt-2 w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm font-semibold">Durée : <b>{days} jours</b></label>
              <input type="range" min={30} max={60} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-2 w-full accent-primary" />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary to-emerald-800 text-white p-6 space-y-4">
            <Row label="Gain par jour" v={fmt(perDay)} />
            <Row label="Gain par semaine" v={fmt(perDay * 7)} />
            <Row label="Gain total après " v={fmt(total)} sub={`${days} jours`} big />
            <div className="ponzi-flag rounded-xl bg-destructive/20 border border-destructive p-4" data-flag="Rendement annualisé impossible : un Ponzi peut le promettre mais pas le tenir">
              <div className="text-xs uppercase text-gold">Équivalent annualisé</div>
              <motion.div key={yearly} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-display text-3xl font-bold mt-1">
                {yearly > 1e6 ? (yearly / 1e6).toFixed(1) + " millions" : yearly.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}%
              </motion.div>
              <div className="text-xs opacity-80 mt-1">À titre de comparaison : un livret bancaire offre 3-5% PAR AN.</div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Row({ label, v, sub, big }: { label: string; v: string; sub?: string; big?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
      <div className="text-sm opacity-80">{label}{sub && <span className="text-xs opacity-60"> ({sub})</span>}</div>
      <motion.div key={v} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className={`font-display font-bold ${big ? "text-3xl gold-text" : "text-xl"}`}>{v}</motion.div>
    </div>
  );
}
