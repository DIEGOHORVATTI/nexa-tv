import React, { createContext, useContext } from 'react';
import type { AppServices as Container } from './AppServices';

// IMPORTANTE: só type-import do Container — as telas não carregam o container real
// (Firebase/op-sqlite/env) só por usarem useServices. A montagem real fica no App.tsx.

const Ctx = createContext<Container | null>(null);

/** Provider que recebe um container pronto (real no App, fake nos testes). */
export function ServicesProvider({ value, children }: { value: Container; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useServices(): Container {
  const c = useContext(Ctx);
  if (!c) throw new Error('useServices deve ser usado dentro de <ServicesProvider>');
  return c;
}
