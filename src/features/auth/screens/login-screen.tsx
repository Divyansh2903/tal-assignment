import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";

import { FlashList } from "@shopify/flash-list";

import { appPalette } from "@/constants/app-colors";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/primary-button";
import type { AuthStackParamList } from "@/navigation/types";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const OTP_LENGTH = 6;

const COUNTRIES = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}", name: "India" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { code: "+61", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { code: "+86", flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", name: "UAE" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore" },
];

export function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<(TextInput | null)[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const backspaceHandled = useRef(false);

  const isPhoneValid = phoneNumber.length === 10;
  const isOtpComplete = otp.every((digit) => digit !== "");
  const canContinue = isPhoneValid && isOtpComplete;

  const handlePhoneChange = useCallback((text: string) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ""));
  }, []);

  const handleOtpChange = useCallback(
    (text: string, index: number) => {
      if (backspaceHandled.current) {
        backspaceHandled.current = false;
        return;
      }
      const digit = text.replace(/[^0-9]/g, "");
      if (!digit && text) return;
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      if (digit && index < OTP_LENGTH - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [otp],
  );

  const handleOtpKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === "Backspace") {
        backspaceHandled.current = true;
        if (otp[index]) {
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
          if (index > 0) {
            otpRefs.current[index - 1]?.focus();
          }
        } else if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          otpRefs.current[index - 1]?.focus();
        }
      }
    },
    [otp],
  );

  const handleContinue = useCallback(() => {
    if (!canContinue) return;
    Keyboard.dismiss();
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  }, [canContinue, navigation]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top + 60 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>
          <Text style={styles.headingHighlight}>Kickstart </Text>
          your journey
        </Text>
        <Text style={styles.subtitle}>
          We will send you an OTP to verify your number.
        </Text>

        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneContainer}>
          <TouchableOpacity
            style={styles.countryCode}
            onPress={() => setShowCountryPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{selectedCountry.flag}</Text>
            <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
            <Ionicons name="chevron-down" size={14} color={appPalette.systemGray} />
          </TouchableOpacity>
          <View style={styles.phoneDivider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="8812014288"
            placeholderTextColor={appPalette.systemGray4}
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
          />
        </View>
        {phoneNumber.length > 0 && !isPhoneValid && (
          <Text style={styles.validationText}>
            Please enter a valid 10-digit mobile number.
          </Text>
        )}

        <Text style={styles.otpLabel}>Enter the OTP</Text>
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                otpRefs.current[index] = ref;
              }}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleOtpKeyPress(nativeEvent.key, index)
              }
              placeholder="-"
              placeholderTextColor={appPalette.ink}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottomActions}>
        <PrimaryButton
          label="Continue"
          onPress={handleContinue}
          disabled={!canContinue}
          size="small"
        />
      </View>
      <View style={{ height: insets.bottom || 16 }} />

      <Modal
        visible={showCountryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryPicker(false)}
        >
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select country</Text>
            <View style={{ minHeight: 300 }}>
              <FlashList
                data={COUNTRIES}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.countryRow,
                      item.code === selectedCountry.code && styles.countryRowSelected,
                    ]}
                    onPress={() => {
                      setSelectedCountry(item);
                      setShowCountryPicker(false);
                    }}
                  >
                    <Text style={styles.countryFlag}>{item.flag}</Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                    <Text style={styles.countryDialCode}>{item.code}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appPalette.white,
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 30,
    letterSpacing: -0.3,
    color: appPalette.ink,
    marginBottom: 22,
  },
  headingHighlight: {
    color: appPalette.orangeVivid,
  },
  subtitle: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: 14,
    lineHeight: 20,
    color: appPalette.ink3,
    marginBottom: spacing.xxl,
  },
  label: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 12,
    lineHeight: 16,
    color: appPalette.ink3,
    marginBottom: spacing.xs,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: appPalette.separator,
    borderRadius: spacing.inputRadius,
    overflow: "hidden",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.s,
    gap: spacing.xxs,
    height: 44,
  },
  flag: {
    fontSize: 14,
  },
  countryCodeText: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 14,
    color: appPalette.ink,
  },
  phoneDivider: {
    width: 1,
    height: 24,
    backgroundColor: appPalette.separator,
  },
  phoneInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: spacing.s,
    fontFamily: typography.fonts.inter.normal,
    fontSize: 14,
    color: appPalette.ink,
  },
  validationText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: 12,
    lineHeight: 16,
    color: appPalette.systemGray,
    marginTop: spacing.xs,
  },
  otpLabel: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 12,
    lineHeight: 16,
    color: appPalette.ink3,
    marginTop: spacing.xxl,
    marginBottom: spacing.xs,
  },
  otpRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  otpBox: {
    width: 48,
    height: 54,
    backgroundColor: appPalette.white,
    borderWidth: 1,
    borderColor: appPalette.fillSecondary,
    borderBottomWidth: 2,
    borderBottomColor: appPalette.overlayBlack10,
    borderRadius: spacing.xs,
    textAlign: "center",
    fontFamily: typography.fonts.inter.medium,
    fontSize: 20,
    color: appPalette.ink2,
  },
  otpBoxFilled: {
    backgroundColor: appPalette.fillSecondary,
    borderBottomWidth: 2,
    borderBottomColor: appPalette.overlayBlack10,
  },
  bottomActions: {
    paddingBottom: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: appPalette.overlayBlack40,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: appPalette.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: spacing.s,
    maxHeight: "60%",
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: spacing.xxxs,
    backgroundColor: appPalette.systemGray6,
    alignSelf: "center",
    marginBottom: spacing.m,
  },
  modalTitle: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    color: appPalette.ink,
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.s,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.s,
  },
  countryRowSelected: {
    backgroundColor: appPalette.fillSecondary,
  },
  countryFlag: {
    fontSize: 22,
  },
  countryName: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: 15,
    color: appPalette.ink,
  },
  countryDialCode: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 14,
    color: appPalette.systemGray,
  },
});
