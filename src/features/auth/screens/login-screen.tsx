import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";

import { appPalette } from "@/constants/app-colors";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/ui/primary-button";
import type { AuthStackParamList } from "@/navigation/types";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

import { CountryPickerModal } from "../components/country-picker-modal";
import { OtpInput } from "../components/otp-input";
import { COUNTRIES } from "../data/countries";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const OTP_LENGTH = 6;

export function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const isPhoneValid = phoneNumber.length === 10;
  const isOtpComplete = otp.every((digit) => digit !== "");
  const canContinue = isPhoneValid && isOtpComplete;

  const handlePhoneChange = useCallback((text: string) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ""));
  }, []);

  const showToast = useCallback((message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("", message);
    }
  }, []);

  const handleContinue = useCallback(() => {
    if (!isPhoneValid) {
      showToast("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!isOtpComplete) {
      showToast("Please enter the complete 6-digit OTP.");
      return;
    }
    Keyboard.dismiss();
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  }, [isPhoneValid, isOtpComplete, showToast, navigation]);

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
            accessibilityLabel="Select country code"
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
            accessibilityLabel="Phone number"
          />
        </View>
        {phoneNumber.length > 0 && !isPhoneValid && (
          <Text style={styles.validationText}>
            Please enter a valid 10-digit mobile number.
          </Text>
        )}

        <OtpInput otp={otp} onOtpChange={setOtp} />
      </View>

      <View style={styles.bottomActions}>
        <PrimaryButton
          label="Continue"
          onPress={handleContinue}
          size="small"
        />
      </View>
      <View style={{ height: 16 }} />

      <CountryPickerModal
        visible={showCountryPicker}
        selectedCode={selectedCountry.code}
        countries={COUNTRIES}
        onSelect={(country) => {
          setSelectedCountry(country);
          setShowCountryPicker(false);
        }}
        onClose={() => setShowCountryPicker(false)}
      />
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
  bottomActions: {
    paddingBottom: 0,
  },
});
