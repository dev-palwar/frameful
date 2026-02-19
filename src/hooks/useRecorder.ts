import { useContext } from "react";
import { RecorderContext } from "@/context/RecorderContext";

export function useRecorder() {
  const context = useContext(RecorderContext);
  if (!context) {
    throw new Error("useRecorder must be used within a RecorderProvider");
  }
  return context;
}
