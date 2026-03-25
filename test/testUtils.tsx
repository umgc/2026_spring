import type { PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import useAppStore from '../src/state/useAppStore';

export function resetAppStore() {
  useAppStore.persist.clearStorage();
  useAppStore.setState(useAppStore.getInitialState(), true);
}

export function renderWithRouter(ui: ReactElement, route = '/') {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <MemoryRouter
        initialEntries={[route]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {children}
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
