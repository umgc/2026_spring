import { vi } from "vitest";
import { Outlet, Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppShell from "../AppShell";
import { resetAppStore, renderWithRouter } from "../../../test/testUtils";
import useAppStore from "../../state/useAppStore";

vi.mock("../../hooks/useOnlineStatus", () => ({
  __esModule: true,
  default: vi.fn(() => false),
}));

vi.mock("../../hooks/usePwaRegistration", () => ({
  __esModule: true,
  default: vi.fn(() => ({ triggerInstall: vi.fn() })),
}));

function renderShell(route = "/dashboard") {
  useAppStore.setState({
    currentUser: { name: "Demo Student", email: "demo@edulence.app" },
    installReady: true,
  });
  return renderWithRouter(
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<div>Home</div>} />
        <Route path="dashboard" element={<div>Dashboard child</div>} />
        <Route path="notes" element={<div>Notes child</div>} />
        <Route path="settings/*" element={<div>Settings child</div>} />
        <Route path="courses" element={<Outlet />} />
      </Route>
      <Route path="/auth/signin" element={<div>Signed out screen</div>} />
    </Routes>,
    route,
  );
}

describe("AppShell", () => {
  beforeEach(() => {
    resetAppStore();
    document.documentElement.dataset.theme = "";
    document.documentElement.dataset.scale = "";
    document.documentElement.dataset.contrast = "";
    document.documentElement.dir = "ltr";
  });

  it("renders user info, offline banner, and applies accessibility attributes", () => {
    useAppStore.setState({
      themeMode: "dark",
      largeText: true,
      highContrast: true,
      leftHandedMode: true,
    });
    renderShell();
    expect(screen.getByText("Demo Student")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/you are offline/i);
    expect(screen.getByText("Dashboard child")).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.scale).toBe("large");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(document.documentElement.dir).toBe("rtl");
    expect(
      screen.getByRole("button", { name: /install app/i }),
    ).toBeInTheDocument();
  });

  it("opens the mobile drawer and signs out the current user", async () => {
    const user = userEvent.setup();
    renderShell();
    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    expect(
      screen.getByRole("button", { name: /^close$/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /sign out/i }));
    expect(screen.getByText("Signed out screen")).toBeInTheDocument();
    expect(useAppStore.getState().currentUser).toBeNull();
  });

  it("navigates to settings from the sidebar action", async () => {
    const user = userEvent.setup();
    renderShell();
    await user.click(
      screen.getByRole("button", { name: /accessibility settings/i }),
    );
    expect(screen.getByText("Settings child")).toBeInTheDocument();
  });
});
