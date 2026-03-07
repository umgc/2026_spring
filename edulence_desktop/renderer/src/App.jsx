import React, { useEffect, useMemo, useRef, useState } from "react";

const ROUTES = ["home", "files", "notes", "settings"];
const ROUTE_LABELS = {
  home: "Home",
  files: "Explore",
  notes: "Profile",
  settings: "Settings",
};
const SHORTCUTS = [
  ["Cmd/Ctrl+N", "New note"],
  ["Cmd/Ctrl+O", "Open file"],
  ["Cmd/Ctrl+S", "Save"],
  ["Cmd/Ctrl+Shift+S", "Save As"],
  ["Cmd/Ctrl+1..3", "Home / Explore / Profile"],
  ["Cmd/Ctrl+,", "Settings"],
  ["Alt+Left / Alt+Right", "Back / Forward"],
  ["Cmd/Ctrl+/", "Show shortcuts"],
];

const TOPICS = [
  "Flutter Fundamentals",
  "Dart Collections and Generics",
  "State Management Patterns",
  "Accessibility and Inclusive UX",
  "Testing and QA Automation",
  "Mobile Security Best Practices",
];

const QUICK_ACTIONS = [
  ["My Courses", "Open learning library"],
  ["Assignments", "Review due work"],
  ["Schedule", "Check calendar items"],
  ["Progress", "View learning metrics"],
];

const RECENT_ACTIVITY = [
  ["Flutter Basics - Lesson 3", "Completed 2 hours ago"],
  ["Assignment: State Management", "Due in 2 days"],
  ["Quiz: Dart Fundamentals", "Score: 92/100"],
];

function formatTitle(filePath) {
  if (!filePath) return "Untitled Note";
  return filePath.split(/[\\/]/).pop() || filePath;
}

