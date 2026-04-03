import type { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface SettingsRowProps {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  rightElement?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function SettingsRow({
  icon,
  label,
  sublabel,
  rightElement,
  onPress,
  accessibilityLabel,
}: SettingsRowProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={styles.row}
      {...(onPress ? { onPress, accessibilityRole: "button" as const } : {})}
      {...(accessibilityLabel ? { accessibilityLabel } : {})}
    >
      <View style={styles.rowLeft}>
        {icon}
        <View>
          <Text style={styles.rowText}>{label}</Text>
          {sublabel != null && (
            <Text style={styles.rowSublabel}>{sublabel}</Text>
          )}
        </View>
      </View>
      {rightElement}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
    lineHeight: 20,
    color: appPalette.ink2,
    fontFamily: typography.fonts.inter.medium,
    letterSpacing: -0.14,
  },
  rowSublabel: {
    fontSize: 12,
    lineHeight: 16,
    color: appPalette.systemGray,
    fontFamily: typography.fonts.inter.normal,
    letterSpacing: -0.12,
    marginTop: spacing.xxxs,
  },
});
