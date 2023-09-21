import { useEffect, useState } from "react";

export const useMounted = () => {
  const [isMounded, setIsMounded] = useState(false);
  useEffect(() => {
    setIsMounded(true);
    return () => setIsMounded(false);
  }, []);
  return [isMounded];
};
