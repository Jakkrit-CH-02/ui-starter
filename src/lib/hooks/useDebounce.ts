import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  value: string;
  /** Delay in milliseconds */
  delay: number;
};

/**
 * Keeps a debounced copy of a string, e.g. a search keyword.
 * Call `setValue` on every keystroke; `value` updates after `delay` ms of silence.
 */
export const useDebounce = ({ value, delay }: Options) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const setValue = useCallback(
    (next: string) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDebounceValue(next), delay);
    },
    [delay]
  );

  return {
    value: debounceValue,
    setValue,
    /** Sets the value immediately, skipping the delay */
    setDebounceValue,
  };
};

export default useDebounce;
