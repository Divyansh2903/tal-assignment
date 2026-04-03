import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { appPalette } from "@/constants/app-colors";
import { assets } from "@/constants/assets";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { LevelCardProps } from "../types";

const LOGO_IMAGES = assets.logos;

export function LevelCard({ id, company, logoKey, fallbackIcon, fallbackColor, status, marginLeft, showStartTooltip, onPress, showFeedbackTooltip }: LevelCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  const bgColor = isCompleted ? appPalette.greenMint : isCurrent ? appPalette.yellowLight : appPalette.separator;
  const shadowColor = isCompleted ? appPalette.greenShadow : isCurrent ? appPalette.goldMedium : appPalette.systemGray4;
  const textColor = appPalette.ink;

  const tooltipShadow = {
    shadowColor: appPalette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  };

  return (
    <View style={[styles.cardWrapper, { marginLeft, alignSelf: "flex-start", zIndex: showFeedbackTooltip ? 20 : showStartTooltip ? 10 : 1 }]}>
      {showStartTooltip && (
        <View style={styles.tooltipWrapper}>
          <View style={[styles.tooltipContainer, tooltipShadow]}>
            <Text style={styles.tooltipText}>START</Text>
            <View style={styles.tooltipArrow} />
          </View>
        </View>
      )}

      {showFeedbackTooltip && (
        <View style={styles.feedbackTooltipWrapper}>
          <View style={styles.feedbackTooltipArrow} />
          <View style={styles.feedbackTooltipContainer}>
            <Text style={styles.feedbackTooltipText}>
              API latency is variable & app is sluggish,{"\n"}How do you design UI safely?
            </Text>
            <View style={styles.feedbackTooltipMeta}>
              <Text style={styles.feedbackTooltipAskedBy}>Asked by {company}</Text>
              <View style={styles.feedbackTooltipTimeContainer} accessible={false}>
                <Ionicons name="timer-outline" size={14} color={appPalette.ink} accessible={false} />
                <Text style={styles.feedbackTooltipTime}>2 mins</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.feedbackButtonWrapper}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SessionResult", { questionId: String(id) })}
              accessibilityLabel="View feedback"
              accessibilityRole="button"
            >
              <View style={styles.feedbackButtonShadow} />
              <View style={styles.feedbackButtonContainer}>
                <Text style={styles.feedbackButtonText}>FEEDBACK</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aiListenButtonWrapper}
              activeOpacity={0.8}
              accessibilityLabel="AI versus AI listen mode"
              accessibilityRole="button"
            >
              <View style={styles.aiListenButtonShadow} />
              <View style={styles.aiListenButtonContainer}>
                <Ionicons name="headset" size={16} color={appPalette.white} style={{marginRight: 6}} accessible={false} />
                <Text style={styles.aiListenButtonText}>AI VS AI (LISTEN)</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress?.(); }} accessibilityLabel={`${company} question ${id}`} style={({pressed}) => [{
          borderRadius: 30,
          backgroundColor: shadowColor,
          paddingBottom: spacing.xs,
          width: 206
      }, pressed && { paddingBottom: 0, marginTop: spacing.xs }]}>
        <View style={{
            flexDirection: "row",
            borderRadius: 30,
            backgroundColor: bgColor,
            alignItems: "center",
            height: 73,
            width: 206,
            justifyContent: "space-between"
        }}>

          {!isLocked && (
            <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, overflow: "hidden", borderRadius: 30 }}>
                <Svg width="100%" height="100%" viewBox="0 0 206 73" preserveAspectRatio="none" fill="none">
                  <Path d="M0 0 H206 V25 Q103 45 0 25 Z" fill="white" fillOpacity={0.4} />
                  <Path d="M0 0 H206 V8 Q103 15 0 8 Z" fill="white" fillOpacity={0.5} />
                </Svg>
            </View>
          )}

          <View style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: spacing.l,
              paddingRight: spacing.xs,
              height: 73,
          }}>
            <Text style={[styles.companyText, { color: textColor, fontFamily: isLocked ? typography.fonts.manrope.medium : typography.fonts.manrope.semiBold }]}>{company}</Text>
            <View style={[styles.iconCircle, {
              marginLeft: spacing.xxs,
              borderWidth: 0.68,
              borderColor: isCompleted ? appPalette.greenMint : isCurrent ? appPalette.yellowLight : appPalette.systemGray5,
            }]}>
              {logoKey && LOGO_IMAGES[logoKey] ? (
                <Image source={LOGO_IMAGES[logoKey]} style={styles.logoImage} contentFit="contain" cachePolicy="memory-disk" accessible={false} />
              ) : (
                <FontAwesome name={fallbackIcon} size={14} color={fallbackColor} accessible={false} />
              )}
            </View>
          </View>

            <View style={{
              width: 74,
              height: 74,
              borderRadius: 30,
              backgroundColor: isCompleted ? appPalette.greenBright : isCurrent ? appPalette.yellow : appPalette.systemGray5,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 0,
              marginTop: 0
          }}>
            <View style={{
                position: "absolute",
                width: 64,
                height: 64,
                borderRadius: 26,
                backgroundColor: isCompleted ? appPalette.greenLime : isCurrent ? appPalette.yellow : appPalette.systemGray5,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}>
              {!isLocked && (
                <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}>
                  <Svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
                    <Path d="M0 0 H64 V20 Q32 35 0 20 Z" fill="white" fillOpacity={0.45} />
                    <Path d="M0 0 H64 V8 Q32 15 0 8 Z" fill="white" fillOpacity={0.6} />
                  </Svg>
                </View>
              )}
            </View>

            <View style={{ position: "absolute", zIndex: 2, alignItems: "center", justifyContent: "center", width: 64, height: 64 }} pointerEvents="none">
                <Svg width="64" height="64" viewBox="0 0 64 64">
                    {/* Background stroke */}
                    <SvgText
                        x="32"
                        y="44"
                        fill="transparent"
                        stroke={appPalette.overlayBlack60}
                        strokeWidth="4"
                        strokeLinejoin="round"
                        fontSize="36"
                        fontFamily={typography.fonts.manrope.bold}
                        fontWeight="800"
                        textAnchor="middle"
                    >
                        {id}
                    </SvgText>
                    {/* Foreground fill */}
                    <SvgText
                        x="32"
                        y="44"
                        fill="white"
                        fontSize="36"
                        fontFamily={typography.fonts.manrope.bold}
                        fontWeight="800"
                        textAnchor="middle"
                    >
                        {id}
                    </SvgText>
                </Svg>
            </View>
          </View>

        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: spacing.l,
  },
  tooltipWrapper: {
    position: "absolute",
    top: -36,
    right: -8,
    minWidth: 80,
    alignItems: "center",
    zIndex: 10,
    elevation: 10,
  },
  tooltipContainer: {
    backgroundColor: appPalette.white,
    borderRadius: spacing.xs,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 13,
    color: appPalette.green50,
    letterSpacing: 1,
  },
  tooltipArrow: {
    position: "absolute",
    bottom: -4,
    alignSelf: "center",
    width: 8,
    height: 8,
    backgroundColor: appPalette.white,
    transform: [{ rotate: "45deg" }],
  },
  companyText: {
    fontFamily: typography.fonts.manrope.medium,
    fontSize: typography.sizes.m,
    lineHeight: 20,
    color: appPalette.ink,
    marginRight: 0,
    letterSpacing: -0.15,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: appPalette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 16,
    height: 16,
  },
  feedbackTooltipWrapper: {
    position: "absolute",
    top: 90,
    left: -48,
    width: 380,
    zIndex: 20,
    elevation: 20,
  },
  feedbackTooltipArrow: {
    position: "absolute",
    top: -6,
    left: 190,
    width: 16,
    height: 16,
    backgroundColor: appPalette.yellowBright,
    transform: [{ rotate: "45deg" }],
    zIndex: 1,
  },
  feedbackTooltipContainer: {
    backgroundColor: appPalette.yellowBright,
    borderRadius: 12,
    padding: 16,
    gap: 10,
    shadowColor: appPalette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  feedbackTooltipText: {
    fontFamily: typography.fonts.manrope.bold,
    fontSize: 16,
    lineHeight: 22,
    color: appPalette.ink,
  },
  feedbackTooltipMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedbackTooltipAskedBy: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 14,
    color: appPalette.ink3,
    letterSpacing: -0.14,
  },
  feedbackTooltipTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  feedbackTooltipTime: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 14,
    color: appPalette.ink3,
    letterSpacing: -0.14,
    marginLeft: 4,
  },
  feedbackButtonWrapper: {
  },
  feedbackButtonShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -4,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 12,
  },
  feedbackButtonContainer: {
    backgroundColor: appPalette.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  feedbackButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 15,
    lineHeight: 17,
    color: appPalette.greenVivid,
    letterSpacing: 0.51,
    textTransform: "uppercase",
  },
  aiListenButtonWrapper: {
  },
  aiListenButtonShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -3,
    backgroundColor: appPalette.yellow70,
    borderRadius: 12,
  },
  aiListenButtonContainer: {
    backgroundColor: appPalette.brownOlive,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  aiListenButtonText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 15,
    lineHeight: 17,
    color: appPalette.white,
    letterSpacing: 0.51,
    textTransform: "uppercase",
  },
});
