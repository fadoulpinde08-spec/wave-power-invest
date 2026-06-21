// Local-storage state for Fadoul Investment (educational Ponzi demo)
export type Panel = {
  id: string;
  name: string;
  price: number;
  dailyPct: number;
  durationDays: number;
  badge?: string;
  color: string;
};

export const PANELS: Panel[] = [
  { id: "starter", name: "Starter", price: 10_000, dailyPct: 10, durationDays: 60, color: "from-emerald-400 to-emerald-600" },
  { id: "bronze", name: "Bronze", price: 30_000, dailyPct: 11, durationDays: 60, color: "from-amber-600 to-orange-700" },
  { id: "argent", name: "Argent", price: 50_000, dailyPct: 12, durationDays: 60, badge: "Populaire", color: "from-slate-300 to-slate-500" },
  { id: "or", name: "Or", price: 100_000, dailyPct: 13, durationDays: 60, badge: "Recommandé", color: "from-yellow-400 to-amber-600" },
  { id: "platine", name: "Platine", price: 250_000, dailyPct: 14, durationDays: 60, color: "from-cyan-300 to-blue-500" },
  { id: "diamant", name: "Diamant", price: 500_000, dailyPct: 15, durationDays: 60, badge: "VIP", color: "from-fuchsia-400 to-purple-600" },
];

export const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " FCFA";

export type Investment = {
  id: string;
  panelId: string;
  amount: number;
  startedAt: number;
};

export type Transaction = {
  id: string;
  type: "depot" | "retrait" | "gain" | "parrainage";
  amount: number;
  method?: "wave" | "orange" | "moov";
  phone?: string;
  status: "approuve" | "en_attente";
  at: number;
};

export type User = {
  email: string;
  name: string;
  phone: string;
  referralCode: string;
  referredBy?: string;
  createdAt: number;
};

export type State = {
  user: User | null;
  balance: number;
  refBalance: number;
  investments: Investment[];
  transactions: Transaction[];
  referrals: { name: string; level: 1 | 2 | 3; earned: number }[];
};

const KEY = "fadoul-state-v1";

const seedReferrals = [
  { name: "Aminata D.", level: 1 as const, earned: 12_500 },
  { name: "Ibrahim K.", level: 1 as const, earned: 8_300 },
  { name: "Mariam S.", level: 2 as const, earned: 4_100 },
  { name: "Cheikh T.", level: 3 as const, earned: 1_750 },
];

const defaultState = (): State => ({
  user: null,
  balance: 0,
  refBalance: 0,
  investments: [],
  transactions: [],
  referrals: [],
});

export function loadState(): State {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveState(s: State) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("fadoul-state"));
}

export function resetState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("fadoul-state"));
}

export function signup(email: string, name: string, phone: string, refCode?: string): State {
  const s = loadState();
  s.user = {
    email,
    name,
    phone,
    referralCode: "FAD" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    referredBy: refCode,
    createdAt: Date.now(),
  };
  // Generous welcome bonus to make demo flow (classic Ponzi tactic)
  s.balance = 2_500;
  s.referrals = seedReferrals;
  s.transactions = [{
    id: crypto.randomUUID(),
    type: "gain",
    amount: 2_500,
    status: "approuve",
    at: Date.now(),
  }];
  saveState(s);
  return s;
}

export function login(email: string): State {
  const s = loadState();
  if (!s.user || s.user.email !== email) {
    // Auto-create for demo
    return signup(email, email.split("@")[0], "+221 77 000 0000");
  }
  return s;
}

export function logout() { resetState(); }

export function deposit(amount: number, method: "wave" | "orange" | "moov", phone: string) {
  const s = loadState();
  s.balance += amount;
  s.transactions.unshift({
    id: crypto.randomUUID(), type: "depot", amount, method, phone,
    status: "approuve", at: Date.now(),
  });
  saveState(s);
}

export function withdraw(amount: number, method: "wave" | "orange" | "moov", phone: string) {
  const s = loadState();
  s.transactions.unshift({
    id: crypto.randomUUID(), type: "retrait", amount, method, phone,
    status: "en_attente", at: Date.now(),
  });
  saveState(s);
}

export function buyPanel(panelId: string) {
  const panel = PANELS.find(p => p.id === panelId);
  if (!panel) return { ok: false, msg: "Panneau introuvable" };
  const s = loadState();
  if (s.balance < panel.price) return { ok: false, msg: "Solde insuffisant. Effectuez un dépôt." };
  s.balance -= panel.price;
  s.investments.push({
    id: crypto.randomUUID(), panelId, amount: panel.price, startedAt: Date.now(),
  });
  s.transactions.unshift({
    id: crypto.randomUUID(), type: "depot", amount: -panel.price,
    status: "approuve", at: Date.now(),
  });
  saveState(s);
  return { ok: true };
}

// Compute accrued gains (10s = 1 simulated day so the demo feels alive)
export function accrued(inv: Investment): { days: number; total: number; perDay: number; done: boolean } {
  const panel = PANELS.find(p => p.id === inv.panelId)!;
  const elapsedSec = (Date.now() - inv.startedAt) / 1000;
  const days = Math.min(panel.durationDays, Math.floor(elapsedSec / 10));
  const perDay = panel.price * (panel.dailyPct / 100);
  return { days, total: days * perDay, perDay, done: days >= panel.durationDays };
}

const NAMES = ["Aminata D.", "Ibrahim K.", "Mariam S.", "Cheikh T.", "Fatou N.", "Moussa B.", "Awa C.", "Ousmane L.", "Khady F.", "Modou G.", "Aïssatou W.", "Pape S."];
const CITIES = ["Dakar", "Abidjan", "Bamako", "Ouagadougou", "Lomé", "Cotonou", "Conakry", "Nouakchott"];
const METHODS = ["Wave", "Orange Money", "Moov Money"];

export function generateTickerItem() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const method = METHODS[Math.floor(Math.random() * METHODS.length)];
  const amount = (Math.floor(Math.random() * 95) + 5) * 1000;
  const action = Math.random() > 0.5 ? "vient de retirer" : "vient d'investir";
  return { id: crypto.randomUUID(), text: `${name} (${city}) ${action} ${fmt(amount)} via ${method}` };
}
