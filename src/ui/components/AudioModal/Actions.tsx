import { MAX_AUDIO_DURATION_SECONDS } from "@/app/config/audio";
import { theme } from "@/ui/styles/theme";
import { formatSeconds, SECOND } from "@/ui/utils/date";
import { MicIcon, SquareIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { AudioPlayer } from "./AudioPlayer";
import { styles } from "./styles";
import { AudioModalState } from "./useAudioModal";

type ActionsProps = {
  state: AudioModalState;
  audioUri: string | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTryAgain: () => void;
  onConfirm: () => void;
};

export function Actions({
  state,
  audioUri,
  onStartRecording,
  onStopRecording,
  onTryAgain,
  onConfirm,
}: ActionsProps) {
  const [recordingTimeInSeconds, setRecordingTimeInSeconds] = useState(0);

  const handleTryAgain = () => {
    setRecordingTimeInSeconds(0);
    onTryAgain();
  };

  useEffect(() => {
    if (state !== "recording") return;

    const intervalId = setInterval(
      () => setRecordingTimeInSeconds((prevState) => prevState + 1),
      SECOND,
    );

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [state]);

  useEffect(() => {
    if (recordingTimeInSeconds >= MAX_AUDIO_DURATION_SECONDS) {
      onStopRecording();
    }
  }, [recordingTimeInSeconds, onStopRecording]);

  if (state === "idle") {
    return (
      <>
        <Button
          onPress={onStartRecording}
          size="icon"
          variant="neutral"
          rippleStyle="light"
        >
          <MicIcon size={20} color={theme.colors.lime[600]} />
        </Button>

        <AppText
          color={theme.colors.gray[500]}
          style={styles.actionLabel}
          align="center"
        >
          Clique no microfone para começar a gravar
        </AppText>
      </>
    );
  }

  if (state === "recording") {
    return (
      <>
        <Button
          onPress={onStopRecording}
          size="icon"
          variant="neutral"
          rippleStyle="light"
        >
          <SquareIcon
            size={20}
            color={theme.colors.lime[600]}
            fill={theme.colors.lime[600]}
          />
        </Button>

        <AppText
          color={theme.colors.gray[500]}
          style={styles.actionLabel}
          align="center"
        >
          {formatSeconds(recordingTimeInSeconds)}
        </AppText>
      </>
    );
  }

  if (state === "recorded" && audioUri) {
    return (
      <AudioPlayer
        audioUri={audioUri}
        onTryAgain={handleTryAgain}
        onConfirm={onConfirm}
      />
    );
  }

  return null;
}
