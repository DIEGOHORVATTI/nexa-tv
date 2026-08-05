import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RecuperarScreen } from '../screens/RecuperarScreen';
import { CadastroClienteScreen } from '../screens/CadastroClienteScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { RecargaScreen } from '../screens/RecargaScreen';
import { PedidosScreen } from '../screens/PedidosScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { AssistirScreen } from '../screens/AssistirScreen';
import { SuporteScreen } from '../screens/SuporteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Recuperar" component={RecuperarScreen} />
        <Stack.Screen name="Cadastro" component={CadastroClienteScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Recarga" component={RecargaScreen} />
        <Stack.Screen name="Pedidos" component={PedidosScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Assistir" component={AssistirScreen} />
        <Stack.Screen name="Suporte" component={SuporteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
