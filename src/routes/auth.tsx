import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Mail, Phone, User, Gift } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { signup, login } from "@/lib/demo-store";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Connexion — Fadoul Investment" }] }),
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({ email: "", name: "", phone: "", ref: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (mode === "signup") signup(form.email, form.name || form.email.split("@")[0], form.phone, form.ref || undefined);
      else login(form.email);
      nav({ to: "/dashboard" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-md px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-lg">
            <Sun className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">{mode === "signup" ? "Créez votre compte" : "Bon retour !"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signup" ? "2 500 FCFA offerts à l'inscription 🎁" : "Connectez-vous pour gérer vos panneaux"}
          </p>
        </motion.div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-lg">
          <Field icon={<Mail className="h-4 w-4" />} placeholder="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          {mode === "signup" && (
            <>
              <Field icon={<User className="h-4 w-4" />} placeholder="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field icon={<Phone className="h-4 w-4" />} placeholder="+221 77 000 0000" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
              <div className="ponzi-flag" data-flag="Champ parrain : ADN d'un Ponzi">
                <Field icon={<Gift className="h-4 w-4" />} placeholder="Code parrain (optionnel)" value={form.ref} onChange={(v) => setForm({ ...form, ref: v })} />
              </div>
            </>
          )}
          <Field icon={<span className="text-xs">🔒</span>} placeholder="Mot de passe" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />

          <button disabled={loading} className="shimmer w-full rounded-xl bg-gradient-to-r from-primary to-emerald-700 py-3 font-bold text-white shadow-lg disabled:opacity-60">
            {loading ? "Chargement..." : mode === "signup" ? "Créer mon compte" : "Se connecter"}
          </button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Déjà un compte ?" : "Pas encore inscrit ?"}{" "}
            <button type="button" onClick={() => setMode(mode === "signup" ? "login" : "signup")} className="text-primary font-semibold hover:underline">
              {mode === "signup" ? "Connectez-vous" : "Créez un compte"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-xs text-center text-muted-foreground">
          Démo pédagogique — aucune donnée n'est envoyée à un serveur. Tout est stocké localement.
        </p>
      </div>
    </div>
  );
}

function Field({ icon, ...rest }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement> & { onChange: (v: string) => void; value: string }) {
  const { onChange, ...input } = rest;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-primary">
      <span className="text-muted-foreground">{icon}</span>
      <input {...input} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
    </div>
  );
}
