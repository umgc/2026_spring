export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppMeta {
  name: string;
  version: string;
  description: string;
}

export interface NavItem {
  to: string;
  label: string;
  icon: string;
}

export interface QuickAction {
  id: string;
  label: string;
  detail: string;
  href: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
}

export interface UpcomingItem {
  title: string;
  meta: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  credits: number;
  progress: number;
  status: 'In Progress' | 'Completed';
  schedule: string;
  description: string;
}

export interface ExploreItem {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface Note {
  id: string;
  title: string;
  course: string;
  date: string;
  favorite: boolean;
  tags: string[];
  body: string;
}

export interface UserRecord {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
}

export interface CourseDraft {
  title: string;
  code: string;
  instructor: string;
  credits: number | string;
  progress: number | string;
  schedule: string;
  description: string;
}

export interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}

export interface SettingsSection {
  id: 'appearance' | 'accessibility' | 'about';
  label: string;
  path: string;
}
