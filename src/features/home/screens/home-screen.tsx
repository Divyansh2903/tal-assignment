import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

const LOGO_IMAGES: Record<string, any> = {
  amazon: require("../../../../assets/amazon.png"),
  google: require("../../../../assets/google.png"),
  microsoft: require("../../../../assets/microsoft.png"),
  swiggy: require("../../../../assets/swiggy.png"),
  zomato: require("../../../../assets/zomato.png"),
};

type CardStatus = "completed" | "current" | "locked";

interface LevelCardProps {
  id: number;
  company: string;
  logoKey?: string;
  fallbackIcon?: string;
  fallbackColor?: string;
  status: CardStatus;
  marginLeft: number;
  showStartTooltip?: boolean;
}

const LEVELS: LevelCardProps[] = [
  { id: 1, company: "PhonePe", fallbackIcon: "rupee", fallbackColor: "#673AB7", status: "completed", marginLeft: 48 },
  { id: 2, company: "Amazon", logoKey: "amazon", status: "current", marginLeft: 96, showStartTooltip: true },
  { id: 3, company: "PhonePe", fallbackIcon: "rupee", fallbackColor: "#673AB7", status: "locked", marginLeft: 144 },
  { id: 4, company: "Google", logoKey: "google", status: "locked", marginLeft: 144 },
  { id: 5, company: "Microsoft", logoKey: "microsoft", status: "locked", marginLeft: 96 },
  { id: 6, company: "Facebook", fallbackIcon: "facebook", fallbackColor: "#1877F2", status: "locked", marginLeft: 48 },
  { id: 7, company: "Amazon", logoKey: "amazon", status: "locked", marginLeft: 48 },
  { id: 8, company: "Facebook", fallbackIcon: "facebook", fallbackColor: "#1877F2", status: "locked", marginLeft: 96 },
];

function TopHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Ready!</Text>
      <View style={styles.headerRight}>
        <Pressable style={({pressed}) => [styles.energyPillShadow, pressed && { paddingBottom: 0, marginTop: 4 }]}>
          <View style={styles.energyPill}>
            <Ionicons name="flash" size={16} color="#FFF" />
            <Text style={styles.energyText}>8</Text>
          </View>
        </Pressable>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StickyBanner() {
  return (
    <View style={styles.bannerWrapper}>
      <Pressable style={({pressed}) => [styles.bannerShadow, pressed && { paddingBottom: 0, marginTop: 4 }]}>
        <View style={styles.bannerContainer}>
          <Image source={require("../../../../assets/body.png")} style={styles.bannerImage} contentFit="contain" />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerSubtitle}>Practicing Top 50 Questions for</Text>
            <Text style={styles.bannerTitle}>Big Tech Companies</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </View>
      </Pressable>
    </View>
  );
}

