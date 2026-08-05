import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { Session } from '../services/SessionStore';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Perfil'>;

export function PerfilScreen({ navigation }: Props) {
  const { authService } = useServices();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    authService.current().then(setSession);
  }, [authService]);

  async function deslogar() {
    await authService.logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Minha Conta</Text>
      <Text style={styles.field}>{session?.nome ?? '-'}</Text>
      <Text style={styles.sub}>{session?.email ?? '-'}</Text>

      <TouchableOpacity style={styles.button} onPress={deslogar}>
        <Text style={styles.buttonText}>Deslogar da sua Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 64, gap: 8 },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22, marginBottom: 16 },
  field: { color: colors.text, fontFamily: fonts.bold, fontSize: 18 },
  sub: { color: colors.muted, fontFamily: fonts.regular },
  button: { backgroundColor: colors.danger, borderRadius: 10, paddingVertical: 16, alignItems: 'center', marginTop: 32 },
  buttonText: { color: '#fff', fontFamily: fonts.bold },
});
