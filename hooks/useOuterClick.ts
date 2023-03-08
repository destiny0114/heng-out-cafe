import { useEffect, useRef } from "react";

export default function useOuterClick<T extends Element>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleOuterClick = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) return;
      // e.stopPropagation();
      callback();
    };

    document.addEventListener("click", handleOuterClick, { capture: true });
    return () => document.removeEventListener("click", handleOuterClick, { capture: true });
  }, [callback]);

  return ref;
}
