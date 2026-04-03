import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

import { HomeScreen } from "@/features/home/screens/home-screen";
import { SettingsScreen } from "@/features/settings/screens/settings-screen";
import { colors } from "@/theme/colors";

import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

function StoreScreen() {
  return <View style={styles.placeholder} />;
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
