import { renderHook, act } from '@testing-library/react';
import usePwaRegistration from '../usePwaRegistration';
import { resetAppStore } from '../../../test/testUtils';
import useAppStore from '../../state/useAppStore';

describe('usePwaRegistration', () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    resetAppStore();
  });

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      configurable: true,
      value: originalNavigator,
    });
  });

  it('registers a service worker and handles install acceptance', async () => {
    const register = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(global, 'navigator', {
      configurable: true,
      value: {
        ...originalNavigator,
        serviceWorker: { register },
      },
    });

    const prompt = jest.fn().mockResolvedValue(undefined);
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { result, unmount } = renderHook(() => usePwaRegistration());
    expect(register).toHaveBeenCalledWith('/service-worker.js');

    const handler = addSpy.mock.calls.find(([name]) => name === 'beforeinstallprompt')?.[1] as EventListener;
    const fakeEvent = {
      preventDefault: jest.fn(),
      prompt,
      userChoice: Promise.resolve({ outcome: 'accepted' as const }),
    } as unknown as Event;

    act(() => {
      handler(fakeEvent);
    });

    expect(useAppStore.getState().installReady).toBe(true);
    let accepted = false;
    await act(async () => {
      accepted = await result.current.triggerInstall();
    });
    expect(accepted).toBe(true);
    expect(prompt).toHaveBeenCalled();
    expect(useAppStore.getState().installReady).toBe(false);

    unmount();
    expect(removeSpy).toHaveBeenCalledWith('beforeinstallprompt', expect.any(Function));
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('returns false when no install prompt is available', async () => {
    Object.defineProperty(global, 'navigator', {
      configurable: true,
      value: {
        ...originalNavigator,
        serviceWorker: { register: jest.fn().mockResolvedValue(undefined) },
      },
    });

    const { result } = renderHook(() => usePwaRegistration());
    await expect(result.current.triggerInstall()).resolves.toBe(false);
  });
});
