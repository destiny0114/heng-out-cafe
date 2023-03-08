import { useEffect, useState } from "react";

export default function useDebounce<T extends {}>(value: T, delay: number): T {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