function LevelCard({ id, company, logoKey, fallbackIcon, fallbackColor, status, marginLeft, showStartTooltip }: LevelCardProps) {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  const bgColor = isCompleted ? "#D0F8BC" : isCurrent ? "#FFEFB9" : "#EFEFF4";
  const shadowColor = isCompleted ? "#00AD00" : isCurrent ? "#CA9100" : "#8E8E93";
  const numberColor = isCompleted ? "#FFF" : isCurrent ? "#FFF" : "#FFFFFF";
  const textColor = "#1C1C1E";
  const numberTextStroke = isLocked ? "#4A4A4A" : "transparent";
  
  const innerBorderWidth = 0;
  const innerBorderColor = "transparent";

  return (
    <View style={[styles.cardWrapper, { marginLeft, alignSelf: "flex-start", zIndex: showStartTooltip ? 10 : 1 }]}>
      {showStartTooltip && (
        <View style={styles.tooltipWrapper}>
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>START</Text>
            <View style={styles.tooltipArrow} />
          </View>
        </View>
      )}

      <Pressable style={({pressed}) => [{ 
          borderRadius: 30, 
          backgroundColor: shadowColor, 
          paddingBottom: 8,
          width: 206
      }, pressed && { paddingBottom: 0, marginTop: 8 }]}>
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
                <Svg width="196" height="73" viewBox="0 0 196 73" fill="none">
                  <Rect x="-10.15" y="-12.71" width="20" height="68" transform="rotate(45 -10.15 -12.71)" fill="white" fillOpacity={0.4} />
                  <Rect x="8" y="-11" width="20" height="100" transform="rotate(45 8 -11)" fill="white" fillOpacity={0.4} />
                </Svg>
            </View>
          )}

          <View style={{ 
              flex: 1,
              flexDirection: "row", 
              alignItems: "center", 
              paddingLeft: 20, 
              paddingRight: 8,
              height: 73,
          }}>
            <Text style={[styles.companyText, { color: textColor }]}>{company}</Text>
            <View style={[styles.iconCircle, { 
              marginLeft: 4, 
              borderWidth: 0.68,
              borderColor: isCompleted ? "#D0F8BC" : isCurrent ? "#FFEFB9" : "#D1D1D6",
            }]}>
              {logoKey && LOGO_IMAGES[logoKey] ? (
                <Image source={LOGO_IMAGES[logoKey]} style={styles.logoImage} contentFit="contain" />
              ) : (
                <FontAwesome name={fallbackIcon as any} size={14} color={fallbackColor} />
              )}
            </View>
          </View>

            <View style={{ 
              width: 74, 
              height: 74, 
              borderRadius: 30, 
              backgroundColor: isCompleted ? "#51D900" : isCurrent ? "#FFCE00" : "#D1D1D6", 
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
                backgroundColor: isCompleted ? "#7BE047" : isCurrent ? "#FFCE00" : "#D1D1D6",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}>
              {!isLocked && (
                <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}>
                  <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <Rect x="-8.81" y="-11.23" width="18" height="67.44" transform="rotate(30 -8.81 -11.23)" fill="white" fillOpacity={0.4} />
                    <Rect x="7.94" y="-2.05" width="18" height="82.77" transform="rotate(30 7.94 -2.05)" fill="white" fillOpacity={0.4} />
                  </Svg>
                </View>
              )}
            </View>
            
            <View style={{ position: "absolute", zIndex: 2, alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.numberText, { color: numberColor, 
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: -2, height: 2},
                 textShadowRadius: 0
              }]}>{id}</Text>
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: 2, height: 2},
                 textShadowRadius: 0
              }]}>{id}</Text>
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: 2, height: -2},
                 textShadowRadius: 0
              }]}>{id}</Text>
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: -2, height: -2},
                 textShadowRadius: 0
              }]}>{id}</Text>
              
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: 0, height: 2},
                 textShadowRadius: 0
              }]}>{id}</Text>
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: 0, height: -2},
                 textShadowRadius: 0
              }]}>{id}</Text>
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: 2, height: 0},
                 textShadowRadius: 0
              }]}>{id}</Text>
              <Text style={[styles.numberText, { color: numberColor, position: 'absolute',
                 textShadowColor: '#00000099',
                 textShadowOffset: {width: -2, height: 0},
                 textShadowRadius: 0
              }]}>{id}</Text>
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
      <View style={styles.dottedLineContainer}>
        <Svg height="2" width="100%">
          <Line x1="0" y1="1" x2="100%" y2="1" stroke="#D4B04C" strokeWidth="1.5" strokeDasharray="6, 6" />
        </Svg>
      </View>
      <View style={styles.milestoneContent}>
        <FontAwesome name="flag" size={14} color="#C8A232" />
        <Text style={styles.milestoneText}>2,312 users completed Question 3 today</Text>
        <FontAwesome name="flag" size={14} color="#C8A232" style={{ transform: [{ scaleX: -1 }] }} />
      </View>
    </View>
  );
}

