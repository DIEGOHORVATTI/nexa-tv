import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export function CadastroClienteScreen({ navigation }: Props) {
  const { authService } = useServices();
  const [f, setF] = useState({ nome: '', cpf: '', celular: '', email: '', senha: '', confirma: '' });
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF(s => ({ ...s, [k]: v }));

  async function cadastrar() {
    if (!f.nome.trim() || !f.email.trim()) return Alert.alert('Cadastro', 'Nome e e-mail são obrigatórios');
    if (f.senha.length < 8) return Alert.alert('Cadastro', 'Senha com pelo menos 8 caracteres');
    if (f.senha !== f.confirma) return Alert.alert('Cadastro', 'Senhas não conferem');
    setLoading(true);
    try {
      await authService.cadastrar(
        {
          client_name: f.nome,
          client_email: f.email.trim(),
          client_document: f.cpf,
          client_cell: f.celular,
        },
        f.senha,
      );
      Alert.alert('Novo Usuário', 'Cadastro criado com sucesso! Faça login.');
      navigation.replace('Login');
    } catch (e) {
      Alert.alert('Erro no cadastro', e instanceof Error ? e.message : 'Tente novamente');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Novo Usuário!</Text>
      <Field placeholder="Nome Completo" value={f.nome} onChangeText={set('nome')} />
      <Field placeholder="CPF" value={f.cpf} onChangeText={set('cpf')} keyboardType="numeric" />
      <Field placeholder="Celular" value={f.celular} onChangeText={set('celular')} keyboardType="phone-pad" />
      <Field placeholder="E-mail" value={f.email} onChangeText={set('email')} keyboardType="email-address" autoCapitalize="none" />
      <Field placeholder="Senha" value={f.senha} onChangeText={set('senha')} secureTextEntry />
      <Field placeholder="Repita a Senha" value={f.confirma} onChangeText={set('confirma')} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={cadastrar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput {...props} placeholderTextColor={colors.muted} style={styles.input} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 56, gap: 12 },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22, marginBottom: 8 },
  input: {
    backgroundColor: colors.surface, color: colors.text, borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 14, fontFamily: fonts.regular,
  },
  button: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontFamily: fonts.bold, fontSize: 16 },
});
