import { useState } from 'react';
import { exploreItems } from '../data/mockData';
import { useDeferredSearch } from '../hooks/useDeferredSearch';

export default function ExploreScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(exploreItems[0]?.id ?? null);
  const { query, filteredItems, setQuery, isPending } = useDeferredSearch(
    exploreItems,
    (item, normalized) =>
      item.title.toLowerCase().includes(normalized) || item.category.toLowerCase().includes(normalized),
  );

  const selectedItem = filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0] ?? null;

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Explore</h1>
          <p className="page-subtitle">Search course recommendations and learning tracks.</p>
        </div>
      </header>

      <div className="panel">
        <label className="search" htmlFor="explore-search">
          <span className="sr-only">Search recommendations</span>
          <input
            id="explore-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses or categories"
          />
        </label>
        {isPending ? <span className="pill">Filtering results...</span> : null}

        <div className="dashboard-grid">
          <div className="activity-grid">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`activity-card${selectedId === item.id ? ' is-active' : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <strong>{item.title}</strong>
                <p className="pill-row">
                  <span className="pill">{item.category}</span>
                </p>
                <p className="muted">{item.description}</p>
              </button>
            ))}
          </div>

          <aside className="detail-card">
            <h2>Selected course</h2>
            {selectedItem ? (
              <>
                <strong>{selectedItem.title}</strong>
                <span className="pill">{selectedItem.category}</span>
                <p className="muted">{selectedItem.description}</p>
                <button type="button" className="btn btn-primary">
                  Save to learning plan
                </button>
              </>
            ) : (
              <div className="empty-state">
                <strong>No results found.</strong>
                <p className="muted">Try another keyword or browse all recommendations.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
