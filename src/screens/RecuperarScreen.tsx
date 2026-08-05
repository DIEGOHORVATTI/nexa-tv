import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Recuperar'>;

export function RecuperarScreen({ navigation }: Props) {
  const { authService } = useServices();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function enviar() {
    setLoading(true);
    try {
      const mascarado = await authService.recuperarSenha(email);
      Alert.alert('Recuperar Senha', `Código enviado para ${mascarado}`);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Recuperar Senha', e instanceof Error ? e.message : 'Erro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.sub}>Digite seu e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={enviar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Avançar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center', gap: 12 },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22 },
  sub: { color: colors.muted, fontFamily: fonts.regular, marginBottom: 12 },
  input: {
    backgroundColor: colors.surface, color: colors.text, borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 14, fontFamily: fonts.regular,
  },
  button: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontFamily: fonts.bold },
});
