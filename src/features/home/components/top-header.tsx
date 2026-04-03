import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export function TopHeader() {
  return (
    <View style={styles.headerContainer}>
      <MaskedView maskElement={<Text style={styles.headerTitle}>Ready!</Text>}>
        <LinearGradient colors={[appPalette.orangeVivid, appPalette.orangeRed]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
          <Text style={[styles.headerTitle, { opacity: 0 }]}>Ready!</Text>
        </LinearGradient>
      </MaskedView>
      <View style={styles.headerRight}>
        <View style={styles.energyPillShadow}>
          <TouchableOpacity style={styles.energyPill} accessibilityLabel="8 energy remaining" accessibilityRole="button">
            <Ionicons name="flash" size={16} color={appPalette.white} accessible={false} />
            <Text style={styles.energyText} accessible={false}>8</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuButton} accessibilityLabel="Menu" accessibilityRole="button">
          <Ionicons name="menu" size={24} color={appPalette.midGray} accessible={false} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.s,
  },
  headerTitle: {
    fontFamily: typography.fonts.onest.extraBold,
    fontSize: 24,
    color: appPalette.orangeVivid,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
  },
  energyPillShadow: {
    backgroundColor: appPalette.green40,
    borderRadius: spacing.xxxl,
    paddingBottom: spacing.xxs,
  },
  energyPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appPalette.greenSoft,
    borderRadius: spacing.xxxl,
    paddingHorizontal: spacing.s,
    height: 36,
    minWidth: 49,
    gap: spacing.xxxs,
  },
  energyText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.l,
    lineHeight: 24,
    letterSpacing: -0.17,
    color: appPalette.white,
    textAlign: "center",
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: appPalette.white,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: appPalette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
