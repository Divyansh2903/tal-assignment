import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SessionResultScreen } from "@/features/session-result/screens/session-result-screen";

import { AuthNavigator } from "./auth-navigator";
import { MainNavigator } from "./main-navigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="SessionResult"
        component={SessionResultScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}
