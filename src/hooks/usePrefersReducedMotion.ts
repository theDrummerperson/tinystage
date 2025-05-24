import { useEffect, useState } from 'react';

const getInitialPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Custom hook to detect user's preference for reduced motion.
 * Listens for changes to this preference.
 * @returns {boolean} True if the user prefers reduced motion, false otherwise.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialPreference(),
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Ensure initial state is up-to-date on client mount
    setPrefersReducedMotion(motionQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    motionQuery.addEventListener('change', handleChange);
    return () => {
      motionQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
