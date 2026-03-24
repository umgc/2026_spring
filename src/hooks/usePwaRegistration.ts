import { useEffect, useState } from 'react';
import { usePreferenceActions } from '../state/useAppStore';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function usePwaRegistration() {
  const { setInstallReady } = usePreferenceActions();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return undefined;
    }

    void navigator.serviceWorker.register('/service-worker.js');

    const beforeInstallPrompt = (event: Event) => {
      const nextEvent = event as BeforeInstallPromptEvent;
      nextEvent.preventDefault();
      setInstallPrompt(nextEvent);
      setInstallReady(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
    };
  }, [setInstallReady]);

  const triggerInstall = async () => {
    if (!installPrompt) return false;
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    setInstallReady(false);
    setInstallPrompt(null);
    return result.outcome === 'accepted';
  };

  return { triggerInstall };
}
