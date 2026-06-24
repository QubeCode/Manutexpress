import { useEffect, useRef } from "react";

/** Smooth-scroll to a form container whenever a multistep form advances or goes back. */
export function useScrollToRefOnStepChange<T>(step: T) {
  const ref = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [step]);

  return ref;
}
