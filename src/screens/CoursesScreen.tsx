import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import CourseCard from '../components/CourseCard';
import Modal from '../components/Modal';
import { useDeferredSearch } from '../hooks/useDeferredSearch';
import { useCourseState } from '../state/useAppStore';
import type { CourseDraft } from '../types';
import { validateCourseForm } from '../utils/validation';

const emptyCourse: CourseDraft = {
  title: '',
  code: '',
  instructor: '',
  credits: 3,
  progress: 0,
  schedule: '',
  description: '',
};

export default function CoursesScreen() {
  const { courses, addCourse } = useCourseState();
  const [tab, setTab] = useState<'all' | 'progress' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState<CourseDraft>(emptyCourse);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseDraft, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { query, deferredQuery, filteredItems, setQuery, isPending } = useDeferredSearch(
    courses,
    (course, normalized) =>
      course.title.toLowerCase().includes(normalized) ||
      course.code.toLowerCase().includes(normalized) ||
      course.instructor.toLowerCase().includes(normalized),
  );

  const filteredCourses = useMemo(() => {
    return filteredItems.filter((course) => {
      return (
        tab === 'all' ||
        (tab === 'progress' && course.progress < 100) ||
        (tab === 'completed' && course.progress >= 100)
      );
    });
  }, [filteredItems, tab]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateCourseForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    addCourse(values);
    setValues(emptyCourse);
    setErrors({});
    setIsModalOpen(false);
    setIsSaving(false);
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-subtitle">Manage your active and completed courses.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          Add Course
        </button>
      </header>

      <div className="panel">
        <div className="toolbar">
          <label className="search" htmlFor="course-search">
            <span className="sr-only">Search courses</span>
            <input
              id="course-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses"
            />
          </label>
          {isPending && query !== deferredQuery ? <span className="pill">Searching...</span> : null}
          <div className="tab-row" role="tablist" aria-label="Course filters">
            {[
              ['all', `All (${courses.length})`],
              ['progress', `In Progress (${courses.filter((course) => course.progress < 100).length})`],
              ['completed', `Completed (${courses.filter((course) => course.progress >= 100).length})`],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                className={`tab-chip${tab === value ? ' is-active' : ''}`}
                onClick={() => setTab(value as 'all' | 'progress' | 'completed')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

            {filteredCourses.length > 0 ? (
              <div className="course-grid">
                <h2 className="sr-only">Course list</h2>
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
        ) : (
          <div className="empty-state">
            <strong>No courses match this filter.</strong>
            <p className="muted">Try a different search term or add a new course.</p>
          </div>
        )}
      </div>

      {isModalOpen ? (
        <Modal title="Add course" onClose={() => setIsModalOpen(false)}>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            {[
              ['title', 'Title'],
              ['code', 'Code'],
              ['instructor', 'Instructor'],
              ['schedule', 'Schedule'],
            ].map(([name, label]) => (
              <div key={name} className="field">
                <label htmlFor={name}>{label}</label>
                <input id={name} name={name} value={values[name as keyof CourseDraft]} onChange={handleChange} />
                {errors[name as keyof CourseDraft] ? (
                  <span className="field-error">{errors[name as keyof CourseDraft]}</span>
                ) : null}
              </div>
            ))}

            <div className="field">
              <label htmlFor="credits">Credits</label>
              <input id="credits" name="credits" type="number" min="1" max="6" value={values.credits} onChange={handleChange} />
              {errors.credits ? <span className="field-error">{errors.credits}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="progress">Progress</label>
              <input id="progress" name="progress" type="number" min="0" max="100" value={values.progress} onChange={handleChange} />
              {errors.progress ? <span className="field-error">{errors.progress}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={values.description} onChange={handleChange} />
            </div>

            <div className="button-row">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save course'}
              </button>
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)} disabled={isSaving}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </section>
  );
}
