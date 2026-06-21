import { Link } from "@tanstack/react-router";
import { Sun } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-emerald-700 text-white shadow-md">
            <Sun className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold">Fadoul <span className="gold-text">Investment</span></div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Solar Wealth Africa</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition" activeOptions={{ exact: true }}>Accueil</Link>
          <Link to="/simulateur" className="hover:text-primary transition">Simulateur</Link>
          <Link to="/decryptage" className="text-destructive hover:underline">Décryptage</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden sm:inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-muted transition"
          >
            Connexion
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-emerald-700 px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Investir
          </Link>
        </div>
      </div>
    </header>
  );
}
