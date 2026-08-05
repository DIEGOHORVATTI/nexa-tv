/** Tema base. Cores placeholder — ajustar às screenshots do app original p/ fidelidade visual. */
export const colors = {
  primary: '#E30613', // vermelho da logo Nexa (ajustar ao hex exato)
  background: '#0E0E10',
  surface: '#1B1B1F',
  text: '#FFFFFF',
  muted: '#9A9AA2',
  danger: '#FF4444',
} as const;

export const fonts = {
  regular: 'AlteHaasGroteskRegular',
  bold: 'AlteHaasGroteskBold',
  display: 'AvenirLTStd-Roman',
} as const;

export const spacing = (n: number) => n * 8;
