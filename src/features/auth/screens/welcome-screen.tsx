import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/components/ui/primary-button";
import type { AuthStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { textStyles, typography } from "@/theme/typography";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const FIGMA_HEIGHT = 852;
const scale = SCREEN_HEIGHT / FIGMA_HEIGHT;

const videoSource = require("../../../../assets/container_video.mp4");

const COMPANY_LOGOS = [
  { id: "swiggy", source: require("../../../../assets/swiggy.png"), left: 9, top: 13, fill: true },
  { id: "microsoft", source: require("../../../../assets/microsoft.png"), left: 166, top: -16, fill: false },
  { id: "google", source: require("../../../../assets/google.png"), left: 226, top: 88, fill: false },
  { id: "amazon", source: require("../../../../assets/amazon.png"), left: -17, top: 148, fill: false },
  { id: "zomato", source: require("../../../../assets/zomato.png"), left: 166, top: 210, fill: true },
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
      <Image
        source={require("../../../../assets/full_logo.png")}
        style={[styles.headerLogo, { top: 78 * scale }]}
        contentFit="contain"
      />

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
              <Image
                source={logo.source}
                style={logo.fill ? styles.logoImageFill : styles.logoImageIcon}
                contentFit={logo.fill ? "cover" : "contain"}
              />
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
    gap: 18,
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
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E3F3F0",
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
    color: "#1C1C1E",
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
    color: "#6C6C70",
  },
  termsLink: {
    textDecorationLine: "underline",
  },
});
