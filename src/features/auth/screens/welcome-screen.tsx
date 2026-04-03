import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import { FullLogo } from "@/components/ui/full-logo";
import { AmazonLogo } from "@/components/ui/amazon-logo";
import { GoogleLogo } from "@/components/ui/google-logo";
import { SwiggyLogo } from "@/components/ui/swiggy-logo";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/components/ui/primary-button";
import { ZomatoLogo } from "@/components/ui/zomato-logo";
import type { AuthStackParamList } from "@/navigation/types";
import { appPalette } from "@/constants/app-colors";
import { assets } from "@/constants/assets";
import { colors } from "@/theme/colors";
import { textStyles, typography } from "@/theme/typography";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const FIGMA_HEIGHT = 852;
const scale = SCREEN_HEIGHT / FIGMA_HEIGHT;

const videoSource = assets.images.containerVideo;

const COMPANY_LOGOS = [
  { id: "swiggy", source: null, left: 9, top: 13, fill: true, svg: true },
  { id: "microsoft", source: assets.logos.microsoft, left: 166, top: -16, fill: false, svg: false },
  { id: "google", source: null, left: 226, top: 88, fill: false, svg: true },
  { id: "amazon", source: null, left: -17, top: 148, fill: false, svg: true },
  { id: "zomato", source: null, left: 166, top: 210, fill: true, svg: true },
];

export function WelcomeScreen({ navigation }: Props) {
  const isFocused = useIsFocused();
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={styles.container}>
      <View style={[styles.headerLogo, { top: 78 * scale }]}>
        <FullLogo width={138} height={46} />
      </View>

      <View style={[styles.heroContainer, { top: (FIGMA_HEIGHT / 2 - 330 / 2 - 29) * scale }]}>
        <View style={styles.imageContainer}>
          <View style={styles.videoCircle}>
            {isFocused && (
              <VideoView
                player={player}
                style={styles.video}
                contentFit="cover"
                nativeControls={false}
              />
            )}
          </View>
          {COMPANY_LOGOS.map((logo) => (
            <View
              key={logo.id}
              style={[styles.companyLogo, { left: logo.left, top: logo.top }]}
            >
              {logo.svg && logo.id === "zomato" ? (
                <ZomatoLogo size={44} />
              ) : logo.svg && logo.id === "google" ? (
                <GoogleLogo size={28} />
              ) : logo.svg && logo.id === "amazon" ? (
                <AmazonLogo size={28} />
              ) : logo.svg && logo.id === "swiggy" ? (
                <SwiggyLogo size={44} />
              ) : (
                <Image
                  source={logo.source}
                  style={logo.fill ? styles.logoImageFill : styles.logoImageIcon}
                  contentFit={logo.fill ? "cover" : "contain"}
                  cachePolicy="memory-disk"
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>Practice Top Interview</Text>
          <Text style={styles.tagline}>
            Questions <Text style={styles.taglineHighlight}>with AI</Text>
          </Text>
        </View>
      </View>

      <View style={[styles.buttonContainer, { bottom: 124 * scale }]}>
        <PrimaryButton
          label="Let's go"
          leftIcon="checkmark-circle-outline"
          onPress={() => navigation.navigate("Login")}
        />
      </View>

      <Text style={[styles.termsText, { bottom: 50 * scale }]}>
        By continuing, you acknowledge agreeing to our{"\n"}
        <Text style={styles.termsLink}>terms of service</Text> and{" "}
        <Text style={styles.termsLink}>privacy policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerLogo: {
    position: "absolute",
    width: 138,
    height: 46,
    alignSelf: "center",
    left: "50%",
    marginLeft: -69,
  },
  heroContainer: {
    position: "absolute",
    width: 348,
    height: 330,
    alignSelf: "center",
    left: "50%",
    marginLeft: -174,
    alignItems: "center",
    gap: 32,
  },
  imageContainer: {
    width: 250,
    height: 250,
  },
  videoCircle: {
    width: 250,
    height: 250,
    borderRadius: 99999,
    overflow: "hidden",
  },
  video: {
    width: 250,
    height: 250,
  },
  companyLogo: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 1000,
    backgroundColor: appPalette.white,
    borderWidth: 2,
    borderColor: appPalette.tealBorder,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImageFill: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  logoImageIcon: {
    width: 28,
    height: 28,
  },
  taglineContainer: {
    width: 348,
    alignItems: "center",
  },
  tagline: {
    ...textStyles.headingLarge,
    textAlign: "center",
    color: appPalette.ink,
  },
  taglineHighlight: {
    color: colors.primary,
  },
  buttonContainer: {
    position: "absolute",
    left: 24,
    right: 24,
  },
  termsText: {
    position: "absolute",
    left: 24,
    right: 24,
    fontFamily: typography.fonts.inter.normal,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    textAlign: "center",
    color: appPalette.inkMuted,
  },
  termsLink: {
    textDecorationLine: "underline",
  },
});
