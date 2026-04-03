import { FontAwesome } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Line } from "react-native-svg";
import { appPalette } from "@/constants/app-colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export function MilestoneDivider() {
  return (
    <View style={styles.milestoneWrapper}>
      <View style={styles.milestoneContent}>
        <FontAwesome name="flag" size={14} color={appPalette.goldShadow} />
        <Text style={styles.milestoneText}>2,312 users completed Question 3 today</Text>
        <FontAwesome name="flag" size={14} color={appPalette.goldShadow} />
      </View>
      <View style={styles.dottedLineContainer}>
        <View style={{ overflow: 'hidden' }}>
          <Svg height="2" width="100%">
            <Line x1="0" y1="1" x2="100%" y2="1" stroke={appPalette.goldShadow} strokeWidth="1" strokeDasharray="3, 3" />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  milestoneWrapper: {
    marginVertical: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get('window').width,
    marginLeft: -spacing.m,
  },
  milestoneContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.s,
    paddingBottom: spacing.xxs,
  },
  milestoneText: {
    fontFamily: typography.fonts.manrope.bold,
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.14,
    textAlign: "center",
    color: appPalette.goldShadow,
  },
  dottedLineContainer: {
    width: "100%",
  },
});
