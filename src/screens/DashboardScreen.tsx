import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import MetricCard from '../components/MetricCard';
import { activities, dashboardMetrics, quickActions, upcomingItems } from '../data/mockData';
import { useCourseState } from '../state/useAppStore';

export default function DashboardScreen() {
  const { courses } = useCourseState();

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back. Here is your learning overview.</p>
        </div>
        <div className="button-row">
          <Link className="btn btn-primary" to="/courses">
            New Course
          </Link>
          <Link className="btn btn-ghost" to="/notes">
            Open Notes
          </Link>
        </div>
      </header>

      <div className="metrics-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="split-header">
            <div>
              <h2>Quick actions</h2>
              <p className="muted">Primary workflows across mobile and desktop features.</p>
            </div>
          </div>
          <div className="course-grid">
            {quickActions.map((action) => (
              <Link key={action.id} className="activity-card" to={action.href}>
                <strong>{action.label}</strong>
                <p className="muted">{action.detail}</p>
              </Link>
            ))}
          </div>
          <div className="course-grid">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <aside className="panel">
          <div>
            <h2>Upcoming</h2>
            <p className="muted">Deadlines and events carried from the desktop view.</p>
          </div>
          <div className="activity-grid">
            {upcomingItems.map((item) => (
              <article key={item.title} className="activity-card">
                <strong>{item.title}</strong>
                <p className="muted">{item.meta}</p>
              </article>
            ))}
          </div>
          <div>
            <h2>Recent activity</h2>
            <div className="activity-grid">
              {activities.map((item) => (
                <article key={item} className="activity-card">
                  {item}
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
