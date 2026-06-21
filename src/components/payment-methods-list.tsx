import waveLogo from "@/assets/wave.jpg.asset.json";
import orangeLogo from "@/assets/orange-money.jpg.asset.json";
import moovLogo from "@/assets/moov-africa.jpg.asset.json";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

const METHODS = [
  { id: "wave", name: "Wave", color: "from-sky-400 to-sky-600", logo: waveLogo.url, note: "Transfert instantané 24h/24" },
  { id: "orange", name: "Orange Money", color: "from-neutral-800 to-black", logo: orangeLogo.url, note: "Débit direct depuis votre compte" },
  { id: "moov", name: "Moov Africa", color: "from-blue-600 to-blue-800", logo: moovLogo.url, note: "Paiement sécurisé par Moov" },
];

const INSTRUCTIONS = {
  wave: {
    deposit: [
      "Ouvrez l'application Wave sur votre téléphone.",
      "Tapez 'Envoyer de l'argent' puis saisissez le numéro de caisse affiché après validation.",
      "Entrez le montant du dépôt et confirmez avec votre code Wave.",
      "Votre solde Fadoul sera crédité sous quelques minutes.",
    ],
    withdraw: [
      "Saisissez le numéro Wave sur lequel vous souhaitez recevoir les fonds.",
      "Validez la demande de retrait ci-dessus.",
      "Recevez l'argent directement sur votre compte Wave après traitement.",
    ],
  },
  orange: {
    deposit: [
      "Composez *144# ou ouvrez l'application Orange Money.",
      "Choisissez 'Transfert d'argent' puis saisissez le numéro de caisse Fadoul.",
      "Indiquez le montant, confirmez et entrez votre code Orange Money.",
      "Le crédit apparaîtra sur votre tableau de bord sous quelques minutes.",
    ],
    withdraw: [
      "Entrez votre numéro Orange Money enregistré.",
      "Soumettez la demande de retrait ci-dessus.",
      "Les fonds seront transférés sur votre compte Orange Money après validation.",
    ],
  },
  moov: {
    deposit: [
      "Composez *155# ou ouvrez l'application Moov Money.",
      "Sélectionnez 'Transfert' et entrez le numéro de caisse Fadoul.",
      "Saisissez le montant, validez avec votre code Moov Money.",
      "Votre investissement est enregistré automatiquement.",
    ],
    withdraw: [
      "Indiquez le numéro Moov Money de réception.",
      "Validez la demande de retrait dans le formulaire.",
      "Le montant sera crédité sur votre compte Moov Money après traitement.",
    ],
  },
};

interface PaymentMethodsListProps {
  mode?: "deposit" | "withdraw";
}

export function PaymentMethodsList({ mode = "deposit" }: PaymentMethodsListProps) {
  const isDeposit = mode === "deposit";
  const title = isDeposit ? "Comment déposer" : "Comment retirer";
  const steps = (id: "wave" | "orange" | "moov") => INSTRUCTIONS[id][isDeposit ? "deposit" : "withdraw"];

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
        <Wallet className="h-5 w-5 text-primary" />
        Méthodes de paiement
      </h3>

      <div className="space-y-4">
        {METHODS.map((m) => (
          <div key={m.id} className="rounded-xl bg-background border border-border p-4 hover:border-primary/40 transition">
            <div className="flex items-center gap-4 mb-3">
              <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${m.color} p-1 flex items-center justify-center shrink-0`}>
                <img src={m.logo} alt={m.name} className="h-full w-full object-cover rounded-md bg-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.note}</div>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                {isDeposit ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                {title} avec {m.name}
              </div>
              <ol className="space-y-1.5">
                {steps(m.id as "wave" | "orange" | "moov").map((step, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Tous les opérateurs mobile money de l'Afrique de l'Ouest sont acceptés.
      </p>
    </div>
  );
}
