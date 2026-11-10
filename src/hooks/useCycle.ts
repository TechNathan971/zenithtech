import { useEffect, useState } from "react";

/**
 * Steps through 0..length-1 while `active` is true, starting from step 0.
 * When it stops being active, it settles back on `restStep` (the finished state).
 */
export function useCycle(active: boolean, length: number, intervalMs: number, restStep: number) {
  const [step, setStep] = useState(restStep);

  useEffect(() => {
    if (!active) {
      const reset = setTimeout(() => setStep(restStep), 300);
      return () => clearTimeout(reset);
    }
    const kick = setTimeout(() => setStep(0), 250);
    const id = setInterval(() => setStep((s) => (s + 1) % length), intervalMs);
    return () => {
      clearTimeout(kick);
      clearInterval(id);
    };
  }, [active, length, intervalMs, restStep]);

  return step;
}
