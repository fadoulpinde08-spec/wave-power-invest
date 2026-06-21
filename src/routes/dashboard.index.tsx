import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Wallet, Gift, Plus } from "lucide-react";
import { loadState, fmt, PANELS, accrued, buyPanel, type State } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard/")({
  component: DashHome,
});

function DashHome() {
  const [s, setS] = useState<State | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    const refresh = () => setS(loadState());
    refresh();
    window.addEventListener("fadoul-state", refresh);
    const tick = setInterval(() => force(n => n + 1), 1000);
    return () => { window.removeEventListener("fadoul-state", refresh); clearInterval(tick); };
  }, []);

  if (!s) return null;

  const totalAccrued = s.investments.reduce((acc, inv) => acc + accrued(inv).total, 0);
  const buy = (id: string) => {
    const r = buyPanel(id);
    if (!r.ok) alert(r.msg);
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <BalanceCard label="Solde principal" value={s.balance + totalAccrued} icon={<Wallet />} accent="from-primary to-emerald-700" />
        <BalanceCard label="Gains accumulés" value={totalAccrued} icon={<TrendingUp />} accent="from-amber-500 to-orange-600" pulse />
        <BalanceCard label="Solde parrainage" value={s.refBalance + s.referrals.reduce((a, r) => a + r.earned, 0)} icon={<Gift />} accent="from-fuchsia-500 to-purple-700" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/dashboard/depot" className="rounded-xl bg-gradient-to-r from-primary to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow">+ Effectuer un dépôt</Link>
        <Link to="/dashboard/retrait" className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold">Retirer</Link>
      </div>

      <div className="ponzi-flag" data-flag="Les gains affichés ne viennent pas du solaire — ils viennent des dépôts d'autres victimes">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Mes panneaux actifs</h2>
            <span className="text-xs text-muted-foreground">{s.investments.length} panneau(x)</span>
          </div>
          {s.investments.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Vous n'avez pas encore de panneau. Choisissez-en un ci-dessous pour commencer à gagner.
            </div>
          ) : (
            <div className="space-y-3">
              {s.investments.map((inv) => {
                const panel = PANELS.find(p => p.id === inv.panelId)!;
                const a = accrued(inv);
                const pct = (a.days / panel.durationDays) * 100;
                return (
                  <motion.div key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div>
                        <div className="font-bold">Panneau {panel.name}</div>
                        <div className="text-xs text-muted-foreground">{fmt(panel.price)} · {panel.dailyPct}%/jour</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">+{fmt(a.total)}</div>
                        <div className="text-xs text-muted-foreground">Jour {a.days} / {panel.durationDays}</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-primary to-gold" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold mb-3">Acheter un panneau</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PANELS.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{fmt(p.price)} · {p.dailyPct}%/j</div>
              </div>
              <button onClick={() => buy(p.id)} className="rounded-lg bg-primary text-white p-2 hover:bg-primary/90"><Plus className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-bold mb-3">Historique récent</h2>
        {s.transactions.length === 0 ? (
          <div className="text-sm text-muted-foreground">Aucune transaction.</div>
        ) : (
          <div className="space-y-2">
            {s.transactions.slice(0, 10).map((t) => (
              <div key={t.id} className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0">
                <div>
                  <span className="font-medium capitalize">{t.type}</span>
                  {t.method && <span className="text-muted-foreground"> · {t.method}</span>}
                  <div className="text-xs text-muted-foreground">{new Date(t.at).toLocaleString("fr-FR")}</div>
                </div>
                <div className={`font-bold ${t.amount >= 0 ? "text-primary" : "text-destructive"}`}>
                  {t.amount >= 0 ? "+" : ""}{fmt(t.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BalanceCard({ label, value, icon, accent, pulse }: { label: string; value: number; icon: React.ReactNode; accent: string; pulse?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${accent} text-white p-6 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest opacity-80">{label}</div>
        <div className="opacity-70">{icon}</div>
      </div>
      <motion.div key={Math.floor(value)} initial={{ scale: pulse ? 1.05 : 1 }} animate={{ scale: 1 }} className="mt-3 font-display text-3xl font-bold">
        {fmt(value)}
      </motion.div>
      {pulse && <div className="absolute -bottom-1 -right-1 h-20 w-20 rounded-full bg-white/10 animate-ping" />}
    </motion.div>
  );
}
