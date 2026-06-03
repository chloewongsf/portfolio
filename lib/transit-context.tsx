"use client";

import { createContext, useContext, useState } from "react";
import type { TransitLineId } from "@/lib/transit-config";

interface TransitContextValue {
  activeId: TransitLineId | null;
  setActiveId: (id: TransitLineId | null) => void;
}

const TransitContext = createContext<TransitContextValue>({
  activeId: null,
  setActiveId: () => {},
});

export function TransitProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<TransitLineId | null>(null);

  return (
    <TransitContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </TransitContext.Provider>
  );
}

export function useTransit() {
  return useContext(TransitContext);
}
