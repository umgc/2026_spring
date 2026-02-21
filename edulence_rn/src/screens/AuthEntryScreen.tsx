import React, { useCallback, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useAuthActions, useAuthState } from "../store/useAppStore";
import { spacing } from "../theme/spacing";
import { useAppTheme } from "../theme/useAppTheme";

export function AuthEntryScreen(): React.JSX.Element {
  const { palette, fontScale, textAlign } = useAppTheme();
  const { authError } = useAuthState();
  const { signIn, signUp, continueAsGuest, clearAuthError } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@edulence.app");
  const [password, setPassword] = useState("demo1234");

  const helperText = useMemo(
    () => "Demo account: demo@edulence.app / demo1234",
    [],
  );

  const onSignIn = useCallback(() => {
    const result = signIn(email, password);
    if (!result.success) {
      continueAsGuest(name, email);
    }
  }, [continueAsGuest, email, name, password, signIn]);

  const onSignUp = useCallback(() => {
    const result = signUp(name, email, password);
    if (!result.success) {
      continueAsGuest(name, email);
    }
  }, [continueAsGuest, email, name, password, signUp]);

  const onChangeName = useCallback(
    (value: string) => {
      clearAuthError();
      setName(value);
    },
    [clearAuthError],
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      clearAuthError();
      setEmail(value);
    },
    [clearAuthError],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      clearAuthError();
      setPassword(value);
    },
    [clearAuthError],
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: palette.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        >
          <Text
            accessibilityRole="header"
            style={[
              styles.title,
              {
                color: palette.textPrimary,
                fontSize: 32 * fontScale,
                textAlign,
              },
            ]}
          >
            Welcome to EduLense
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: palette.textSecondary,
                fontSize: 16 * fontScale,
                textAlign,
              },
            ]}
          >
            Sign in to continue your learning journey.
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: palette.surface, borderColor: palette.border },
            ]}
          >
            <TextInput
              accessible
              accessibilityLabel="Name"
              accessibilityHint="Enter your full name for sign up"
              placeholder="Full name"
              placeholderTextColor={palette.textSecondary}
              value={name}
              onChangeText={onChangeName}
              returnKeyType="next"
              style={[
                styles.input,
                {
                  borderColor: palette.border,
                  color: palette.textPrimary,
                  textAlign,
                  fontSize: 15 * fontScale,
                },
              ]}
            />
            <TextInput
              accessible
              accessibilityLabel="Email"
              accessibilityHint="Enter your email address"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Email"
              placeholderTextColor={palette.textSecondary}
              value={email}
              onChangeText={onChangeEmail}
              returnKeyType="next"
              style={[
                styles.input,
                {
                  borderColor: palette.border,
                  color: palette.textPrimary,
                  textAlign,
                  fontSize: 15 * fontScale,
                },
              ]}
            />
            <TextInput
              accessible
              accessibilityLabel="Password"
              accessibilityHint="Enter your password"
              secureTextEntry
              textContentType="password"
              placeholder="Password"
              placeholderTextColor={palette.textSecondary}
              value={password}
              onChangeText={onChangePassword}
              returnKeyType={Platform.OS === "ios" ? "go" : "done"}
              onSubmitEditing={onSignIn}
              style={[
                styles.input,
                {
                  borderColor: palette.border,
                  color: palette.textPrimary,
                  textAlign,
                  fontSize: 15 * fontScale,
                },
              ]}
            />

            <Text
              style={[
                styles.helper,
                {
                  color: palette.textSecondary,
                  fontSize: 12 * fontScale,
                  textAlign,
                },
              ]}
            >
              {helperText}
            </Text>

            {authError ? (
              <Text
                accessible
                accessibilityRole="alert"
                style={[
                  styles.errorText,
                  { fontSize: 13 * fontScale, textAlign },
                ]}
              >
                {authError}
              </Text>
            ) : null}

            <Pressable
              accessible
              accessibilityRole="button"
              accessibilityLabel="Sign in to EduLense"
              accessibilityHint="Opens your learning dashboard"
              onPress={onSignIn}
              android_ripple={{ color: "rgba(255,255,255,0.2)" }}
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: palette.accent,
                  opacity: pressed && Platform.OS === "ios" ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[styles.primaryButtonText, { fontSize: 16 * fontScale }]}
              >
                Sign In
              </Text>
            </Pressable>

            <Pressable
              accessible
              accessibilityRole="button"
              accessibilityLabel="Create a new EduLense account"
              accessibilityHint="Starts account registration"
              onPress={onSignUp}
              android_ripple={{ color: "rgba(0,0,0,0.08)" }}
              style={({ pressed }) => [
                styles.secondaryButton,
                {
                  borderColor: palette.accent,
                  opacity: pressed && Platform.OS === "ios" ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  { color: palette.accent, fontSize: 16 * fontScale },
                ]}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
  },
  subtitle: {
    lineHeight: 24,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
  },
  helper: {
    marginTop: -4,
  },
  errorText: {
    color: "#D32F2F",
    fontWeight: "600",
  },
  primaryButton: {
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    overflow: "hidden",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  secondaryButton: {
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    overflow: "hidden",
  },
  secondaryButtonText: {
    fontWeight: "700",
  },
});
