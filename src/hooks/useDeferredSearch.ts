import { startTransition, useDeferredValue, useMemo, useState } from 'react';

export function useDeferredSearch<T>(items: T[], predicate: (item: T, query: string) => boolean) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const filteredItems = useMemo(() => {
    // Search work follows the deferred value so typing stays responsive.
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) {
      return items;
    }

    return items.filter((item) => predicate(item, normalized));
  }, [deferredQuery, items, predicate]);

  const updateQuery = (nextValue: string) => {
    startTransition(() => setQuery(nextValue));
  };

  return {
    query,
    deferredQuery,
    filteredItems,
    setQuery: updateQuery,
    isPending: query !== deferredQuery,
  };
}
