/**
 * Rotas RPC reais (capturadas do app ao vivo). 1 endpoint por domínio,
 * dispatch por callback/callback_action. Ver API_REAL.md.
 */
export const endpoints = {
  login: '/login/_ajax/D/login/login.php',
  pedidos: '/login/_ajax/D/pedidos/pedidos.php',
  recarga: '/login/_ajax/D/recarga/recarga.php',
  sync: '/login/_ajax/D/login/sync.php',
  users: '/login/_ajax/D/users/users.php',
} as const;

/** Nome do domínio no campo `callback`. */
export const callbacks = {
  logar: 'Logar',
  pedidos: 'Pedidos',
  recarga: 'Recarga',
  sync: 'Sync',
} as const;
