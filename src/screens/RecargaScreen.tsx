import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Linking } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { Plano } from '../api/types';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Recarga'>;

export function RecargaScreen({ navigation }: Props) {
  const { recargaApi, authService } = useServices();
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);
  const [comprando, setComprando] = useState<string | null>(null);

  const load = useCallback(async () => {
    const s = await authService.current();
    if (!s) return navigation.replace('Login');
    try {
      setPlanos(await recargaApi.buscarPlanos(s));
    } finally {
      setLoading(false);
    }
  }, [recargaApi, authService, navigation]);

  useEffect(() => {
    load();
  }, [load]);

  async function comprar(plano: Plano) {
    const s = await authService.current();
    if (!s) return navigation.replace('Login');
    setComprando(plano.pdt_id);
    try {
      // Fluxo real: boleto via Asaas.
      const res = await recargaApi.gerarPedido(s, {
        valor: plano.venda,
        planoId: plano.pdt_id,
        tipo: 'boleto',
        operadora: 'assas',
      });
      const link = res.pedido?.boleto_link;
      Alert.alert(res.falha?.text ?? 'Pedido gerado', link ? 'Abrir boleto?' : '', [
        { text: 'Fechar' },
        ...(link ? [{ text: 'Abrir boleto', onPress: () => Linking.openURL(link) }] : []),
      ]);
      navigation.navigate('Pedidos');
    } catch (e) {
      Alert.alert('Erro', e instanceof Error ? e.message : 'Tente novamente');
    } finally {
      setComprando(null);
    }
  }

  if (loading) return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Escolha Sua Recarga</Text>
      <FlatList
        data={planos}
        keyExtractor={p => p.pdt_id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => comprar(item)} disabled={!!comprando}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome.trim()}</Text>
              {!!item.descricao && <Text style={styles.desc}>{item.descricao}</Text>}
            </View>
            {comprando === item.pdt_id ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.preco}>R$ {item.venda}</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 20, paddingTop: 48 },
  center: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22, marginBottom: 16 },
  card: {
    backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  nome: { color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  desc: { color: colors.muted, fontFamily: fonts.regular, marginTop: 4, fontSize: 12 },
  preco: { color: colors.primary, fontFamily: fonts.bold, fontSize: 16 },
});
