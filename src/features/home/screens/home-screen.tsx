import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainTabParamList, RootStackParamList } from "@/navigation/types";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line, Rect, Path, Text as SvgText } from "react-native-svg";
import { appPalette } from "@/constants/app-colors";
import { assets } from "@/constants/assets";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const LOGO_IMAGES = assets.logos;

type CardStatus = "completed" | "current" | "locked";

interface LevelCardProps {
  id: number;
  company: string;
  logoKey?: keyof typeof assets.logos;
  fallbackIcon?: ComponentProps<typeof FontAwesome>["name"];
  fallbackColor?: string;
  status: CardStatus;
  marginLeft: number;
  showStartTooltip?: boolean;
  onPress?: () => void;
  showFeedbackTooltip?: boolean;
}

const LEVELS: LevelCardProps[] = [
  { id: 1, company: "PhonePe", logoKey: "phonepe", status: "completed", marginLeft: 48 },
  { id: 2, company: "Amazon", logoKey: "amazon", status: "current", marginLeft: 96, showStartTooltip: true },
  { id: 3, company: "PhonePe", logoKey: "phonepe", status: "locked", marginLeft: 144 },
  { id: 4, company: "Google", logoKey: "google", status: "locked", marginLeft: 144 },
  { id: 5, company: "Microsoft", logoKey: "microsoft", status: "locked", marginLeft: 96 },
  { id: 6, company: "Facebook", fallbackIcon: "facebook", fallbackColor: appPalette.facebookBlue, status: "locked", marginLeft: 48 },
  { id: 7, company: "Amazon", logoKey: "amazon", status: "locked", marginLeft: 48 },
  { id: 8, company: "Facebook", fallbackIcon: "facebook", fallbackColor: appPalette.facebookBlue, status: "locked", marginLeft: 96 },
];

