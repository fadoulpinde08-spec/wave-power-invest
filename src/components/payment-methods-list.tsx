import waveLogo from "@/assets/wave.jpg.asset.json";
import orangeLogo from "@/assets/orange-money.jpg.asset.json";
import moovLogo from "@/assets/moov-africa.jpg.asset.json";

const METHODS = [
  { id: "wave", name: "Wave", color: "from-sky-400 to-sky-600", logo: waveLogo.url, note: "Transfert instantané 24h/24" },
  { id: "orange", name: "Orange Money", color: "from-neutral-800 to-black", logo: orangeLogo.url, note: "Débit direct depuis votre compte" },
  { id: "moov", name: "Moov Africa", color: "from-blue-600 to-blue-800", logo: moovLogo.url, note: "Paiement sécurisé par Moov" },
];

export function PaymentMethodsList() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <h3 className="font-display text-lg font-bold mb-4">Méthodes de paiement</h3>
      <div className="space-y-3">
        {METHODS.map((m) => (
          <div key={m.id} className="flex items-center gap-4 rounded-xl bg-background border border-border p-3 hover:border-primary/40 transition">
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${m.color} p-1 flex items-center justify-center shrink-0`}>
              <img src={m.logo} alt={m.name} className="h-full w-full object-cover rounded-md bg-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.note}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Tous les opérateurs mobile money de l’Afrique de l’Ouest sont acceptés.
      </p>
    </div>
  );
}
