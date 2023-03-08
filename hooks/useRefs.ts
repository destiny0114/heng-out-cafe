import { HTMLAttributes, useRef } from "react";

export default function useRefs<T>(initialValue: T) {
  const refs = useRef<T>(initialValue);

  const addToRefs = (el: any) => {
    if (!Array.isArray(refs.current)) return;

    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return { elements: refs.current, addToRefs };
}
