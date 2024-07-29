import { MainLayoutContext } from "@/contexts/mainLayoutContext";
import { useContext } from "react";

export function useMainLayoutRef() {
  const mainLayoutRef = useContext(MainLayoutContext);
  if (mainLayoutRef === null) return;
  return mainLayoutRef;
}
