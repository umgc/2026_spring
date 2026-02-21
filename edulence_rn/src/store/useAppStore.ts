import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type ThemeMode = "light" | "dark" | "system";

type UserRecord = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  name: string;
  email: string;
};

type AuthResult = {
  success: boolean;
  message?: string;
};

type AppState = {
  themeMode: ThemeMode;
  leftHandedMode: boolean;
  largeText: boolean;
  highContrast: boolean;
  users: UserRecord[];
  currentUser: AuthUser | null;
  authError: string | null;
  setThemeMode: (value: ThemeMode) => void;
  setLeftHandedMode: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  clearAuthError: () => void;
  signIn: (email: string, password: string) => AuthResult;
  signUp: (name: string, email: string, password: string) => AuthResult;
  continueAsGuest: (name?: string, email?: string) => void;
  signOut: () => void;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const useAppStore = create<AppState>((set, get) => ({
  themeMode: "system",
  leftHandedMode: true,
  largeText: false,
  highContrast: false,
  users: [
    {
      name: "Demo Student",
      email: "demo@edulence.app",
      password: "demo1234",
    },
  ],
  currentUser: null,
  authError: null,
  setThemeMode: (value) => {
    set({ themeMode: value });
  },
  setLeftHandedMode: (value) => {
    set({ leftHandedMode: value });
  },
  setLargeText: (value) => {
    set({ largeText: value });
  },
  setHighContrast: (value) => {
    set({ highContrast: value });
  },
  clearAuthError: () => {
    set({ authError: null });
  },
  signIn: (email, password) => {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      const message = "Email and password are required.";
      set({ authError: message });
      return { success: false, message };
    }

    const user = get().users.find(
      (candidate) =>
        normalizeEmail(candidate.email) === normalizedEmail &&
        candidate.password === password,
    );

    if (!user) {
      const message = "Invalid email or password.";
      set({ authError: message });
      return { success: false, message };
    }

    set({
      currentUser: { name: user.name, email: user.email },
      authError: null,
    });
    return { success: true };
  },
  signUp: (name, email, password) => {
    const trimmedName = name.trim();
    const normalizedEmail = normalizeEmail(email);

    if (!trimmedName || !normalizedEmail || !password) {
      const message = "Name, email, and password are required.";
      set({ authError: message });
      return { success: false, message };
    }

    if (password.length < 6) {
      const message = "Password must be at least 6 characters.";
      set({ authError: message });
      return { success: false, message };
    }

    const alreadyExists = get().users.some(
      (candidate) => normalizeEmail(candidate.email) === normalizedEmail,
    );

    if (alreadyExists) {
      const message = "An account with this email already exists.";
      set({ authError: message });
      return { success: false, message };
    }

    const newUser: UserRecord = {
      name: trimmedName,
      email: normalizedEmail,
      password,
    };

    set((state) => ({
      users: [...state.users, newUser],
      currentUser: { name: newUser.name, email: newUser.email },
      authError: null,
    }));

    return { success: true };
  },
  continueAsGuest: (name, email) => {
    const guestName = name?.trim() ?? "Guest Student";
    const guestEmail = normalizeEmail(email ?? "guest@edulence.app");
    set({
      currentUser: { name: guestName, email: guestEmail },
      authError: null,
    });
  },
  signOut: () => {
    set({ currentUser: null, authError: null });
  },
}));

// Selector hooks keep component subscriptions narrow and reduce re-renders.
export function useAuthState() {
  return useAppStore(
    useShallow((state) => ({
      currentUser: state.currentUser,
      authError: state.authError,
      users: state.users,
    })),
  );
}

export function useAuthActions() {
  return useAppStore(
    useShallow((state) => ({
      signIn: state.signIn,
      signUp: state.signUp,
      continueAsGuest: state.continueAsGuest,
      signOut: state.signOut,
      clearAuthError: state.clearAuthError,
    })),
  );
}

export function useThemePreferences() {
  return useAppStore(
    useShallow((state) => ({
      themeMode: state.themeMode,
      leftHandedMode: state.leftHandedMode,
      largeText: state.largeText,
      highContrast: state.highContrast,
    })),
  );
}

export function useThemeActions() {
  return useAppStore(
    useShallow((state) => ({
      setThemeMode: state.setThemeMode,
      setLeftHandedMode: state.setLeftHandedMode,
      setLargeText: state.setLargeText,
      setHighContrast: state.setHighContrast,
    })),
  );
}
