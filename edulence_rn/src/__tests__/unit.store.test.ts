import { useAppStore } from "../store/useAppStore";

describe("App store business logic", () => {
  beforeEach(() => {
    useAppStore.setState({
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
    });
  });

  it("signs in with valid credentials", () => {
    const result = useAppStore
      .getState()
      .signIn("demo@edulence.app", "demo1234");

    expect(result.success).toBe(true);
    expect(useAppStore.getState().currentUser?.email).toBe("demo@edulence.app");
    expect(useAppStore.getState().authError).toBeNull();
  });

  it("rejects invalid sign in", () => {
    const result = useAppStore.getState().signIn("demo@edulence.app", "wrong");

    expect(result.success).toBe(false);
    expect(useAppStore.getState().currentUser).toBeNull();
    expect(useAppStore.getState().authError).toBe("Invalid email or password.");
  });

  it("creates a new account and signs user in", () => {
    const result = useAppStore
      .getState()
      .signUp("Kwame User", "kwame@example.com", "secure123");

    expect(result.success).toBe(true);
    expect(useAppStore.getState().currentUser?.email).toBe("kwame@example.com");
    expect(useAppStore.getState().users).toHaveLength(2);
  });

  it("prevents duplicate account creation", () => {
    const result = useAppStore
      .getState()
      .signUp("Duplicate", "demo@edulence.app", "secure123");

    expect(result.success).toBe(false);
    expect(result.message).toBe("An account with this email already exists.");
  });

  it("signs out current user", () => {
    useAppStore.getState().signIn("demo@edulence.app", "demo1234");

    useAppStore.getState().signOut();

    expect(useAppStore.getState().currentUser).toBeNull();
    expect(useAppStore.getState().authError).toBeNull();
  });
});
