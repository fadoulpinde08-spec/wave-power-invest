import { useEffect, useState } from "react";
import { generateTickerItem } from "@/lib/demo-store";
import { motion, AnimatePresence } from "framer-motion";

export function LiveTicker() {
  const [items, setItems] = useState(() => Array.from({ length: 5 }, generateTickerItem));
  useEffect(() => {
    const id = setInterval(() => {
      setItems(prev => [generateTickerItem(), ...prev].slice(0, 5));
    }, 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="ponzi-flag" data-flag="Faux ticker temps réel — chiffres inventés pour créer l'illusion de succès">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Activité en direct</span>
          </div>
        </div>
        <div className="space-y-2 min-h-[180px]">
          <AnimatePresence initial={false}>
            {items.map((it) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20 }}
                className="text-sm text-foreground/80 border-l-2 border-primary pl-3 py-1"
              >
                ✅ {it.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
