import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@/features/auth/screens/login-screen";
import { SplashScreen } from "@/features/auth/screens/splash-screen";
import { WelcomeScreen } from "@/features/auth/screens/welcome-screen";

import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ animation: "fade", animationTypeForReplace: "pop" }}
      />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
