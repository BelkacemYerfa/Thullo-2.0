import { useGenerationStore } from "@/lib/store/Store";
import { useRef, useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const { rename, setRename } = useGenerationStore();
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setRename(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return { ref, rename, setRename };
};
