import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sun, LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, Users, LogOut } from "lucide-react";
import { loadState, logout, type State } from "@/lib/demo-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord — Fadoul Investment" }] }),
  component: DashLayout,
});

function DashLayout() {
  const nav = useNavigate();
  const [s, setS] = useState<State | null>(null);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    const refresh = () => {
      const st = loadState();
      if (!st.user) { nav({ to: "/auth" }); return; }
      setS(st);
    };
    refresh();
    window.addEventListener("fadoul-state", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("fadoul-state", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [nav]);

  if (!s?.user) return <div className="min-h-screen grid place-items-center text-muted-foreground">Chargement…</div>;

  const links = [
    { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
    { to: "/dashboard/depot", label: "Dépôt", icon: ArrowDownToLine },
    { to: "/dashboard/retrait", label: "Retrait", icon: ArrowUpFromLine },
    { to: "/dashboard/parrainage", label: "Parrainage", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary"><Sun className="h-4 w-4" /></div>
            <div className="font-display font-bold">Fadoul <span className="gold-text">Investment</span></div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{s.user.name}</div>
              <div className="text-xs text-white/60">{s.user.email}</div>
            </div>
            <button onClick={() => { logout(); nav({ to: "/" }); }} className="rounded-full bg-white/10 hover:bg-white/20 p-2" title="Se déconnecter">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-card border-b border-border sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 flex gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                <l.icon className="h-4 w-4" /> {l.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
