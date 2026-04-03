import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
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
      style={[styles.container, { paddingTop: insets.top + 40 }]}
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
            <Ionicons name="chevron-down" size={14} color="#8E8E93" />
          </TouchableOpacity>
          <View style={styles.phoneDivider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="8812014288"
            placeholderTextColor="#C7C7CC"
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
      <View style={{ height: insets.bottom + 16 }} />

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
            <FlatList
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
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontFamily: typography.fonts.manrope.semiBold,
    fontSize: 30,
    letterSpacing: -0.3,
    color: "#1C1C1E",
    marginBottom: 22,
  },
  headingHighlight: {
    color: "#FF6D00",
  },
  subtitle: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: 14,
    lineHeight: 20,
    color: "#48484A",
    marginBottom:32,
  },
  label: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 12,
    lineHeight: 16,
    color: "#48484A",
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: "#EFEFF4",
    borderRadius: 12,
    overflow: "hidden",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
    height: 44,
  },
  flag: {
    fontSize: 18,
  },
  countryCodeText: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 14,
    color: "#1C1C1E",
  },
  phoneDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#EFEFF4",
  },
  phoneInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontFamily: typography.fonts.inter.normal,
    fontSize: 14,
    color: "#1C1C1E",
  },
  validationText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: 12,
    lineHeight: 16,
    color: "#8E8E93",
    marginTop: 4,
  },
  otpLabel: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 12,
    lineHeight: 16,
    color: "#48484A",
    marginTop: 32,
    marginBottom: 8,
  },
  otpRow: {
    flexDirection: "row",
    gap: 8,
  },
  otpBox: {
    width: 44,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    textAlign: "center",
    fontFamily: typography.fonts.inter.medium,
    fontSize: 20,
    color: "#2C2C2E",
  },
  otpBoxFilled: {
    backgroundColor: "#F5F5F8",
    borderColor: "transparent",
  },
  bottomActions: {
    paddingBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    maxHeight: "60%",
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E5EA",
    alignSelf: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    color: "#1C1C1E",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  countryRowSelected: {
    backgroundColor: "#F5F5F8",
  },
  countryFlag: {
    fontSize: 22,
  },
  countryName: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: 15,
    color: "#1C1C1E",
  },
  countryDialCode: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 14,
    color: "#8E8E93",
  },
});
