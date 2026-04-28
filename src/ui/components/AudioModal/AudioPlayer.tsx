import { theme } from "@/ui/styles/theme";
import { formatSeconds } from "@/ui/utils/date";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import {
  CheckIcon,
  PauseIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { styles } from "./styles";

type AudioPlayerProps = {
  audioUri: string;
  onTryAgain: () => void;
  onConfirm: () => void;
};

// TODO: listen audio from speakers and not earpiece
export function AudioPlayer({
  audioUri,
  onTryAgain,
  onConfirm,
}: AudioPlayerProps) {
  const player = useAudioPlayer(audioUri, {});

  const { duration, playing, currentTime } = useAudioPlayerStatus(player);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
      return;
    }

    player.seekTo(0);
    player.play();
  };

  return (
    <>
      <View style={styles.actionsGroup}>
        <Button
          onPress={onTryAgain}
          size="icon"
          variant="neutral"
          rippleStyle="light"
        >
          <Trash2Icon size={20} color={theme.colors.gray[500]} />
        </Button>

        <Button
          onPress={handlePlayPause}
          size="icon"
          variant="neutral"
          rippleStyle="light"
        >
          {playing && (
            <PauseIcon
              size={20}
              color={theme.colors.lime[600]}
              fill={theme.colors.lime[600]}
            />
          )}

          {!playing && (
            <PlayIcon
              size={20}
              color={theme.colors.lime[600]}
              fill={theme.colors.lime[600]}
            />
          )}
        </Button>

        <Button onPress={onConfirm} size="icon" variant="primary">
          <CheckIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </View>

      <AppText
        color={theme.colors.gray[500]}
        style={styles.actionLabel}
        align="center"
      >
        {formatSeconds(currentTime)} / {formatSeconds(duration)}
      </AppText>
    </>
  );
}
