import '@testing-library/jest-dom';

const originalMatchMedia = window.matchMedia;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // @ts-expect-error test shim
  global.IntersectionObserver = MockIntersectionObserver;
  // @ts-expect-error test shim
  global.ResizeObserver = MockResizeObserver;
});

afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});
