import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { deposit, fmt } from "@/lib/demo-store";
import waveLogo from "@/assets/wave.jpg.asset.json";
import orangeLogo from "@/assets/orange-money.jpg.asset.json";
import moovLogo from "@/assets/moov-africa.jpg.asset.json";

export const Route = createFileRoute("/dashboard/depot")({
  component: DepotPage,
});

const METHODS = [
  { id: "wave" as const, name: "Wave", color: "from-sky-400 to-sky-600", logo: waveLogo.url },
  { id: "orange" as const, name: "Orange Money", color: "from-neutral-800 to-black", logo: orangeLogo.url },
  { id: "moov" as const, name: "Moov Africa", color: "from-blue-600 to-blue-800", logo: moovLogo.url },
];

function DepotPage() {
  const nav = useNavigate();
  const [method, setMethod] = useState<"wave" | "orange" | "moov" | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(10000);
  const [step, setStep] = useState<"form" | "loading" | "success">("form");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) return;
    setStep("loading");
    setTimeout(() => {
      deposit(amount, method, phone);
      setStep("success");
      setTimeout(() => nav({ to: "/dashboard" }), 1800);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-2">Effectuer un dépôt</h1>
      <p className="text-sm text-muted-foreground mb-6">Choisissez votre opérateur mobile money.</p>

      <div className="ponzi-flag rounded-2xl border border-border bg-card p-6" data-flag="Faux paiement : aucune intégration Wave/Orange/Moov. Dans un vrai Ponzi, l'argent va dans la poche de l'organisateur.">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Opérateur</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {METHODS.map((m) => (
                    <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                      className={`rounded-xl bg-gradient-to-br ${m.color} text-white p-4 text-center transition ${method === m.id ? "ring-4 ring-primary scale-105" : "opacity-70 hover:opacity-100"}`}>
                      <div className="h-10 w-10 mx-auto rounded-lg overflow-hidden bg-white/10 ring-1 ring-white/20"><img src={m.logo} alt={m.name} className="h-full w-full object-cover" /></div>
                      <div className="mt-2 text-xs font-semibold">{m.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Numéro de téléphone</label>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+221 77 000 0000" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Montant (FCFA)</label>
                <input required type="number" min={1000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-bold text-lg" />
                <div className="mt-2 flex flex-wrap gap-2">
                  {[10000, 30000, 50000, 100000, 250000].map(v => (
                    <button key={v} type="button" onClick={() => setAmount(v)} className="rounded-full border border-border px-3 py-1 text-xs hover:bg-muted">{fmt(v)}</button>
                  ))}
                </div>
              </div>

              <button disabled={!method} className="shimmer w-full rounded-xl bg-gradient-to-r from-primary to-emerald-700 py-3 font-bold text-white disabled:opacity-50">
                Valider le dépôt
              </button>
            </motion.form>
          )}

          {step === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
              <div className="mt-4 font-semibold">Connexion à {METHODS.find(m => m.id === method)?.name}…</div>
              <div className="text-xs text-muted-foreground mt-1">Validez la transaction sur votre téléphone</div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-16 text-center">
              <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
              <div className="mt-4 font-display text-xl font-bold">Transaction approuvée</div>
              <div className="mt-2 text-2xl font-bold gold-text">+{fmt(amount)}</div>
              <div className="text-xs text-muted-foreground mt-2">Redirection vers votre tableau de bord…</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