function BottomNav() {
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNavShadow}>
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={24} color="#FF6B00" />
            <Text style={[styles.navText, { color: "#FF6B00" }]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="easel-outline" size={24} color="#4A4A4A" />
            <Text style={[styles.navText, { color: "#4A4A4A" }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.navItemActiveWrapper}>
        <Pressable style={({pressed}) => [styles.navItemActiveShadow, pressed && { paddingBottom: 0, marginTop: 4 }]} onPress={() => navigation.navigate("Store")}>
          <View style={styles.navItemActive}>
            <View style={styles.svgPaddingContainer}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: "#E5F2FF", borderRadius: 34, overflow: "hidden" }]}>
                <Svg width="68" height="68" viewBox="0 0 68 68" fill="none" style={styles.svgAbsoluteInner}>
                  <Rect x="-15" y="-20" width="16" height="120" transform="rotate(30 -15 -20)" fill="white" fillOpacity={0.4} />
                  <Rect x="15" y="-20" width="16" height="120" transform="rotate(30 15 -20)" fill="white" fillOpacity={0.4} />
                  <Rect x="45" y="-20" width="16" height="120" transform="rotate(30 45 -20)" fill="white" fillOpacity={0.4} />
                </Svg>
              </View>
            </View>
            <FontAwesome5 name="shopping-bag" size={22} color="#1A2B4C" style={{ zIndex: 2, marginBottom: 2 }} />
            <Text style={[styles.navText, { color: "#4A4A4A", zIndex: 2 }]}>Store</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <TopHeader />
      <StickyBanner />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pathContainer}>
          {LEVELS.slice(0, 3).map((level) => (
            <LevelCard key={level.id} {...level} />
          ))}

          <MilestoneDivider />

          {LEVELS.slice(3).map((level) => (
            <LevelCard key={level.id} {...level} />
          ))}

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
      
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,1)']}
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
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: "Onest_800ExtraBold",
    fontSize: 24,
    color: "#FF6D00",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  energyPillShadow: {
    backgroundColor: "#22C55E",
    borderRadius: 14,
    paddingBottom: 4,
  },
  energyPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#57D997",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 2,
  },
  energyText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerWrapper: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bannerShadow: {
    backgroundColor: "#D4B04C",
    borderRadius: 16,
    paddingBottom: 4,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6D9",
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  bannerImage: {
    width: 32,
    height: 32,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#6B7280",
  },
  bannerTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#1C1C1E",
    marginTop: 2,
  },
  pathContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  tooltipWrapper: {
    position: "absolute",
    top: -34,
    right: -8,
    width: 74,
    alignItems: "center",
    zIndex: 10,
    elevation: 10,
  },
  tooltipContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tooltipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: "#22C55E",
    letterSpacing: 1,
  },
  tooltipArrow: {
    position: "absolute",
    bottom: -4,
    alignSelf: "center",
    width: 8,
    height: 8,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
  },
  companyText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#1C1C1E",
    marginRight: 0,
    letterSpacing: -0.16,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 16,
    height: 16,
  },
  numberText: {
    fontFamily: "Manrope",
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: "center",
    zIndex: 2,
  },
  milestoneWrapper: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  milestoneContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    zIndex: 2,
  },
  milestoneText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#D4B04C",
  },
  dottedLineContainer: {
    position: "absolute",
    width: "100%",
    top: "50%",
    marginTop: -1,
    zIndex: 1,
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
    backgroundColor: "#EFEFF4",
    borderRadius: 99999,
    paddingBottom: 4, 
    height: 72,
  },
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 16,
    gap: 24,
    width: 172,
    height: 68,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFEFF4",
    borderRadius: 99999,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
  },
  navItemActiveWrapper: {
    marginLeft: 12, 
  },
  navItemActiveShadow: {
    backgroundColor: "#B2D9FF",
    borderRadius: 34,
    paddingBottom: 4,
    height: 72,
    width: 68,
  },
  navItemActive: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: "#B2D9FF",
    backgroundColor: "#E5F2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    marginTop: 4,
  },
});
