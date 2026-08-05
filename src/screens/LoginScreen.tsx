import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { images } from '../theme/images';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { authService } = useServices();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function entrar() {
    setLoading(true);
    try {
      await authService.login(email, senha);
      navigation.replace('Menu');
    } catch (e) {
      Alert.alert('Erro ao conectar', e instanceof Error ? e.message : 'Tente novamente');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <Image source={images.logolarge} style={styles.logo} resizeMode="contain" />

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.muted}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={entrar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar no APP</Text>}
      </TouchableOpacity>
      <Text style={styles.hint}>Aperte para entrar!</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Recuperar')}>
        <Text style={styles.link}>Esqueci minha senha!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center', gap: 14 },
  logo: { width: '100%', height: 130, marginBottom: 16, alignSelf: 'center' },
  input: {
    backgroundColor: colors.surface, color: colors.text, borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 14, fontFamily: fonts.regular,
  },
  button: {
    backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 16,
    alignItems: 'center', marginTop: 8,
  },
  buttonText: { color: '#fff', fontFamily: fonts.bold, fontSize: 16 },
  hint: { color: colors.muted, textAlign: 'center', fontFamily: fonts.regular },
  link: { color: colors.primary, textAlign: 'center', marginTop: 12, fontFamily: fonts.bold },
});
