import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Assistir'>;

// ponytail: endpoint de "Assistir" não capturado no MITM. Placeholder até mapear.
export function AssistirScreen(_props: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Assistir Canais & Filmes</Text>
      <Text style={styles.sub}>Em breve.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 64, gap: 8 },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22 },
  sub: { color: colors.muted, fontFamily: fonts.regular },
});
