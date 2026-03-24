import type { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  title: string;
};

export default function Modal({ children, onClose, title }: ModalProps) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="split-header">
          <h2>{title}</h2>
          <button type="button" className="btn" onClick={onClose} aria-label="Close dialog">
            Close
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
