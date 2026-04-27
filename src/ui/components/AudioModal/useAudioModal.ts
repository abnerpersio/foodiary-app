import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export type AudioModalState = "idle" | "recording" | "recorded";

export function useAudioModal() {
  const [state, setState] = useState<AudioModalState>("idle");
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY);

  useEffect(() => {
    async function load() {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        Alert.alert("A permissão de acesso ao microfone foi negada");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    }

    load();
  }, []);

  const handleStartRecording = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setState("recording");
  };

  const handleStopRecording = useCallback(async () => {
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri);
    setState("recorded");
  }, []);

  const handleTryAgain = async () => {
    setState("idle");
  };

  const handleConfirm = async () => {};

  return {
    state,
    isLoading: false,
    audioUri,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirm,
  };
}
