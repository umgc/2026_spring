import { useAuthState } from '../state/useAppStore';
import useAppStore from '../state/useAppStore';

const stats = [
  { label: 'Courses Enrolled', value: '4' },
  { label: 'Assignments Done', value: '17' },
  { label: 'Average Score', value: '92%' },
];

export default function ProfileScreen() {
  const { currentUser } = useAuthState();
  const appMeta = useAppStore((state) => state.appMeta);

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Account details and learning stats.</p>
        </div>
      </header>

      <div className="profile-grid">
        <article className="profile-card">
          <h2>{currentUser?.name ?? 'Guest Student'}</h2>
          <p className="muted">{currentUser?.email ?? 'guest@edulence.app'}</p>
          <p className="muted">{appMeta.description}</p>
        </article>

        <article className="profile-card">
          <h2>Snapshot</h2>
          <div className="metrics-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="metric-card">
                <strong className="metric-value">{stat.value}</strong>
                <span className="muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
