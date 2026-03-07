import React, { useEffect, useMemo, useRef, useState } from 'react';

// Renderer-only routes. Electron menu commands still use nav:home/nav:files/nav:notes/nav:settings.
const ROUTES = {
  dashboard: 'dashboard',
  courses: 'courses',
  calendar: 'calendar',
  notes: 'notes',
  progress: 'progress',
  achievements: 'achievements',
  studySessions: 'studySessions',
  notifications: 'notifications',
  settings: 'settings',
  help: 'help',
};

const MENU_TO_ROUTE = {
  'nav:home': ROUTES.dashboard,
  'nav:files': ROUTES.courses,
  'nav:notes': ROUTES.notes,
  'nav:settings': ROUTES.settings,
};

const SHORTCUTS = [
  ['Cmd/Ctrl+N', 'New note'],
  ['Cmd/Ctrl+O', 'Open note'],
  ['Cmd/Ctrl+S', 'Save note'],
  ['Cmd/Ctrl+Shift+S', 'Save note as…'],
  ['Cmd/Ctrl+1', 'Dashboard'],
  ['Cmd/Ctrl+2', 'Courses'],
  ['Cmd/Ctrl+3', 'Notes'],
  ['Cmd/Ctrl+,', 'Settings'],
  ['Alt+Left / Alt+Right', 'Back / Forward'],
  ['Cmd/Ctrl+/', 'Show shortcuts'],
];

const COURSES = [
  {
    id: 'MATH-301',
    title: 'Advanced Calculus',
    code: 'MATH-301',
    instructor: 'Dr. Jane Smith',
    credits: 3,
    progress: 75,
    status: 'In Progress',
    schedule: 'Mon, 9:00 AM',
    accent: 'lavender',
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
    accent: 'mint',
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
    accent: 'sand',
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
    accent: 'sky',
  },
  {
    id: 'HIST-210',
    title: 'World History',
    code: 'HIST-210',
    instructor: 'Dr. Elena Ruiz',
    credits: 3,
    progress: 20,
    status: 'In Progress',
    schedule: 'Fri, 11:00 AM',
    accent: 'rose',
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
    accent: 'lime',
  },
];

const UPCOMING = [
  { title: 'Calculus Exam', meta: 'Today, 2:00 PM' },
  { title: 'Physics Lab Report Due', meta: 'Tomorrow, 11:59 PM' },
  { title: 'Study Group Meeting', meta: 'Wed, 4:00 PM' },
];

const SAMPLE_NOTES = [
  {
    id: 'calc-15',
    title: 'Calculus Lecture 15',
    course: 'MATH-301',
    date: 'Feb 20, 2026',
    tags: ['derivatives', 'limits'],
    body:
      '# Derivatives and Limits\n\n## Key Concepts\n\nToday\'s lecture covered the fundamental relationship between derivatives and limits.\n\n### Definition of Derivative\nThe derivative of a function f(x) at point x is defined as:\n\nf\'(x) = lim(h→0) [f(x+h) - f(x)] / h\n\n### Important Rules\n1. Power Rule: d/dx(x^n) = n x^(n-1)\n2. Product Rule: d/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)\n3. Chain Rule: d/dx[f(g(x))] = f\'(g(x))g\'(x)',
  },
  {
    id: 'phys-lab',
    title: 'Physics Lab Notes',
    course: 'PHYS-202',
    date: 'Feb 18, 2026',
    tags: ['circuits', 'ohm'],
    body: '# Lab Setup\n\n- Confirmed multimeter calibration\n- Measured resistance values\n\n## Reminder\nSubmit the report in the LMS before 11:59 PM.',
  },
];

function cn(...values) {
  return values.filter(Boolean).join(' ');
}

function formatTitle(filePath) {
  if (!filePath) return 'Untitled Note';
  return filePath.split(/[\\/]/).pop() || filePath;
}

function Icon({ label }) {
  return (
    <span className="icon" aria-hidden="true" title={label}>
      {label}
    </span>
  );
}

function Pill({ children, tone = 'neutral' }) {
  return <span className={cn('pill', `pill--${tone}`)}>{children}</span>;
}

function ProgressBar({ value }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="progress" role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress__fill" style={{ width: `${safe}%` }} />
    </div>
  );
}

