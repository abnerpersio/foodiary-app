import { useState } from "react";

export type AudioModalState = "idle" | "recording" | "recorded";

export function useAudioModal() {
  const [state, setState] = useState<AudioModalState>("idle");

  const handleStartRecording = () => {
    setState("recording");
  };

  const handleStopRecording = () => {
    setState("recorded");
  };

  return {
    state,
    handleStartRecording,
    handleStopRecording,
  };
}
