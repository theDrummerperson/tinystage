import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if the component has mounted on the client-side.
 * @returns {boolean} True if mounted, false otherwise.
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}