function ThemeOption({ label, subtitle, selected, onClick }) {
  return (
    <button
      type="button"
      className={`list-tile ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span className="tile-leading">{selected ? "●" : "○"}</span>
      <span className="tile-copy">
        <span className="tile-title">{label}</span>
        <span className="tile-subtitle">{subtitle}</span>
      </span>
      <span className="tile-trailing">{selected ? "Selected" : ""}</span>
    </button>
  );
}

function SwitchTile({ title, subtitle, checked, onChange }) {
  return (
    <label className="switch-tile">
      <span className="tile-copy">
        <span className="tile-title">{title}</span>
        <span className="tile-subtitle">{subtitle}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default function App() {
  const [hasHydratedState, setHasHydratedState] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [route, setRoute] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [content, setContent] = useState(
    "# EduLense Desktop\n\nStart writing here...",
  );
  const [currentFilePath, setCurrentFilePath] = useState("");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [recentFiles, setRecentFiles] = useState([]);
  const [openedFolder, setOpenedFolder] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedRecent, setSelectedRecent] = useState("");
  const [themeMode, setThemeMode] = useState("light");
  const [leftHanded, setLeftHanded] = useState(true);
  const [autoRefreshRecent, setAutoRefreshRecent] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [confirmTrayMinimize, setConfirmTrayMinimize] = useState(true);
  const [updaterStatus, setUpdaterStatus] = useState({
    state: "idle",
    message: "Updater unavailable",
  });
  const editorRef = useRef(null);
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
    if (!ROUTES.includes(nextRoute)) return;
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

  const refreshRecentFiles = async () => {
    const result = await invokeSafe("Load recent files", () =>
      window.desktop.app.getRecentFiles(),
    );
    if (result?.ok) {
      setRecentFiles(result.files);
      if (!selectedRecent && result.files[0]) {
        setSelectedRecent(result.files[0]);
      }
    }
  };

  useEffect(() => {
    refreshRecentFiles();
  }, []);

  useEffect(() => {
    let cancelled = false;
    invokeSafe("Load desktop state", () => window.desktop.state.get())
      .then((result) => {
        if (cancelled) return;
        if (!result?.ok || !result.state) {
          setHasHydratedState(true);
          return;
        }
        const { prefs, auth } = result.state;
        if (prefs) {
          if (typeof prefs.themeMode === "string")
            setThemeMode(prefs.themeMode);
          if (typeof prefs.leftHanded === "boolean")
            setLeftHanded(prefs.leftHanded);
          if (typeof prefs.autoRefreshRecent === "boolean")
            setAutoRefreshRecent(prefs.autoRefreshRecent);
          if (typeof prefs.largeText === "boolean")
            setLargeText(prefs.largeText);
          if (typeof prefs.highContrast === "boolean")
            setHighContrast(prefs.highContrast);
          if (typeof prefs.confirmTrayMinimize === "boolean") {
            setConfirmTrayMinimize(prefs.confirmTrayMinimize);
          }
        }
        if (auth && typeof auth.isAuthenticated === "boolean") {
          setIsAuthenticated(auth.isAuthenticated);
        }
        setHasHydratedState(true);
      })
      .catch(() => {
        if (!cancelled) setHasHydratedState(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    invokeSafe("Get updater status", () =>
      window.desktop.updater.getStatus(),
    ).then((result) => {
      if (result?.status) {
        setUpdaterStatus(result.status);
      }
    });
    const offUpdater = window.desktop.onUpdaterStatus((nextStatus) => {
      setUpdaterStatus(nextStatus);
    });
    const offWindow = window.desktop.onWindowAction((action) => {
      if (action === "hidden-to-tray") {
        setStatus("Window hidden to tray");
      }
    });
    return () => {
      offUpdater?.();
      offWindow?.();
    };
  }, []);

  useEffect(() => {
    if (!hasHydratedState) return;
    clearTimeout(persistTimerRef.current);
    persistTimerRef.current = setTimeout(() => {
      invokeSafe("Save desktop state", () =>
        window.desktop.state.save({
          prefs: {
            themeMode,
            leftHanded,
            autoRefreshRecent,
            largeText,
            highContrast,
            confirmTrayMinimize,
          },
          auth: {
            isAuthenticated,
          },
        }),
      );
    }, 180);
    return () => clearTimeout(persistTimerRef.current);
  }, [
    hasHydratedState,
    themeMode,
    leftHanded,
    autoRefreshRecent,
    largeText,
    highContrast,
    confirmTrayMinimize,
    isAuthenticated,
  ]);

  useEffect(() => {
    document.title = `${dirty ? "* " : ""}${formatTitle(currentFilePath)} - EduLense Desktop`;
  }, [currentFilePath, dirty]);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.dataset.scale = largeText ? "large" : "normal";
    document.documentElement.dataset.contrast = highContrast
      ? "high"
      : "normal";
  }, [themeMode, largeText, highContrast]);

  const handleOpen = async () => {
    const result = await window.desktop.file.open();
    if (!result || result.canceled) {
      setStatus(result?.error || "Open canceled");
      return;
    }
    setCurrentFilePath(result.filePath || "");
    setContent(result.content ?? "");
    setDirty(false);
    setStatus(`Opened ${formatTitle(result.filePath)}`);
    navigate("notes");
    if (autoRefreshRecent) refreshRecentFiles();
  };

  const handleOpenFolder = async () => {
    const result = await window.desktop.file.openFolder();
    if (!result || result.canceled) {
      setStatus(result?.error || "Open folder canceled");
      return;
    }
    setOpenedFolder({ path: result.folderPath, entries: result.entries || [] });
    setStatus(`Opened folder ${result.folderPath}`);
    navigate("files");
  };

  const handleSave = async (forceSaveAs = false) => {
    const payload = { filePath: forceSaveAs ? "" : currentFilePath, content };
    const result = forceSaveAs
      ? await window.desktop.file.saveAs(payload)
      : await window.desktop.file.save(payload);

    if (!result?.ok) {
      setStatus(result?.error || "Save failed");
      return;
    }
    if (result.canceled) {
      setStatus("Save canceled");
      return;
    }

    setCurrentFilePath(result.filePath || currentFilePath);
    setDirty(false);
    setStatus(`Saved ${formatTitle(result.filePath || currentFilePath)}`);
    if (autoRefreshRecent) refreshRecentFiles();
  };

  const handleNew = () => {
    setCurrentFilePath("");
    setContent("# New Note\n\n");
    setDirty(false);
    setStatus("Created new note");
    navigate("notes");
    requestAnimationFrame(() => editorRef.current?.focus());
  };

  const handleOpenRecent = async (filePath) => {
    if (!filePath) return;
    const result = await window.desktop.file.read(filePath);
    if (!result?.ok) {
      setStatus(result?.error || "Unable to open recent file");
      return;
    }
    setCurrentFilePath(filePath);
    setContent(result.content ?? "");
    setDirty(false);
    setStatus(`Opened ${formatTitle(filePath)}`);
    setSelectedRecent(filePath);
    navigate("notes");
  };

  const handleMenuCommand = async (command) => {
    if (
      command &&
      typeof command === "object" &&
      command.type === "openRecent"
    ) {
      if (!isAuthenticated) return;
      await handleOpenRecent(command.filePath);
      return;
    }

    switch (command) {
      case "file:new":
        handleNew();
        break;
      case "file:open":
        await handleOpen();
        break;
      case "file:openFolder":
        await handleOpenFolder();
        break;
      case "file:save":
        await handleSave(false);
        break;
      case "file:saveAs":
        await handleSave(true);
        break;
      case "edit:find":
        navigate("files");
        setStatus("Use the search field in Explore to filter recent files");
        break;
      case "nav:home":
        navigate("home");
        break;
      case "nav:files":
        navigate("files");
        break;
      case "nav:notes":
        navigate("notes");
        break;
      case "nav:settings":
        navigate("settings");
        break;
      case "nav:back":
        navigateBack();
        break;
      case "nav:forward":
        navigateForward();
        break;
      case "help:shortcuts":
        setShowShortcuts(true);
        break;
      case "file:reveal":
        if (currentFilePath) {
          await window.desktop.app.showItemInFolder(currentFilePath);
          setStatus("Revealed file in folder");
        }
        break;
      case "app:refreshRecentFiles":
        await refreshRecentFiles();
        break;
      default:
        break;
    }
  };

  actionRef.current = {
    handleOpen,
    handleOpenFolder,
    handleSave,
    handleNew,
    handleMenuCommand,
    navigate,
    navigateBack,
    navigateForward,
    setShowShortcuts,
  };

  useEffect(() => {
    const offMenu = window.desktop.onMenuCommand((command) => {
      actionRef.current.handleMenuCommand?.(command);
    });
    return () => offMenu?.();
  }, []);

  useEffect(() => {
    const onKeyDown = async (event) => {
      const actions = actionRef.current;
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key === "o") {
        event.preventDefault();
        await actions.handleOpen?.();
        return;
      }
      if (mod && event.key === "n") {
        event.preventDefault();
        actions.handleNew?.();
        return;
      }
      if (mod && event.key.toLowerCase() === "s") {
        event.preventDefault();
        await actions.handleSave?.(event.shiftKey);
        return;
      }
      if (mod && event.key === "1") {
        event.preventDefault();
        actions.navigate?.("home");
        return;
      }
      if (mod && event.key === "2") {
        event.preventDefault();
        actions.navigate?.("files");
        return;
      }
      if (mod && event.key === "3") {
        event.preventDefault();
        actions.navigate?.("notes");
        return;
      }
      if (mod && event.key === ",") {
        event.preventDefault();
        actions.navigate?.("settings");
        return;
      }
      if (mod && event.key === "/") {
        event.preventDefault();
        actions.setShowShortcuts?.(true);
        return;
      }
      if (event.altKey && event.key === "ArrowLeft") {
        event.preventDefault();
        actions.navigateBack?.();
        return;
      }
      if (event.altKey && event.key === "ArrowRight") {
        event.preventDefault();
        actions.navigateForward?.();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        actions.setShowShortcuts?.(false);
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredRecent = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return recentFiles;
    return recentFiles.filter((file) => file.toLowerCase().includes(q));
  }, [filter, recentFiles]);

  const topicTiles = TOPICS.map((topic, index) => ({
    title: topic,
    subtitle: `Estimated ${10 + index * 2} minutes`,
  }));

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
              Your personalized learning hub. Sign in to continue or create an
              account to get started.
            </p>
          </section>

          <section className="auth-card" aria-label="Authentication actions">
            <h2>Sign in or create an account</h2>
            <p>
              Save progress, sync across devices, and unlock tailored study
              insights across mobile and desktop.
            </p>
            <div className="auth-actions">
              <button
                type="button"
                className="filled"
                onClick={() => {
                  setIsAuthenticated(true);
                  setStatus("Signed in");
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className="outlined"
                onClick={() => {
                  setIsAuthenticated(true);
                  setStatus("Account created");
                }}
              >
                Sign Up
              </button>
            </div>
            <p className="auth-footnote">
              By continuing you agree to our Terms & Privacy.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`flutter-shell ${leftHanded ? "left-handed" : "right-handed"}`}
    >
      <header className="app-bar" role="banner">
        <div className="app-bar-leading">
          <button
            type="button"
            onClick={navigateBack}
            disabled={historyIndex <= 0}
            aria-label="Back"
          >
            Back
          </button>
        </div>
        <h1 className="app-bar-title">
          {route === "home" ? "EduLense" : ROUTE_LABELS[route]}
        </h1>
        <div className="app-bar-actions">
          <button
            type="button"
            onClick={navigateForward}
            disabled={historyIndex >= history.length - 1}
          >
            Forward
          </button>
          <button type="button" onClick={handleOpen}>
            Open
          </button>
          <button
            type="button"
            onClick={() => navigate("settings")}
            aria-label="Settings"
          >
            Settings
          </button>
        </div>
      </header>

      <nav className="desktop-utility-rail" aria-label="Desktop controls">
        <button
          type="button"
          className="rail-button primary"
          onClick={handleNew}
        >
          New
        </button>
        <button
          type="button"
          className="rail-button"
          onClick={() => handleSave(false)}
        >
          Save{dirty ? " *" : ""}
        </button>
        <button
          type="button"
          className="rail-button"
          onClick={() => window.desktop.app.toggleTrayWindow()}
        >
          Tray
        </button>
        <button
          type="button"
          className="rail-button"
          onClick={() => setShowShortcuts(true)}
        >
          Keys
        </button>
      </nav>

      <main className="screen-body" aria-live="polite">
        {route === "home" && (
          <div className="screen-stack">
            <section className="m-card hero-card">
              <h2>Welcome Back!</h2>
              <p>Your educational journey continues here.</p>
              <div className="hero-actions">
                <button type="button" className="filled" onClick={handleOpen}>
                  Open Learning File
                </button>
                <button type="button" onClick={handleOpenFolder}>
                  Open Folder
                </button>
                <button type="button" className="outlined" onClick={handleNew}>
                  Create Note
                </button>
              </div>
            </section>

            <section>
              <h3 className="section-title">Quick Actions</h3>
              <div className="action-grid">
                {QUICK_ACTIONS.map(([label, hint]) => (
                  <button
                    key={label}
                    type="button"
                    className="m-card action-card"
                    onClick={() => {
                      setStatus(hint);
                      if (label === "Assignments") navigate("files");
                      if (label === "Progress") navigate("notes");
                    }}
                  >
                    <div className="action-icon">■</div>
                    <div className="tile-title">{label}</div>
                    <div className="tile-subtitle">{hint}</div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="section-title">Recent Activity</h3>
              <div className="list-stack">
                {RECENT_ACTIVITY.map(([title, subtitle]) => (
                  <div key={title} className="m-card list-row">
                    <div className="row-icon">●</div>
                    <div className="row-copy">
                      <div className="tile-title">{title}</div>
                      <div className="tile-subtitle">{subtitle}</div>
                    </div>
                    <div className="row-chevron">›</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {route === "files" && (
          <div className="screen-stack">
            <section className="m-card">
              <h2>Explore</h2>
              <p className="tile-subtitle">
                Flutter-like list cards adapted for desktop files and topics.
              </p>
              <label className="field-label" htmlFor="file-filter">
                Search
              </label>
              <input
                id="file-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search topics or recent files"
              />
            </section>

            <section>
              <div className="list-stack">
                {topicTiles.map((tile) => (
                  <button
                    type="button"
                    key={tile.title}
                    className="m-card list-tile"
                    onClick={() => setStatus(`Opened topic ${tile.title}`)}
                  >
                    <span className="tile-leading info">Book</span>
                    <span className="tile-copy">
                      <span className="tile-title">{tile.title}</span>
                      <span className="tile-subtitle">{tile.subtitle}</span>
                    </span>
                    <span className="row-chevron">›</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="section-title">Recent Files</h3>
              <div className="list-stack">
                {filteredRecent.length === 0 ? (
                  <div className="m-card empty-state">
                    No recent files yet. Open or save a file to populate this
                    list.
                  </div>
                ) : (
                  filteredRecent.map((file) => (
                    <button
                      type="button"
                      key={file}
                      className={`m-card list-tile ${selectedRecent === file ? "selected" : ""}`}
                      onClick={() => handleOpenRecent(file)}
                      title={file}
                    >
                      <span className="tile-leading">File</span>
                      <span className="tile-copy">
                        <span className="tile-title">{formatTitle(file)}</span>
                        <span className="tile-subtitle ellipsis">{file}</span>
                      </span>
                      <span className="row-chevron">›</span>
                    </button>
                  ))
                )}
              </div>
            </section>

            {openedFolder && (
              <section>
                <h3 className="section-title">Folder Browser</h3>
                <div className="m-card">
                  <div className="tile-subtitle ellipsis">
                    {openedFolder.path}
                  </div>
                </div>
                <div className="list-stack">
                  {openedFolder.entries.length === 0 ? (
                    <div className="m-card empty-state">Folder is empty.</div>
                  ) : (
                    openedFolder.entries.slice(0, 100).map((entry) => (
                      <button
                        type="button"
                        key={entry.path}
                        className="m-card list-tile"
                        onClick={async () => {
                          if (entry.isDirectory) {
                            const next = await window.desktop.file.listDir(
                              entry.path,
                            );
                            if (next?.ok) {
                              setOpenedFolder({
                                path: next.folderPath,
                                entries: next.entries || [],
                              });
                              setStatus(`Opened folder ${next.folderPath}`);
                            } else {
                              setStatus(next?.error || "Unable to open folder");
                            }
                            return;
                          }
                          await handleOpenRecent(entry.path);
                        }}
                        title={entry.path}
                      >
                        <span
                          className={`tile-leading ${entry.isDirectory ? "info" : ""}`}
                        >
                          {entry.isDirectory ? "Dir" : "File"}
                        </span>
                        <span className="tile-copy">
                          <span className="tile-title">{entry.name}</span>
                          <span className="tile-subtitle ellipsis">
                            {entry.path}
                          </span>
                        </span>
                        <span className="row-chevron">›</span>
                      </button>
                    ))
                  )}
                </div>
              </section>
            )}
          </div>
        )}

        {route === "notes" && (
          <div className="screen-stack">
            <section className="m-card profile-card">
              <div className="avatar">SU</div>
              <div>
                <h2 className="profile-name">Student User</h2>
                <p className="tile-subtitle">student@edulense.app</p>
              </div>
            </section>

            <section className="list-stack">
              <button
                type="button"
                className="m-card list-tile"
                onClick={() => setStatus("Opened Completed Lessons")}
              >
                <span className="tile-leading success">Done</span>
                <span className="tile-copy">
                  <span className="tile-title">Completed Lessons</span>
                  <span className="tile-subtitle">
                    View your learning history
                  </span>
                </span>
                <span className="row-chevron">›</span>
              </button>
              <button
                type="button"
                className="m-card list-tile"
                onClick={() => setStatus("Opened Learning Goals")}
              >
                <span className="tile-leading">Goal</span>
                <span className="tile-copy">
                  <span className="tile-title">Learning Goals</span>
                  <span className="tile-subtitle">
                    Track your weekly targets
                  </span>
                </span>
                <span className="row-chevron">›</span>
              </button>
              <button
                type="button"
                className="m-card list-tile"
                onClick={() => {
                  setIsAuthenticated(false);
                  setRoute("home");
                  setHistory(["home"]);
                  setHistoryIndex(0);
                  setStatus("Signed out");
                }}
              >
                <span className="tile-leading warning">Out</span>
                <span className="tile-copy">
                  <span className="tile-title">Sign Out</span>
                  <span className="tile-subtitle">
                    Return to the authentication screen
                  </span>
                </span>
                <span className="row-chevron">›</span>
              </button>
            </section>

            <section className="m-card editor-card">
              <div className="editor-header">
                <div>
                  <h3 className="section-title compact">
                    Desktop Notes Workspace
                  </h3>
                  <div className="tile-subtitle">
                    {currentFilePath || "No file selected"}
                  </div>
                </div>
                <div className={`status-pill ${dirty ? "warning" : "success"}`}>
                  {dirty ? "Unsaved" : "Saved"}
                </div>
              </div>
              <textarea
                ref={editorRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setDirty(true);
                }}
                spellCheck={false}
                aria-label="Note editor"
              />
              <div className="editor-actions">
                <button
                  type="button"
                  className="filled"
                  onClick={() => handleSave(false)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="outlined"
                  onClick={() => handleSave(true)}
                >
                  Save As
                </button>
                <button type="button" onClick={handleOpen}>
                  Open
                </button>
                <button
                  type="button"
                  onClick={() =>
                    currentFilePath &&
                    window.desktop.app.showItemInFolder(currentFilePath)
                  }
                  disabled={!currentFilePath}
                >
                  Show in Folder
                </button>
              </div>
            </section>
          </div>
        )}

        {route === "settings" && (
          <div className="screen-stack">
            <section>
              <h3 className="section-title">Appearance</h3>
              <div className="m-card card-stack">
                <ThemeOption
                  label="Light Mode"
                  subtitle="Optimized for daytime use with white backgrounds"
                  selected={themeMode === "light"}
                  onClick={() => setThemeMode("light")}
                />
                <ThemeOption
                  label="Dark Mode"
                  subtitle="Easier on the eyes in low-light environments"
                  selected={themeMode === "dark"}
                  onClick={() => setThemeMode("dark")}
                />
                <ThemeOption
                  label="System Default (Desktop fallback)"
                  subtitle="Currently maps to light mode in this build"
                  selected={false}
                  onClick={() =>
                    setStatus(
                      "System theme mapping not yet implemented in main process",
                    )
                  }
                />
              </div>
            </section>

            <section>
              <h3 className="section-title">Accessibility</h3>
              <div className="m-card card-stack">
                <SwitchTile
                  title="Left-Handed Mode"
                  subtitle="Optimize desktop utility rail placement for left-handed users"
                  checked={leftHanded}
                  onChange={setLeftHanded}
                />
                <SwitchTile
                  title="Large Text"
                  subtitle="Increase font sizes for better readability"
                  checked={largeText}
                  onChange={setLargeText}
                />
                <SwitchTile
                  title="High Contrast"
                  subtitle="Use stronger borders and contrast accents"
                  checked={highContrast}
                  onChange={setHighContrast}
                />
                <SwitchTile
                  title="Auto-refresh Recent Files"
                  subtitle="Refresh Explore file list after open/save actions"
                  checked={autoRefreshRecent}
                  onChange={setAutoRefreshRecent}
                />
                <SwitchTile
                  title="Confirm Before Close (Tray Minimize)"
                  subtitle="Preference stored in UI state for native dialog integration"
                  checked={confirmTrayMinimize}
                  onChange={setConfirmTrayMinimize}
                />
              </div>
            </section>

            <section>
              <h3 className="section-title">About</h3>
              <div className="m-card about-card">
                <div className="tile-title">EduLense</div>
                <div className="tile-subtitle">Version 1.0.0</div>
                <p>
                  A mobile-first design system optimized for left-handed users
                  in educational productivity, adapted here to a desktop
                  Electron experience.
                </p>
                <div className="chip-wrap">
                  <span className="info-chip success">WCAG AA</span>
                  <span className="info-chip info">Accessible</span>
                  <span className="info-chip primary">Left-Friendly</span>
                  <span className="info-chip secondary">Desktop UI</span>
                </div>
                <div className="updater-panel">
                  <div className="tile-title">Auto Updates</div>
                  <div className="tile-subtitle">
                    {updaterStatus.message || "Updater status unavailable"} (
                    {updaterStatus.state})
                  </div>
                  <div className="editor-actions">
                    <button
                      type="button"
                      onClick={() => window.desktop.updater.check()}
                    >
                      Check
                    </button>
                    <button
                      type="button"
                      onClick={() => window.desktop.updater.download()}
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() => window.desktop.updater.install()}
                    >
                      Install & Restart
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <nav className="bottom-nav" aria-label="Main navigation tabs">
        {ROUTES.map((key) => (
          <button
            key={key}
            type="button"
            className={`bottom-nav-item ${route === key ? "active" : ""}`}
            onClick={() => navigate(key)}
            aria-current={route === key ? "page" : undefined}
          >
            <span className="bottom-nav-label">{ROUTE_LABELS[key]}</span>
          </button>
        ))}
      </nav>

      <footer className="status-bar" aria-live="polite">
        <span>{status}</span>
        <span>
          {dirty ? `Modified · ${formatTitle(currentFilePath)}` : "Synced"}
        </span>
      </footer>

      {showShortcuts && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcut-title"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <h2 id="shortcut-title">Keyboard Shortcuts</h2>
            <ul className="shortcut-list modal-list">
              {SHORTCUTS.map(([key, desc]) => (
                <li key={`modal-${key}`}>
                  <kbd>{key}</kbd>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <button
                type="button"
                autoFocus
                onClick={() => setShowShortcuts(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
