import { memo } from 'react';
import type { Course } from '../types';
import ProgressBar from './ProgressBar';

function CourseCard({ course }: { course: Course }) {
  const isComplete = course.progress >= 100 || course.status === 'Completed';

  return (
    <article className="course-card" aria-label={`${course.title}, ${course.status}`}>
      <div className="split-header">
        <div>
          <h3>{course.title}</h3>
          <p className="muted">
            {course.instructor} · {course.credits} credits
          </p>
        </div>
        <span className={`pill ${isComplete ? 'success' : ''}`} aria-hidden="true">
          {course.code}
        </span>
      </div>
      <p className="muted">{course.description}</p>
      <div className="progress-row">
        <strong>{course.progress}% complete</strong>
        <span className={`pill ${isComplete ? 'success' : 'warning'}`}>{course.status}</span>
      </div>
      <ProgressBar value={course.progress} label={`${course.title} progress`} />
      <div className="course-meta">
        <span>{course.schedule}</span>
      </div>
    </article>
  );
}

export default memo(CourseCard);