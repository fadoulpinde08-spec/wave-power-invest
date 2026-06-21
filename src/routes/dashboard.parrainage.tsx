import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Users, TrendingUp } from "lucide-react";
import { loadState, fmt, type State } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/parrainage")({
  component: ParrainagePage,
});

function ParrainagePage() {
  const [s, setS] = useState<State | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const r = () => setS(loadState());
    r();
    window.addEventListener("fadoul-state", r);
    return () => window.removeEventListener("fadoul-state", r);
  }, []);

  if (!s?.user) return null;

  const link = `https://fadoul-investment.app/?ref=${s.user.referralCode}`;
  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const total = s.referrals.reduce((a, r) => a + r.earned, 0);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="ponzi-flag rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-800 text-white p-8" data-flag="Le parrainage à 3 niveaux est la SIGNATURE des Ponzi/MLM. Il garantit que les nouveaux arrivants paient les anciens.">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80"><Users className="h-4 w-4" /> Programme de parrainage</div>
        <h1 className="mt-2 font-display text-3xl font-bold">Gagnez à vie sur 3 niveaux</h1>
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-white/10 p-4"><b>Niveau 1</b> · <span className="text-gold text-lg font-bold">10%</span> sur vos filleuls directs</div>
          <div className="rounded-xl bg-white/10 p-4"><b>Niveau 2</b> · <span className="text-gold text-lg font-bold">5%</span> sur les filleuls de vos filleuls</div>
          <div className="rounded-xl bg-white/10 p-4"><b>Niveau 3</b> · <span className="text-gold text-lg font-bold">2%</span> sur le niveau suivant</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="text-xs uppercase font-semibold text-muted-foreground">Votre lien de parrainage</div>
        <div className="mt-2 flex gap-2">
          <input readOnly value={link} className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          <button onClick={copy} className="rounded-xl bg-primary text-white px-4 hover:bg-primary/90 flex items-center gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copié !" : "Copier"}
          </button>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">Code : <b className="font-mono">{s.user.referralCode}</b></div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-xs uppercase font-semibold text-muted-foreground">Commissions totales</div>
          <div className="mt-2 font-display text-3xl font-bold gold-text">{fmt(total)}</div>
          <div className="text-xs text-muted-foreground mt-1">{s.referrals.length} filleul(s) actifs</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-xs uppercase font-semibold text-muted-foreground">Ce mois</div>
          <div className="mt-2 font-display text-3xl font-bold text-primary flex items-center gap-2"><TrendingUp className="h-6 w-6" /> +{fmt(total * 0.4)}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-bold mb-4">Mes filleuls</h2>
        <div className="space-y-2">
          {s.referrals.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${r.level === 1 ? "from-primary to-emerald-700" : r.level === 2 ? "from-amber-400 to-orange-600" : "from-fuchsia-400 to-purple-600"}`} />
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Niveau {r.level}</div>
                </div>
              </div>
              <div className="text-sm font-bold text-primary">+{fmt(r.earned)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
