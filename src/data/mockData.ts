import type {
  AppMeta,
  Course,
  DashboardMetric,
  ExploreItem,
  NavItem,
  Note,
  QuickAction,
  UpcomingItem,
} from '../types';

export const appMeta: AppMeta = {
  name: 'EduLense',
  version: '1.0.0',
  description:
    'A learning workspace for course tracking, notes, accessibility preferences, and offline-first study workflows.',
};

export const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: '◫' },
  { to: '/courses', label: 'Courses', icon: '▣' },
  { to: '/explore', label: 'Explore', icon: '⌕' },
  { to: '/notes', label: 'Notes', icon: '✎' },
  { to: '/profile', label: 'Profile', icon: '◌' },
  { to: '/settings/appearance', label: 'Settings', icon: '⚙' },
  { to: '/help', label: 'Help', icon: '?' },
];

export const quickActions: QuickAction[] = [
  { id: 'courses', label: 'My Courses', detail: 'Track progress and add classes', href: '/courses' },
  { id: 'explore', label: 'Explore', detail: 'Browse recommended learning paths', href: '/explore' },
  { id: 'notes', label: 'Study Notes', detail: 'Work offline and auto-save locally', href: '/notes' },
  { id: 'settings', label: 'Accessibility', detail: 'Theme, contrast, scale, handedness', href: '/settings/accessibility' },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Active Courses', value: '8' },
  { label: 'Avg Progress', value: '72%' },
  { label: 'Study Time', value: '24h' },
  { label: 'Performance', value: '+12%' },
];

export const activities: string[] = [
  'Flutter Basics - Lesson 3 completed 2 hours ago',
  'Assignment: State Management due in 2 days',
  'Quiz: Dart Fundamentals scored 92/100',
];

export const upcomingItems: UpcomingItem[] = [
  { title: 'Calculus Exam', meta: 'Today, 2:00 PM' },
  { title: 'Physics Lab Report', meta: 'Tomorrow, 11:59 PM' },
  { title: 'Study Group Meeting', meta: 'Wednesday, 4:00 PM' },
];

export const initialCourses: Course[] = [
  {
    id: 'MATH-301',
    title: 'Advanced Calculus',
    code: 'MATH-301',
    instructor: 'Dr. Jane Smith',
    credits: 3,
    progress: 75,
    status: 'In Progress',
    schedule: 'Mon, 9:00 AM',
    description: 'Advanced differentiation, integration, and applied problem-solving.',
  },
  {
    id: 'PHYS-202',
    title: 'Physics II',
    code: 'PHYS-202',
    instructor: 'Prof. John Davis',
    credits: 4,
    progress: 60,
    status: 'In Progress',
    schedule: 'Tue, 10:30 AM',
    description: 'Electricity, magnetism, and quantitative lab work.',
  },
  {
    id: 'CS-101',
    title: 'Computer Science',
    code: 'CS-101',
    instructor: 'Dr. Sarah Johnson',
    credits: 3,
    progress: 85,
    status: 'In Progress',
    schedule: 'Wed, 2:00 PM',
    description: 'Core programming principles, data structures, and problem decomposition.',
  },
  {
    id: 'ENG-250',
    title: 'English Literature',
    code: 'ENG-250',
    instructor: 'Prof. Liam Carter',
    credits: 3,
    progress: 45,
    status: 'In Progress',
    schedule: 'Thu, 1:00 PM',
    description: 'Critical reading, interpretation, and analytical writing.',
  },
  {
    id: 'BIO-110',
    title: 'Biology',
    code: 'BIO-110',
    instructor: 'Prof. Ava Nguyen',
    credits: 4,
    progress: 100,
    status: 'Completed',
    schedule: 'Self-paced',
    description: 'Foundations of life sciences with guided labs.',
  },
];

export const exploreItems: ExploreItem[] = [
  {
    id: '1',
    title: 'Introduction to Flutter',
    category: 'Mobile Development',
    description: 'Build responsive apps with Dart and Flutter widgets.',
  },
  {
    id: '2',
    title: 'React Native Fundamentals',
    category: 'Mobile Development',
    description: 'Cross-platform fundamentals using React Native and Expo.',
  },
  {
    id: '3',
    title: 'Data Structures Essentials',
    category: 'Computer Science',
    description: 'Core structures with practical interview-style examples.',
  },
  {
    id: '4',
    title: 'UX Accessibility Basics',
    category: 'Design',
    description: 'Build inclusive interfaces for all users.',
  },
];

export const initialNotes: Note[] = [
  {
    id: 'calc-15',
    title: 'Calculus Lecture 15',
    course: 'MATH-301',
    date: 'Feb 20, 2026',
    favorite: true,
    tags: ['derivatives', 'limits'],
    body:
      '# Derivatives and Limits\n\nToday covered the relationship between derivatives and limits.\n\n1. Power Rule\n2. Product Rule\n3. Chain Rule',
  },
  {
    id: 'phys-lab',
    title: 'Physics Lab Notes',
    course: 'PHYS-202',
    date: 'Feb 18, 2026',
    favorite: false,
    tags: ['circuits', 'ohm'],
    body:
      '# Lab Setup\n\n- Confirm multimeter calibration\n- Measured resistance values\n\n## Reminder\nSubmit the report before 11:59 PM.',
  },
];
