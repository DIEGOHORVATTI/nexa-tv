import 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ServicesProvider } from './src/AppContext';
import { buildContainer } from './src/container';
import { FcmTokenProvider } from './src/services/FcmTokenProvider';
import { Navigation } from './src/navigation';

export default function App() {
  const container = useMemo(() => buildContainer(new FcmTokenProvider()), []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ServicesProvider value={container}>
          <Navigation />
        </ServicesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