function ShortcutModal({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal" role="presentation" onMouseDown={onClose}>
      <section
        className="modal__card"
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard Shortcuts"
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <h2>Keyboard Shortcuts</h2>
          <button type="button" className="btn btn--ghost" onClick={onClose} aria-label="Close shortcuts dialog">
            ✕
          </button>
        </header>
        <div className="modal__body">
          <ul className="shortcut-list">
            {SHORTCUTS.map(([keys, label]) => (
              <li key={keys} className="shortcut">
                <kbd>{keys}</kbd>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="stat">
      <div className="stat__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="stat__copy">
        <div className="stat__value">{value}</div>
        <div className="stat__label">{label}</div>
      </div>
    </div>
  );
}

function CourseCard({ course, onOpen }) {
  const completed = course.status === 'Completed' || course.progress >= 100;
  return (
    <button type="button" className="course" onClick={() => onOpen?.(course)}>
      <div className={cn('course__badge', `course__badge--${course.accent}`)} aria-hidden="true">
        <span>📘</span>
      </div>
      <div className="course__meta">
        <div className="course__title-row">
          <h3 className="course__title">{course.title}</h3>
          <Pill tone={completed ? 'success' : 'info'}>{course.code}</Pill>
        </div>
        <p className="course__sub">
          {course.instructor} · {course.credits} Credits
        </p>
        <div className="course__progress-row">
          <span className="course__progress-label">Progress</span>
          <span className="course__progress-value">{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} />
        <div className="course__footer">
          <Pill tone={completed ? 'success' : 'neutral'}>{completed ? 'Completed' : 'In Progress'}</Pill>
          <span className="course__schedule">{course.schedule}</span>
        </div>
      </div>
    </button>
  );
}

function DashboardPage({ onPrimaryAction }) {
  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Welcome back! Here&apos;s your learning overview.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={onPrimaryAction}>
          <span aria-hidden="true">＋</span>
          New Course
        </button>
      </header>

      <section className="stats" aria-label="Dashboard summary statistics">
        <StatCard icon={<Icon label="📚" />} value="8" label="Active Courses" />
        <StatCard icon={<Icon label="🎯" />} value="72%" label="Avg Progress" />
        <StatCard icon={<Icon label="⏱" />} value="24h" label="Study Time" />
        <StatCard icon={<Icon label="📈" />} value="+12%" label="Performance" />
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel__header">
            <h2>My Courses</h2>
            <button type="button" className="link" onClick={onPrimaryAction}>
              View All →
            </button>
          </div>
          <div className="course-grid">
            {COURSES.slice(0, 4).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>

        <aside className="panel panel--aside" aria-label="Upcoming work">
          <div className="panel__header">
            <h2>Upcoming</h2>
            <button type="button" className="btn btn--icon" aria-label="Open calendar">
              📅
            </button>
          </div>
          <ul className="upcoming">
            {UPCOMING.map((item) => (
              <li key={item.title} className="upcoming__item">
                <div className="upcoming__title">{item.title}</div>
                <div className="upcoming__meta">{item.meta}</div>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--ghost btn--full" aria-label="View calendar">
            View Calendar
          </button>
        </aside>
      </section>
    </div>
  );
}

function CoursesPage({ filter, setFilter }) {
  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Courses</h1>
          <p className="muted">Manage and track all your courses</p>
        </div>
        <button type="button" className="btn btn--primary">
          <span aria-hidden="true">📖</span>
          Add Course
        </button>
      </header>

      <div className="courses-toolbar" role="search">
        <label className="search">
          <span className="search__icon" aria-hidden="true">
            🔎
          </span>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search courses…"
            aria-label="Search courses"
          />
        </label>
        <div className="courses-toolbar__actions" aria-label="Courses view options">
          <button type="button" className="btn btn--icon" aria-label="Filter">
            ☰
          </button>
          <button type="button" className="btn btn--icon" aria-label="Grid view" aria-pressed="true">
            ▦
          </button>
          <button type="button" className="btn btn--icon" aria-label="List view" aria-pressed="false">
            ≡
          </button>
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label="Course filters">
        <button type="button" role="tab" aria-selected="true" className="tab">
          All Courses <span className="tab__count">({COURSES.length})</span>
        </button>
        <button type="button" role="tab" aria-selected="false" className="tab">
          In Progress <span className="tab__count">({COURSES.filter((c) => c.progress < 100).length})</span>
        </button>
        <button type="button" role="tab" aria-selected="false" className="tab">
          Completed <span className="tab__count">({COURSES.filter((c) => c.progress >= 100).length})</span>
        </button>
        <button type="button" role="tab" aria-selected="false" className="tab">
          Favorites
        </button>
      </div>

      <section className="course-grid" aria-label="All courses">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  );
}

function NotesPage({
  content,
  setContent,
  currentFilePath,
  setCurrentFilePath,
  dirty,
  setDirty,
  status,
  setStatus,
  onOpen,
  onSave,
  onSaveAs,
  onNew,
}) {
  const [selectedNoteId, setSelectedNoteId] = useState(SAMPLE_NOTES[0].id);
  const [noteSearch, setNoteSearch] = useState('');
  const editorRef = useRef(null);
  const selected = SAMPLE_NOTES.find((n) => n.id === selectedNoteId) || SAMPLE_NOTES[0];

  useEffect(() => {
    // If a file was opened from the menu (Open Recent/Open file), keep the custom content.
    // Otherwise default to the sample note.
    if (!currentFilePath && !dirty && content === '# EduLense Desktop\n\nStart writing here...') {
      setContent(selected.body);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNoteId]);

  const noteList = useMemo(() => {
    const q = noteSearch.trim().toLowerCase();
    if (!q) return SAMPLE_NOTES;
    return SAMPLE_NOTES.filter((n) => n.title.toLowerCase().includes(q) || n.course.toLowerCase().includes(q));
  }, [noteSearch]);

  return (
    <div className="notes-layout">
      <aside className="notes-sidebar" aria-label="Notes list">
        <div className="notes-sidebar__header">
          <h2>Notes</h2>
          <button type="button" className="btn btn--icon" onClick={onNew} aria-label="Create new note">
            ＋
          </button>
        </div>
        <label className="search search--compact">
          <span className="search__icon" aria-hidden="true">
            🔎
          </span>
          <input
            type="search"
            value={noteSearch}
            onChange={(e) => setNoteSearch(e.target.value)}
            placeholder="Search notes…"
            aria-label="Search notes"
          />
        </label>

        <nav className="notes-filters" aria-label="Note filters">
          <button type="button" className="notes-filter is-active">
            All Notes <span className="badge">42</span>
          </button>
          <button type="button" className="notes-filter">
            Favorites <span className="badge">8</span>
          </button>
          <button type="button" className="notes-filter">
            Recent
          </button>
        </nav>

        <div className="notes-list" role="list">
          {noteList.map((note) => (
            <button
              key={note.id}
              type="button"
              className={cn('note-tile', note.id === selectedNoteId && 'is-selected')}
              onClick={() => {
                setSelectedNoteId(note.id);
                setCurrentFilePath('');
                setDirty(false);
                setStatus(`Viewing ${note.title}`);
              }}
            >
              <div className="note-tile__title">{note.title}</div>
              <div className="note-tile__meta">
                <span>{note.course}</span>
                <span className="dot" aria-hidden="true">
                  •
                </span>
                <span>{note.date}</span>
              </div>
              <div className="note-tile__tags">
                {note.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="notes-editor" aria-label="Notes editor">
        <header className="notes-toolbar" role="toolbar" aria-label="Note actions">
          <div className="notes-toolbar__actions">
            <button type="button" className="btn btn--icon" onClick={onOpen} aria-label="Open note">
              📂
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={() => onSave(false)}
              aria-label="Save note"
              disabled={!dirty && !currentFilePath}
            >
              💾
            </button>
            <button type="button" className="btn btn--icon" onClick={onSaveAs} aria-label="Save note as">
              ⤓
            </button>
          </div>
          <div className="notes-toolbar__format" aria-label="Formatting controls (visual only)">
            <button type="button" className="btn btn--icon" aria-label="Bold">
              <strong>B</strong>
            </button>
            <button type="button" className="btn btn--icon" aria-label="Italic">
              <em>I</em>
            </button>
            <button type="button" className="btn btn--icon" aria-label="Underline">
              <span style={{ textDecoration: 'underline' }}>U</span>
            </button>
            <span className="toolbar-divider" aria-hidden="true" />
            <button type="button" className="btn btn--icon" aria-label="Bulleted list">
              •
            </button>
            <button type="button" className="btn btn--icon" aria-label="Numbered list">
              1.
            </button>
            <span className="toolbar-divider" aria-hidden="true" />
            <button type="button" className="btn btn--icon" aria-label="Link">
              🔗
            </button>
          </div>
        </header>

        <section className="note-header" aria-label="Note metadata">
          <div className="note-header__title">
            <h1>{currentFilePath ? formatTitle(currentFilePath) : selected.title}</h1>
            <div className="note-header__meta">
              <span>📅 {selected.date}</span>
              <Pill tone="info">{selected.course}</Pill>
              {dirty ? <Pill tone="warning">Unsaved</Pill> : null}
            </div>
          </div>
        </section>

        <section className="editor-wrap">
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setDirty(true);
            }}
            className="editor"
            spellCheck
            aria-label="Note content"
          />
        </section>
        <footer className="notes-status" aria-label="Editor status">
          <span className="muted">{status}</span>
        </footer>
      </main>
    </div>
  );
}

function PlaceholderPage({ title, children }) {
  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>{title}</h1>
          <p className="muted">This section is included for desktop navigation and accessibility testing.</p>
        </div>
      </header>
      <div className="panel">
        <div className="panel__body">{children}</div>
      </div>
    </div>
  );
}

function SettingsPage({
  themeMode,
  setThemeMode,
  largeText,
  setLargeText,
  highContrast,
  setHighContrast,
  confirmTrayMinimize,
  setConfirmTrayMinimize,
  updaterStatus,
  onCheckUpdates,
  onDownloadUpdate,
  onInstallUpdate,
}) {
  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Settings</h1>
          <p className="muted">Desktop preferences are stored locally on this device.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="panel" aria-label="Appearance settings">
          <div className="panel__header">
            <h2>Appearance</h2>
          </div>
          <div className="panel__body">
            <div className="radio-row" role="radiogroup" aria-label="Theme mode">
              <button
                type="button"
                className={cn('radio', themeMode === 'dark' && 'is-selected')}
                onClick={() => setThemeMode('dark')}
                role="radio"
                aria-checked={themeMode === 'dark'}
              >
                Dark
              </button>
              <button
                type="button"
                className={cn('radio', themeMode === 'light' && 'is-selected')}
                onClick={() => setThemeMode('light')}
                role="radio"
                aria-checked={themeMode === 'light'}
              >
                Light
              </button>
            </div>

            <label className="toggle">
              <span>
                <span className="toggle__title">Large text</span>
                <span className="toggle__subtitle">Increase UI scale for readability.</span>
              </span>
              <input type="checkbox" checked={largeText} onChange={(e) => setLargeText(e.target.checked)} />
            </label>

            <label className="toggle">
              <span>
                <span className="toggle__title">High contrast</span>
                <span className="toggle__subtitle">Boost borders and secondary text contrast.</span>
              </span>
              <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
            </label>
          </div>
        </section>

        <section className="panel" aria-label="Window and tray settings">
          <div className="panel__header">
            <h2>Window & Tray</h2>
          </div>
          <div className="panel__body">
            <label className="toggle">
              <span>
                <span className="toggle__title">Confirm hide-to-tray</span>
                <span className="toggle__subtitle">Ask before minimizing to the system tray on close.</span>
              </span>
              <input
                type="checkbox"
                checked={confirmTrayMinimize}
                onChange={(e) => setConfirmTrayMinimize(e.target.checked)}
              />
            </label>
          </div>
        </section>

        <section className="panel" aria-label="Updates settings">
          <div className="panel__header">
            <h2>Updates</h2>
          </div>
          <div className="panel__body">
            <div className="callout">
              <div className="callout__title">Auto-updater</div>
              <div className="callout__body">{updaterStatus.message || `State: ${updaterStatus.state}`}</div>
            </div>
            <div className="btn-row">
              <button type="button" className="btn btn--ghost" onClick={onCheckUpdates}>
                Check for updates
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={onDownloadUpdate}
                disabled={updaterStatus.state !== 'available'}
              >
                Download update
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={onInstallUpdate}
                disabled={updaterStatus.state !== 'downloaded'}
              >
                Install & Restart
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function HelpPage() {
  return (
    <PlaceholderPage title="Help">
      <h2>About EduLense</h2>
      <p>
        EduLense is an AI-powered educational platform that started in K–12 education and has since expanded into
        higher education.
      </p>
      <p>
        It supports teachers with lesson planning, assignment generation, grading, and student performance analysis.
        By integrating Large Language Models (LLMs) with platforms like Moodle and Google Classroom, EduLense helps
        automate educational workflows while improving accessibility and ease of use.
      </p>
      <h3>Desktop accessibility checklist</h3>
      <ul>
        <li>All features are reachable with keyboard navigation and visible focus indicators.</li>
        <li>Sidebar navigation uses proper landmarks and aria labels.</li>
        <li>Pages and controls are screen-reader friendly (NVDA/VoiceOver).</li>
      </ul>
    </PlaceholderPage>
  );
}

function SidebarItem({ active, icon, label, badge, onClick }) {
  return (
    <button type="button" className={cn('side-item', active && 'is-active')} onClick={onClick}>
      <span className="side-item__badge" aria-hidden="true">
        {badge}
      </span>
      <span className="side-item__label">{label}</span>
      <span className="side-item__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}

export default function App() {
  const [hasHydratedState, setHasHydratedState] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [route, setRoute] = useState(ROUTES.dashboard);
  const [history, setHistory] = useState([ROUTES.dashboard]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Notes/editor state (used by native menu and keyboard shortcuts).
  const [content, setContent] = useState('# EduLense Desktop\n\nStart writing here...');
  const [currentFilePath, setCurrentFilePath] = useState('');
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [courseFilter, setCourseFilter] = useState('');

  // Preferences persisted via IPC.
  const [themeMode, setThemeMode] = useState('dark');
  const [autoRefreshRecent, setAutoRefreshRecent] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [confirmTrayMinimize, setConfirmTrayMinimize] = useState(true);
  const [updaterStatus, setUpdaterStatus] = useState({ state: 'idle', message: 'Updater unavailable' });

  const actionRef = useRef({});
  const persistTimerRef = useRef(null);

  const invokeSafe = async (label, fn) => {
    try {
      return await fn();
    } catch (error) {
      const message = error?.message || `${label} failed`;
      setStatus(message);
      return { ok: false, error: message };
    }
  };

  const navigate = (nextRoute, push = true) => {
    if (!isAuthenticated) return;
    if (!Object.values(ROUTES).includes(nextRoute)) return;
    setRoute(nextRoute);
    if (!push) return;
    setHistory((prev) => {
      const base = prev.slice(0, historyIndex + 1);
      const updated = [...base, nextRoute];
      setHistoryIndex(updated.length - 1);
      return updated;
    });
  };

  const navigateBack = () => {
    setHistoryIndex((idx) => {
      if (idx <= 0) return idx;
      const next = idx - 1;
      setRoute(history[next]);
      return next;
    });
  };

  const navigateForward = () => {
    setHistoryIndex((idx) => {
      if (idx >= history.length - 1) return idx;
      const next = idx + 1;
      setRoute(history[next]);
      return next;
    });
  };

  const handleOpen = async () => {
    const result = await window.desktop.file.open();
    if (!result || result.canceled) {
      setStatus(result?.error || 'Open canceled');
      return;
    }
    setCurrentFilePath(result.filePath || '');
    setContent(result.content ?? '');
    setDirty(false);
    setStatus(`Opened ${formatTitle(result.filePath)}`);
    navigate(ROUTES.notes);
  };

  const handleSave = async (forceSaveAs = false) => {
    const payload = { filePath: forceSaveAs ? '' : currentFilePath, content };
    const result = forceSaveAs
      ? await window.desktop.file.saveAs(payload)
      : await window.desktop.file.save(payload);

    if (!result?.ok) {
      setStatus(result?.error || 'Save failed');
      return;
    }
    if (result.canceled) {
      setStatus('Save canceled');
      return;
    }

    setCurrentFilePath(result.filePath || currentFilePath);
    setDirty(false);
    setStatus(`Saved ${formatTitle(result.filePath || currentFilePath)}`);
  };

  const handleNew = () => {
    setCurrentFilePath('');
    setContent('# New Note\n\n');
    setDirty(false);
    setStatus('Created new note');
    navigate(ROUTES.notes);
  };

  const handleMenuCommand = async (command) => {
    if (command && typeof command === 'object' && command.type === 'openRecent') {
      // Recent file open happens via file:read.
      if (!isAuthenticated) return;
      const result = await window.desktop.file.read(command.filePath);
      if (!result?.ok) {
        setStatus(result?.error || 'Unable to open recent file');
        return;
      }
      setCurrentFilePath(command.filePath);
      setContent(result.content ?? '');
      setDirty(false);
      setStatus(`Opened ${formatTitle(command.filePath)}`);
      navigate(ROUTES.notes);
      return;
    }

    if (MENU_TO_ROUTE[command]) {
      navigate(MENU_TO_ROUTE[command]);
      return;
    }

    switch (command) {
      case 'file:new':
        handleNew();
        break;
      case 'file:open':
        await handleOpen();
        break;
      case 'file:save':
        await handleSave(false);
        break;
      case 'file:saveAs':
        await handleSave(true);
        break;
      case 'nav:back':
        navigateBack();
        break;
      case 'nav:forward':
        navigateForward();
        break;
      case 'help:shortcuts':
        setShowShortcuts(true);
        break;
      default:
        break;
    }
  };

  actionRef.current = {
    handleOpen,
    handleSave,
    handleNew,
    handleMenuCommand,
    navigate,
    navigateBack,
    navigateForward,
    setShowShortcuts,
  };

  // Hydrate desktop state (prefs + auth flag).
  useEffect(() => {
    let cancelled = false;
    invokeSafe('Load desktop state', () => window.desktop.state.get())
      .then((result) => {
        if (cancelled) return;
        if (result?.ok && result.state) {
          const { prefs, auth } = result.state;
          if (prefs?.themeMode) setThemeMode(prefs.themeMode);
          if (typeof prefs?.autoRefreshRecent === 'boolean') setAutoRefreshRecent(prefs.autoRefreshRecent);
          if (typeof prefs?.largeText === 'boolean') setLargeText(prefs.largeText);
          if (typeof prefs?.highContrast === 'boolean') setHighContrast(prefs.highContrast);
          if (typeof prefs?.confirmTrayMinimize === 'boolean') setConfirmTrayMinimize(prefs.confirmTrayMinimize);
          if (typeof auth?.isAuthenticated === 'boolean') setIsAuthenticated(auth.isAuthenticated);
        }
        setHasHydratedState(true);
      })
      .catch(() => {
        if (!cancelled) setHasHydratedState(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wire updater status.
  useEffect(() => {
    invokeSafe('Get updater status', () => window.desktop.updater.getStatus()).then((result) => {
      if (result?.status) setUpdaterStatus(result.status);
    });
    const offUpdater = window.desktop.onUpdaterStatus((nextStatus) => setUpdaterStatus(nextStatus));
    return () => offUpdater?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist desktop preferences.
  useEffect(() => {
    if (!hasHydratedState) return;
    clearTimeout(persistTimerRef.current);
    persistTimerRef.current = setTimeout(() => {
      invokeSafe('Save desktop state', () =>
        window.desktop.state.save({
          prefs: { themeMode, autoRefreshRecent, largeText, highContrast, confirmTrayMinimize },
          auth: { isAuthenticated },
        })
      );
    }, 150);
    return () => clearTimeout(persistTimerRef.current);
  }, [
    hasHydratedState,
    themeMode,
    autoRefreshRecent,
    largeText,
    highContrast,
    confirmTrayMinimize,
    isAuthenticated,
  ]);

  useEffect(() => {
    document.title = `${dirty ? '* ' : ''}${formatTitle(currentFilePath)} - EduLense Desktop`;
  }, [currentFilePath, dirty]);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.dataset.scale = largeText ? 'large' : 'normal';
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'normal';
  }, [themeMode, largeText, highContrast]);

  // Listen to native menu commands.
  useEffect(() => {
    const offMenu = window.desktop.onMenuCommand((command) => actionRef.current.handleMenuCommand?.(command));
    return () => offMenu?.();
  }, []);

  // Keyboard shortcuts in renderer (also mirrored in native menu accelerators).
  useEffect(() => {
    const onKeyDown = async (event) => {
      const actions = actionRef.current;
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === 'o') {
        event.preventDefault();
        await actions.handleOpen?.();
        return;
      }
      if (mod && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        actions.handleNew?.();
        return;
      }
      if (mod && event.key.toLowerCase() === 's') {
        event.preventDefault();
        await actions.handleSave?.(event.shiftKey);
        return;
      }
      if (mod && event.key === '1') {
        event.preventDefault();
        actions.navigate?.(ROUTES.dashboard);
        return;
      }
      if (mod && event.key === '2') {
        event.preventDefault();
        actions.navigate?.(ROUTES.courses);
        return;
      }
      if (mod && event.key === '3') {
        event.preventDefault();
        actions.navigate?.(ROUTES.notes);
        return;
      }
      if (mod && event.key === ',') {
        event.preventDefault();
        actions.navigate?.(ROUTES.settings);
        return;
      }
      if (mod && event.key === '/') {
        event.preventDefault();
        actions.setShowShortcuts?.(true);
        return;
      }
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        actions.navigateBack?.();
        return;
      }
      if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        actions.navigateForward?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!hasHydratedState) {
    return (
      <div className="auth-shell">
        <div className="auth-gradient" />
        <main className="auth-layout">
          <section className="auth-card" aria-label="Loading">
            <h2>Loading EduLense Desktop</h2>
            <p>Restoring your desktop preferences and session…</p>
          </section>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-shell">
        <div className="auth-gradient" />
        <main className="auth-layout">
          <section className="auth-intro">
            <div className="auth-logo" aria-hidden="true">
              ◎
            </div>
            <h1>Welcome to EduLense</h1>
            <p>
              EduLense is an AI-powered educational platform for lesson planning, grading, and performance analysis.
              Sign in to continue.
            </p>
          </section>

          <section className="auth-card" aria-label="Authentication actions">
            <h2>Sign in or create an account</h2>
            <p>Save progress, sync across devices, and unlock tailored study insights across desktop and mobile.</p>
            <div className="auth-actions">
              <button
                type="button"
                className="filled"
                onClick={() => {
                  setIsAuthenticated(true);
                  setStatus('Signed in');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className="outlined"
                onClick={() => {
                  setIsAuthenticated(true);
                  setStatus('Account created');
                }}
              >
                Create Account
              </button>
            </div>
            <div className="auth-footnote">Tip: Press Cmd/Ctrl+/ any time to view keyboard shortcuts.</div>
          </section>
        </main>
      </div>
    );
  }

  const contentNode = (() => {
    switch (route) {
      case ROUTES.dashboard:
        return <DashboardPage onPrimaryAction={() => navigate(ROUTES.courses)} />;
      case ROUTES.courses:
        return <CoursesPage filter={courseFilter} setFilter={setCourseFilter} />;
      case ROUTES.notes:
        return (
          <NotesPage
            content={content}
            setContent={setContent}
            currentFilePath={currentFilePath}
            setCurrentFilePath={setCurrentFilePath}
            dirty={dirty}
            setDirty={setDirty}
            status={status}
            setStatus={setStatus}
            onOpen={handleOpen}
            onSave={handleSave}
            onSaveAs={() => handleSave(true)}
            onNew={handleNew}
          />
        );
      case ROUTES.settings:
        return (
          <SettingsPage
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            largeText={largeText}
            setLargeText={setLargeText}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            confirmTrayMinimize={confirmTrayMinimize}
            setConfirmTrayMinimize={setConfirmTrayMinimize}
            updaterStatus={updaterStatus}
            onCheckUpdates={() => window.desktop.updater.check()}
            onDownloadUpdate={() => window.desktop.updater.download()}
            onInstallUpdate={() => window.desktop.updater.install()}
          />
        );
      case ROUTES.help:
        return <HelpPage />;
      case ROUTES.notifications:
        return (
          <PlaceholderPage title="Notifications">
            <p className="muted">No new notifications.</p>
          </PlaceholderPage>
        );
      case ROUTES.calendar:
        return (
          <PlaceholderPage title="Calendar">
            <p className="muted">Calendar integration is a planned feature for EduLense Desktop.</p>
          </PlaceholderPage>
        );
      case ROUTES.progress:
        return (
          <PlaceholderPage title="Progress">
            <p className="muted">Track overall course progress here.</p>
          </PlaceholderPage>
        );
      case ROUTES.achievements:
        return (
          <PlaceholderPage title="Achievements">
            <p className="muted">Badges and milestones will appear here.</p>
          </PlaceholderPage>
        );
      case ROUTES.studySessions:
        return (
          <PlaceholderPage title="Study Sessions">
            <p className="muted">Schedule and join study groups.</p>
          </PlaceholderPage>
        );
      default:
        return <DashboardPage onPrimaryAction={() => navigate(ROUTES.courses)} />;
    }
  })();

  return (
    <div className="app-shell">
      <header className="topbar" role="banner">
        <div className="topbar__left" aria-label="App toolbar">
          <button type="button" className="btn btn--icon" aria-label="Refresh">
            ↻
          </button>
          <button type="button" className="btn btn--icon" aria-label="Settings" onClick={() => navigate(ROUTES.settings)}>
            ⚙
          </button>
          <div className="topbar__spacer" />
          <div className="topbar__icons" aria-label="Quick actions">
            {['🕒', '🔖', '📘', '📅', '🗒', 'ⓘ', '⇪', '⬇', '✎', '🗑', '🔗', '🔍', '⤢', '⤡', '＋'].map((c) => (
              <span key={c} className="topbar__glyph" aria-hidden="true">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="topbar__right" aria-label="Brand">
          <div className="brand">
            <div className="brand__name">EduLense</div>
            <div className="brand__sub">Desktop Edition</div>
          </div>
          <div className="brand__mark" aria-hidden="true">
            📘
          </div>
        </div>
      </header>

      <div className="shell">
        <main className="main" role="main">
          {contentNode}
        </main>

        <nav className="sidebar" aria-label="Main navigation">
          <SidebarItem
            active={route === ROUTES.dashboard}
            badge=""
            label="Dashboard"
            icon="⌂"
            onClick={() => navigate(ROUTES.dashboard)}
          />
          <SidebarItem
            active={route === ROUTES.courses}
            badge="8"
            label="Courses"
            icon="📚"
            onClick={() => navigate(ROUTES.courses)}
          />
          <SidebarItem
            active={route === ROUTES.calendar}
            badge="3"
            label="Calendar"
            icon="📅"
            onClick={() => navigate(ROUTES.calendar)}
          />

          <div className="sidebar__section">Notes</div>
          <SidebarItem
            active={route === ROUTES.notes}
            badge=""
            label="Notes"
            icon="📝"
            onClick={() => navigate(ROUTES.notes)}
          />
          <SidebarItem
            active={route === ROUTES.progress}
            badge=""
            label="Progress"
            icon="◎"
            onClick={() => navigate(ROUTES.progress)}
          />
          <SidebarItem
            active={route === ROUTES.achievements}
            badge=""
            label="Achievements"
            icon="🏅"
            onClick={() => navigate(ROUTES.achievements)}
          />
          <SidebarItem
            active={route === ROUTES.studySessions}
            badge=""
            label="Study Sessions"
            icon="🕒"
            onClick={() => navigate(ROUTES.studySessions)}
          />
          <button type="button" className="side-cta" onClick={() => setStatus('Study Groups coming soon')}>
            <span className="side-cta__new">New</span>
            Study Groups
          </button>

          <div className="sidebar__divider" />

          <SidebarItem
            active={route === ROUTES.notifications}
            badge="12"
            label="Notifications"
            icon="🔔"
            onClick={() => navigate(ROUTES.notifications)}
          />
          <SidebarItem
            active={route === ROUTES.help}
            badge=""
            label="Help"
            icon="❔"
            onClick={() => navigate(ROUTES.help)}
          />
          <SidebarItem
            active={route === ROUTES.settings}
            badge=""
            label="Settings"
            icon="⚙"
            onClick={() => navigate(ROUTES.settings)}
          />

          <div className="sidebar__profile" aria-label="User profile">
            <div>
              <div className="profile__name">John Doe</div>
              <div className="profile__role">Student</div>
            </div>
            <div className="profile__avatar" aria-hidden="true">
              JD
            </div>
          </div>
        </nav>
      </div>

      <footer className="statusbar" aria-label="Status bar">
        <div className="statusbar__left">
          <span className="status-pill">Online</span>
          <span className="muted">10:41 PM</span>
        </div>
        <div className="statusbar__center">
          <span className="muted">3 courses in progress</span>
          <span className="status-warn">2 assignments due today</span>
        </div>
        <div className="statusbar__right">
          <span className="muted">Ready</span>
          <span className="muted">All changes saved</span>
        </div>
      </footer>

      <ShortcutModal open={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  );
}
