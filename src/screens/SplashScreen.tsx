import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/routes';
import { useServices } from '../AppContext';
import { images } from '../theme/images';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { authService } = useServices();

  useEffect(() => {
    authService.current().then(session => {
      navigation.replace(session ? 'Menu' : 'Login');
    });
  }, [authService, navigation]);

  return (
    <View style={styles.root}>
      <Image source={images.logolarge} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: 24 },
  logo: { width: 220, height: 120 },
});
