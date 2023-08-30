import { useRef, useEffect, useState } from "react";

export const useOutsideClick = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [rename, setRename] = useState<boolean>(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setRename(false);
      event.preventDefault();
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
