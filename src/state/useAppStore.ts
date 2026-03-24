import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { appMeta, initialCourses, initialNotes } from '../data/mockData';
import type { AppMeta, AuthResult, AuthUser, Course, CourseDraft, Note, ThemeMode, UserRecord } from '../types';

type AppState = {
  themeMode: ThemeMode;
  leftHandedMode: boolean;
  largeText: boolean;
  highContrast: boolean;
  users: UserRecord[];
  currentUser: AuthUser | null;
  authError: string | null;
  courses: Course[];
  notes: Note[];
  activeNoteId: string | null;
  installReady: boolean;
  lastSavedMessage: string;
  appMeta: AppMeta;
  setThemeMode: (themeMode: ThemeMode) => void;
  setLeftHandedMode: (leftHandedMode: boolean) => void;
  setLargeText: (largeText: boolean) => void;
  setHighContrast: (highContrast: boolean) => void;
  clearAuthError: () => void;
  signIn: (email: string, password: string) => AuthResult;
  signUp: (name: string, email: string, password: string) => AuthResult;
  continueAsGuest: (name?: string, email?: string) => void;
  signOut: () => void;
  addCourse: (course: CourseDraft) => void;
  setActiveNote: (activeNoteId: string) => void;
  updateNoteBody: (id: string, body: string) => void;
  createNote: () => void;
  renameNote: (id: string, title: string) => void;
  toggleFavoriteNote: (id: string) => void;
  setInstallReady: (installReady: boolean) => void;
  resolveTheme: (mode: ThemeMode) => 'light' | 'dark';
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const today = () =>
  new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const getStorage = () =>
  typeof window === 'undefined' ? undefined : createJSONStorage<AppState>(() => window.localStorage);

const resolveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
};

const withAuthError = (message: string, set: (partial: Partial<AppState>) => void): AuthResult => {
  set({ authError: message });
  return { success: false, message };
};

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      leftHandedMode: true,
      largeText: false,
      highContrast: false,
      users: [{ name: 'Demo Student', email: 'demo@edulence.app', password: 'demo1234' }],
      currentUser: null,
      authError: null,
      courses: initialCourses,
      notes: initialNotes,
      activeNoteId: initialNotes[0]?.id ?? null,
      installReady: false,
      lastSavedMessage: 'Ready',
      appMeta,
      // Store actions are kept colocated with the state so routing and screens stay thin.
      setThemeMode: (themeMode) => set({ themeMode }),
      setLeftHandedMode: (leftHandedMode) => set({ leftHandedMode }),
      setLargeText: (largeText) => set({ largeText }),
      setHighContrast: (highContrast) => set({ highContrast }),
      clearAuthError: () => set({ authError: null }),
      signIn: (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        if (!normalizedEmail || !password) {
          return withAuthError('Email and password are required.', set);
        }

        const user = get().users.find(
          (candidate) =>
            normalizeEmail(candidate.email) === normalizedEmail && candidate.password === password,
        );

        if (!user) {
          return withAuthError('Invalid email or password.', set);
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
          return withAuthError('Name, email, and password are required.', set);
        }

        if (password.length < 6) {
          return withAuthError('Password must be at least 6 characters.', set);
        }

        const exists = get().users.some(
          (candidate) => normalizeEmail(candidate.email) === normalizedEmail,
        );

        if (exists) {
          return withAuthError('An account with this email already exists.', set);
        }

        const newUser: UserRecord = { name: trimmedName, email: normalizedEmail, password };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: { name: newUser.name, email: newUser.email },
          authError: null,
        }));

        return { success: true };
      },
      continueAsGuest: (name, email) =>
        set({
          currentUser: {
            name: name?.trim() || 'Guest Student',
            email: normalizeEmail(email || 'guest@edulence.app'),
          },
          authError: null,
        }),
      signOut: () => set({ currentUser: null, authError: null }),
      addCourse: (course) =>
        set((state) => ({
          courses: [
            {
              ...course,
              id: course.code,
              credits: Number(course.credits),
              progress: Number(course.progress),
              status: Number(course.progress) >= 100 ? 'Completed' : 'In Progress',
            },
            ...state.courses,
          ],
        })),
      setActiveNote: (activeNoteId) => set({ activeNoteId }),
      updateNoteBody: (id, body) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, body, date: today() } : note)),
          lastSavedMessage: `Saved locally ${today()}`,
        })),
      createNote: () =>
        set((state) => {
          const id = `note-${Date.now()}`;
          const newNote: Note = {
            id,
            title: 'Untitled Note',
            course: 'General',
            date: today(),
            favorite: false,
            tags: ['draft'],
            body: '# Untitled Note\n\nStart writing here...',
          };

          return {
            notes: [newNote, ...state.notes],
            activeNoteId: id,
            lastSavedMessage: 'Draft created locally',
          };
        }),
      renameNote: (id, title) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, title: title.trim() || note.title } : note)),
        })),
      toggleFavoriteNote: (id) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, favorite: !note.favorite } : note)),
        })),
      setInstallReady: (installReady) => set({ installReady }),
      resolveTheme,
    }),
    {
      name: 'edulence-web-state',
      storage: getStorage(),
      partialize: (state) => ({
        themeMode: state.themeMode,
        leftHandedMode: state.leftHandedMode,
        largeText: state.largeText,
        highContrast: state.highContrast,
        users: state.users,
        currentUser: state.currentUser,
        courses: state.courses,
        notes: state.notes,
        activeNoteId: state.activeNoteId,
        lastSavedMessage: state.lastSavedMessage,
      }),
    },
  ),
);

export const useAuthState = () =>
  useAppStore(
    useShallow((state) => ({
      currentUser: state.currentUser,
      authError: state.authError,
    })),
  );

export const useAuthActions = () =>
  useAppStore(
    useShallow((state) => ({
      clearAuthError: state.clearAuthError,
      signIn: state.signIn,
      signUp: state.signUp,
      continueAsGuest: state.continueAsGuest,
      signOut: state.signOut,
    })),
  );

export const usePreferenceState = () =>
  useAppStore(
    useShallow((state) => ({
      themeMode: state.themeMode,
      leftHandedMode: state.leftHandedMode,
      largeText: state.largeText,
      highContrast: state.highContrast,
      installReady: state.installReady,
      resolveTheme: state.resolveTheme,
    })),
  );

export const usePreferenceActions = () =>
  useAppStore(
    useShallow((state) => ({
      setThemeMode: state.setThemeMode,
      setLeftHandedMode: state.setLeftHandedMode,
      setLargeText: state.setLargeText,
      setHighContrast: state.setHighContrast,
      setInstallReady: state.setInstallReady,
    })),
  );

export const useCourseState = () =>
  useAppStore(
    useShallow((state) => ({
      courses: state.courses,
      addCourse: state.addCourse,
    })),
  );

export const useNotesState = () =>
  useAppStore(
    useShallow((state) => ({
      notes: state.notes,
      activeNoteId: state.activeNoteId,
      lastSavedMessage: state.lastSavedMessage,
      setActiveNote: state.setActiveNote,
      updateNoteBody: state.updateNoteBody,
      createNote: state.createNote,
      renameNote: state.renameNote,
      toggleFavoriteNote: state.toggleFavoriteNote,
    })),
  );

export default useAppStore;
