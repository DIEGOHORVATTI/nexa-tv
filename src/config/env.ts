/**
 * Config via variáveis EXPO_PUBLIC_* (Expo injeta em process.env no bundle).
 * Base URL do backend real da TV Express por padrão.
 */
export const env = {
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL ?? 'https://www.tvexpressrecargafacil.com.br',
} as const;
