import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageSourcePropType } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { images } from '../theme/images';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;
type Route = keyof RootStackParamList;

const items: { label: string; icon: ImageSourcePropType; to: Route }[] = [
  { label: 'Comprar Recarga', icon: images.comprarrecargatve, to: 'Recarga' },
  { label: 'Meus Pedidos', icon: images.comprarrecarga, to: 'Pedidos' },
  { label: 'Assistir Canais', icon: images.assistircanaisicon, to: 'Assistir' },
  { label: 'Dados do Cliente', icon: images.novousuarioicon, to: 'Cadastro' },
  { label: 'Minha Conta', icon: images.novousuarioicon, to: 'Perfil' },
  { label: 'Pedir Suporte', icon: images.suporte, to: 'Suporte' },
];

export function MenuScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <Image source={images.logoHeader} style={styles.header} resizeMode="contain" />
      <ScrollView contentContainerStyle={styles.grid}>
        {items.map(it => (
          <TouchableOpacity key={it.to} style={styles.card} onPress={() => navigation.navigate(it.to)}>
            <Image source={it.icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.label}>{it.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, paddingTop: 48 },
  header: { width: '60%', height: 44, alignSelf: 'center', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 16, gap: 16 },
  card: {
    width: '47%', aspectRatio: 1, backgroundColor: colors.surface, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  icon: { width: 64, height: 64 },
  label: { color: colors.text, fontFamily: fonts.bold, textAlign: 'center' },
});