function TopHeader() {
  return (
    <View style={styles.headerContainer}>
      <MaskedView maskElement={<Text style={styles.headerTitle}>Ready!</Text>}>
        <LinearGradient colors={[appPalette.orangeVivid, appPalette.orangeRed]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
          <Text style={[styles.headerTitle, { opacity: 0 }]}>Ready!</Text>
        </LinearGradient>
      </MaskedView>
      <View style={styles.headerRight}>
        <View style={styles.energyPillShadow}>
          <TouchableOpacity style={styles.energyPill}>
            <Ionicons name="flash" size={16} color={appPalette.white} />
            <Text style={styles.energyText}>8</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={appPalette.midGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StickyBanner() {
  return (
    <View style={styles.bannerWrapper}>
      <Pressable style={({pressed}) => [styles.bannerShadow, pressed && { paddingBottom: 0, marginTop: spacing.xxs }]}>
        <View style={styles.bannerContainer}>
          <Image source={assets.images.body} style={styles.bannerImage} contentFit="contain" cachePolicy="memory-disk" />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerSubtitle}>Practicing Top 50 Questions for</Text>
            <Text style={styles.bannerTitle}>Big Tech Companies</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={appPalette.darkGray} />
        </View>
      </Pressable>
    </View>
  );
}

function LevelCard({ id, company, logoKey, fallbackIcon, fallbackColor, status, marginLeft, showStartTooltip, onPress, showFeedbackTooltip }: LevelCardProps) {
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
              <View style={styles.feedbackTooltipTimeContainer}>
                <Ionicons name="timer-outline" size={14} color={appPalette.ink} />
                <Text style={styles.feedbackTooltipTime}>2 mins</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.feedbackButtonWrapper} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SessionResult", { questionId: String(id) })}
            >
              <View style={styles.feedbackButtonShadow} />
              <View style={styles.feedbackButtonContainer}>
                <Text style={styles.feedbackButtonText}>FEEDBACK</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.aiListenButtonWrapper} 
              activeOpacity={0.8}
            >
              <View style={styles.aiListenButtonShadow} />
              <View style={styles.aiListenButtonContainer}>
                <Ionicons name="headset" size={16} color={appPalette.white} style={{marginRight: 6}} />
                <Text style={styles.aiListenButtonText}>AI VS AI (LISTEN)</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Pressable onPress={onPress} style={({pressed}) => [{ 
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
                <Image source={LOGO_IMAGES[logoKey]} style={styles.logoImage} contentFit="contain" cachePolicy="memory-disk" />
              ) : (
                <FontAwesome name={fallbackIcon} size={14} color={fallbackColor} />
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

function MilestoneDivider() {
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

function BottomNav() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  
  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNavShadow}>
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
            <Image source={assets.icons.home} style={styles.navIcon} contentFit="contain" cachePolicy="memory-disk" />
            <Text style={[styles.navText, { color: appPalette.orangeAlt }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Settings")}>
            <Image source={assets.icons.settings} style={styles.navIcon} contentFit="contain" cachePolicy="memory-disk" />
            <Text style={[styles.navText, { color: appPalette.ink4 }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.navItemActiveWrapper}>
        <Pressable style={({pressed}) => [styles.navItemActiveShadow, pressed && { paddingBottom: 0, marginTop: spacing.xxs }]} onPress={() => navigation.navigate("Store")}>
          <View style={styles.navItemActive}>
            <View>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: appPalette.blueWash, borderRadius: 34, overflow: "hidden" }]}>
                <Svg width="68" height="68" viewBox="0 0 68 68" fill="none">
                  <Rect x="-15" y="-20" width="16" height="120" transform="rotate(30 -15 -20)" fill="white" fillOpacity={0.4} />
                  <Rect x="15" y="-20" width="16" height="120" transform="rotate(30 15 -20)" fill="white" fillOpacity={0.4} />
                  <Rect x="45" y="-20" width="16" height="120" transform="rotate(30 45 -20)" fill="white" fillOpacity={0.4} />
                </Svg>
              </View>
            </View>
            <Image source={assets.icons.store} style={[styles.navIcon, { zIndex: 2, marginBottom: spacing.xxxs }]} contentFit="contain" cachePolicy="memory-disk" />
            <Text style={[styles.navText, { color: appPalette.ink4, zIndex: 2 }]}>Store</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={appPalette.white} />

      <TopHeader />
      <StickyBanner />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setActiveCardId(null)}
      >
        <Pressable style={styles.pathContainer} onPress={() => setActiveCardId(null)}>
          {LEVELS.slice(0, 3).map((level) => (
            <LevelCard
              key={level.id}
              {...level}
              onPress={() => {
                if (level.id === 1) {
                  setActiveCardId(activeCardId === level.id ? null : level.id);
                } else {
                  setActiveCardId(null);
                }
              }}
              showFeedbackTooltip={activeCardId === 1 && level.id === 1}
            />
          ))}

          <MilestoneDivider />

          {LEVELS.slice(3).map((level) => (
            <LevelCard key={level.id} {...level} onPress={() => setActiveCardId(null)} />
          ))}

          <View style={{ height: 120 }} />
        </Pressable>
      </ScrollView>
      
      <LinearGradient
        colors={[appPalette.overlayWhite0, appPalette.overlayWhite85, appPalette.white]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appPalette.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
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
  bannerWrapper: {
    backgroundColor: appPalette.white,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.xxs,
  },
  bannerShadow: {
    backgroundColor: appPalette.gold,
    borderRadius: spacing.cardRadius,
    paddingBottom: spacing.xxs,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appPalette.yellowWash,
    borderRadius: spacing.cardRadius,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    gap: spacing.s,
  },
  bannerImage: {
    width: 40,
    height: 40,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerSubtitle: {
    fontFamily: typography.fonts.manrope.medium,
    fontSize: 14,
    lineHeight: 20,
    color: appPalette.gray60,
  },
  bannerTitle: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: appPalette.ink,
    marginTop: spacing.xxxs,
  },
  pathContainer: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.m,
  },
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
  numberText: {
    fontFamily: typography.fonts.manrope.bold,
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: "center",
    zIndex: 2,
  },
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
  bottomNavWrapper: {
    position: "absolute",
    bottom: Platform.OS === 'ios' ? 40 : 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    zIndex: 5,
  },
  bottomNavShadow: {
    backgroundColor: appPalette.separator,
    borderRadius: 99999,
    paddingBottom: spacing.xxs,
    height: 72,
  },
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.m,
    gap: spacing.xl,
    width: 172,
    height: 68,
    backgroundColor: appPalette.white,
    borderWidth: 1,
    borderColor: appPalette.separator,
    borderRadius: 99999,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
  },
  navItemActiveWrapper: {
    marginLeft: spacing.s,
  },
  navItemActiveShadow: {
    backgroundColor: appPalette.blueLight,
    borderRadius: 34,
    paddingBottom: spacing.xxs,
    height: 72,
    width: 68,
  },
  navItemActive: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: appPalette.blueLight,
    backgroundColor: appPalette.blueWash,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 12,
    marginTop: spacing.xxs,
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
