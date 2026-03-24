import { memo } from 'react';
import type { DashboardMetric } from '../types';

function MetricCard({ label, value }: DashboardMetric) {
  return (
    <article className="metric-card">
      <span className="muted">{label}</span>
      <strong className="metric-value">{value}</strong>
    </article>
  );
}

export default memo(MetricCard);
