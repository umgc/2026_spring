import { useDeferredSearch } from '../hooks/useDeferredSearch';
import { useNotesEditor } from '../hooks/useNotesEditor';
import { useNotesState } from '../state/useAppStore';
import type { Note } from '../types';

function ActiveNoteEditor({ note }: { note: Note }) {
  const { lastSavedMessage, renameNote, toggleFavoriteNote, updateNoteBody } = useNotesState();
  const { draft, saveState, updateDraft } = useNotesEditor({
    note,
    onSave: updateNoteBody,
  });

  return (
    <div className="panel">
      <div className="split-header">
        <div>
          <input
            className="note-heading"
            value={note.title}
            onChange={(event) => renameNote(note.id, event.target.value)}
            aria-label="Note title"
          />
          <p className="muted">{note.course}</p>
        </div>
        <div className="button-row">
          <button type="button" className="btn" onClick={() => toggleFavoriteNote(note.id)}>
            {note.favorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <span className="pill">{saveState === 'Saved locally' ? lastSavedMessage : saveState}</span>
        </div>
      </div>
      <textarea
        className="editor"
        aria-label="Note content"
        value={draft}
        onChange={(event) => updateDraft(event.target.value)}
      />
    </div>
  );
}

export default function NotesScreen() {
  const { notes, activeNoteId, setActiveNote, createNote } = useNotesState();
  const { query, filteredItems, setQuery, isPending } = useDeferredSearch(
    notes,
    (note, normalized) =>
      note.title.toLowerCase().includes(normalized) ||
      note.course.toLowerCase().includes(normalized) ||
      note.tags.some((tag) => tag.toLowerCase().includes(normalized)),
  );

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? notes[0] ?? null;

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Notes</h1>
          <p className="page-subtitle">Local-first study notes with offline editing.</p>
        </div>
        <div className="button-row">
          <button type="button" className="btn btn-primary" onClick={createNote}>
            New note
          </button>
        </div>
      </header>

      <div className="notes-layout">
        <aside className="notes-sidebar">
          <div className="panel">
            <label className="search" htmlFor="note-search">
              <span className="sr-only">Search notes</span>
              <input
                id="note-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search notes"
              />
            </label>
            {isPending ? <span className="pill">Searching notes...</span> : null}
            <div className="note-list">
              {filteredItems.length > 0 ? (
                filteredItems.map((note) => (
                  <button
                    key={note.id}
                    type="button"
                    className={`note-card${note.id === activeNoteId ? ' is-active' : ''}`}
                    onClick={() => setActiveNote(note.id)}
                  >
                    <div className="split-header">
                      <strong>{note.title}</strong>
                      <span className={`pill${note.favorite ? ' success' : ''}`}>
                        {note.favorite ? 'Favorite' : 'Saved'}
                      </span>
                    </div>
                    <p className="muted">
                      {note.course} · {note.date}
                    </p>
                    <div className="note-tags">
                      {note.tags.map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              ) : (
                <div className="empty-state">
                  <strong>No notes match that search.</strong>
                  <p className="muted">Try another keyword or create a new note.</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="notes-editor">
          {activeNote ? (
            <ActiveNoteEditor key={activeNote.id} note={activeNote} />
          ) : (
            <div className="panel">
              <p className="muted">Create a note to start writing.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
