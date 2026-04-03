import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export function triggerHaptic(style: "light" | "medium" = "light") {
  try {
    if (Platform.OS === "android") {
      Haptics.performAndroidHapticsAsync(
        style === "light"
          ? Haptics.AndroidHaptics.Context_Click
          : Haptics.AndroidHaptics.Confirm,
      ).catch(() => {
        // Fallback to selectionAsync if performAndroidHapticsAsync fails
        Haptics.selectionAsync().catch(() => {});
      });
    } else {
      Haptics.impactAsync(
        style === "light"
          ? Haptics.ImpactFeedbackStyle.Light
          : Haptics.ImpactFeedbackStyle.Medium,
      ).catch(() => {});
    }
  } catch {
    // Silently fail if haptics unavailable
  }
}
