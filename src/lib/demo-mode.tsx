import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = { demo: boolean; setDemo: (v: boolean) => void };
const DemoCtx = createContext<Ctx>({ demo: false, setDemo: () => {} });

export function DemoProvider({ children }: { children: ReactNode }) {
  const [demo, setDemoState] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("fadoul-demo") === "1";
    setDemoState(v);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("demo-mode", demo);
  }, [demo]);

  const setDemo = (v: boolean) => {
    setDemoState(v);
    localStorage.setItem("fadoul-demo", v ? "1" : "0");
  };

  return <DemoCtx.Provider value={{ demo, setDemo }}>{children}</DemoCtx.Provider>;
}

export const useDemo = () => useContext(DemoCtx);
