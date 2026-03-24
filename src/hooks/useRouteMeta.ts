import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { navItems } from '../data/mockData';

export function useRouteMeta() {
  const location = useLocation();

  return useMemo(() => {
    return navItems.find((item) => location.pathname.startsWith(item.to.replace('/appearance', ''))) ?? null;
  }, [location.pathname]);
}
