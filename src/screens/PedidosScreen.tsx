import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { Pedido } from '../api/types';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Pedidos'>;

const STATUS: Record<string, string> = { '1': 'Aguardando pagamento', '2': 'Pago', '3': 'Cancelado' };

export function PedidosScreen({ navigation }: Props) {
  const { syncApi, authService } = useServices();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const s = await authService.current();
    if (!s) return navigation.replace('Login');
    try {
      const r = await syncApi.sincDados(s);
      setPedidos(r.pedidos ?? []);
    } finally {
      setLoading(false);
    }
  }, [syncApi, authService, navigation]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Meus Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={p => p.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum pedido por aqui!</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pedido #{item.id} · R$ {item.valor}</Text>
            <Text style={styles.cardSub}>{STATUS[item.status] ?? item.status} · {item.tipo} · {item.data}</Text>
            {!!item.boleto_link && (
              <TouchableOpacity onPress={() => Linking.openURL(item.boleto_link!)}>
                <Text style={styles.link}>Abrir boleto</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 48 },
  center: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22, marginBottom: 16 },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 40, fontFamily: fonts.regular },
  card: { backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginBottom: 12 },
  cardTitle: { color: colors.text, fontFamily: fonts.bold },
  cardSub: { color: colors.muted, fontFamily: fonts.regular, marginTop: 4, fontSize: 12 },
  link: { color: colors.primary, fontFamily: fonts.bold, marginTop: 8 },
});
