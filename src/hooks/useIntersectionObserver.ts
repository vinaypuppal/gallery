import { useEffect } from 'react';

export const useIntersectionObserver = ({ root = null, target, onIntersect, threshold = 1.0, rootMargin = '0px' }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: root ? root.current : null,
      rootMargin,
      threshold,
    });

    if (!target) {
      console.warn(`No target specified for Intersection Observer.`);
      return;
    }

    const current = target.current;

    if (!current) {
      console.warn(`target is not a DOM element.`);
      return;
    }

    observer.observe(current);

    // Let's clean up after ourselves.
    return () => {
      observer.unobserve(current);
    };
  }, [root, target, rootMargin, threshold, onIntersect]);
};
