import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Suporte'>;

// Contatos de suporte Nexa (do repasse do cliente). Ajuste conforme necessário.
const contatos = [
  { label: 'WhatsApp', url: 'https://api.whatsapp.com/send?phone=595984518179', erro: 'Erro ao abrir WhatsApp' },
  { label: 'Telegram', url: 'https://t.me/', erro: 'Erro ao abrir Telegram' },
  { label: 'Facebook', url: 'https://www.facebook.com/', erro: 'Erro ao abrir Facebook' },
];

export function SuporteScreen(_props: Props) {
  async function abrir(url: string, erro: string) {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Suporte', erro);
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Pedir Suporte</Text>
      {contatos.map(c => (
        <TouchableOpacity key={c.label} style={styles.button} onPress={() => abrir(c.url, c.erro)}>
          <Text style={styles.buttonText}>{c.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 64, gap: 12 },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22, marginBottom: 12 },
  button: { backgroundColor: colors.surface, borderRadius: 10, paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: colors.text, fontFamily: fonts.bold },
});
