import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { typography } from "@/theme/typography";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  leftIcon?: React.ComponentProps<typeof Ionicons>["name"];
  disabled?: boolean;
  size?: "large" | "small";
}

export function PrimaryButton({
  label,
  onPress,
  leftIcon,
  disabled,
  size = "large",
}: PrimaryButtonProps) {
  const btnHeight = size === "small" ? 52 : 58;
  const fontSize = size === "small" ? 14 : 16;

  return (
    <View style={styles.outerShadow}>
      <View style={[styles.wrapper, { height: btnHeight + 8 }]}>
        <View style={[styles.orangeShadow, { height: btnHeight }]} />
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.85}
          disabled={disabled}
          style={styles.touchable}
        >
          <LinearGradient
            colors={["#FF6D00", "#FF3900"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.gradient, { height: btnHeight }]}
          >
            {leftIcon && (
              <Ionicons name={leftIcon} size={20} color="#FFFFFF" />
            )}
            <Text style={[styles.label, { fontSize }]}>{label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShadow: {
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  wrapper: {
    width: "100%",
  },
  orangeShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    backgroundColor: "#D63A00",
  },
  touchable: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  gradient: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 2,
  },
  label: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.16,
    color: "#FFFFFF",
  },
});
