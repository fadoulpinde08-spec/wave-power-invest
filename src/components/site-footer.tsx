import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-night text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-display text-lg font-bold text-white">Fadoul Investment</div>
          <p className="mt-3 text-sm text-white/60">
            Plateforme leader d'investissement en panneaux solaires en Afrique de l'Ouest. Régulée, transparente, rentable.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-gold mb-3">Plateforme</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Accueil</Link></li>
            <li><Link to="/simulateur" className="hover:text-white">Simulateur</Link></li>
            <li><Link to="/auth" className="hover:text-white">Inscription</Link></li>
          </ul>
        </div>
        <div className="ponzi-flag" data-flag="Fausses coordonnées juridiques">
          <div className="text-xs uppercase tracking-widest text-gold mb-3">Société</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Fadoul Energy SARL</li>
            <li>RCCM SN-DKR-2024-B-12345</li>
            <li>Siège : Mermoz, Dakar, Sénégal</li>
            <li>+221 33 000 00 00</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-gold mb-3">Comprendre</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/decryptage" className="text-destructive font-medium hover:underline">⚠ Décryptage pédagogique</Link></li>
            <li><Link to="/mentions" className="hover:text-white">Mentions légales</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/50">
          ⚠ Site démonstratif à but pédagogique — Exposition sur les systèmes de Ponzi. Aucune transaction réelle, aucun panneau solaire réel.
        </div>
      </div>
    </footer>
  );
}
