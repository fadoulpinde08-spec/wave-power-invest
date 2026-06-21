import { useDemo } from "@/lib/demo-mode";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export function DemoToggle() {
  const { demo, setDemo } = useDemo();
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => setDemo(!demo)}
      className={`fixed top-3 right-3 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur transition-all ${
        demo
          ? "bg-destructive text-destructive-foreground"
          : "bg-card/90 text-foreground border border-border hover:bg-card"
      }`}
      title="Bascule entre le site tel que présenté et son décryptage pédagogique"
    >
      {demo ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      {demo ? "Mode Décryptage actif" : "🔍 Activer Décryptage"}
    </motion.button>
  );
}
