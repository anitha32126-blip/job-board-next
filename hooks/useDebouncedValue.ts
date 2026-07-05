import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

export function useDebouncedValue<T>(
  value: T,
  delay: number
) {
  const [debouncedValue, setDebouncedValue] =
    useState(value);

 const timeoutRef = useRef<number | null>(null);

  const updateValue =
    useCallback(() => {
      setDebouncedValue(value);
    }, [value]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(
      updateValue,
      delay
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, updateValue]);

  return debouncedValue;
}