import { useEffect, useState } from 'react';
import type { Note } from '../types';

type UseNotesEditorOptions = {
  note: Note;
  onSave: (id: string, body: string) => void;
};

export function useNotesEditor({ note, onSave }: UseNotesEditorOptions) {
  const [draft, setDraft] = useState(note.body);
  const [saveState, setSaveState] = useState('Saved locally');

  useEffect(() => {
    if (draft === note.body) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      // Debounce local persistence so note editing does not thrash global state on every keystroke.
      onSave(note.id, draft);
      setSaveState('Saved locally');
    }, 240);

    return () => window.clearTimeout(timerId);
  }, [draft, note.body, note.id, onSave]);

  const updateDraft = (body: string) => {
    setDraft(body);
    setSaveState('Saving...');
  };

  return {
    draft,
    saveState,
    updateDraft,
  };
}
