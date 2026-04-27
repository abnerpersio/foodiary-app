import { theme } from "@/ui/styles/theme";
import { formatSeconds } from "@/ui/utils/date";
import { CheckIcon, PlayIcon, Trash2Icon } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { styles } from "./styles";

type AudioPlayerProps = {
  duration: number;
};

export function AudioPlayer({ duration }: AudioPlayerProps) {
  return (
    <>
      <View style={styles.actionsGroup}>
        <Button size="icon" variant="neutral" rippleStyle="light">
          <Trash2Icon size={20} color={theme.colors.gray[500]} />
        </Button>

        <Button size="icon" variant="neutral" rippleStyle="light">
          <PlayIcon
            size={20}
            color={theme.colors.lime[600]}
            fill={theme.colors.lime[600]}
          />
        </Button>

        <Button size="icon" variant="primary">
          <CheckIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </View>

      <AppText
        color={theme.colors.gray[500]}
        style={styles.actionLabel}
        align="center"
      >
        {formatSeconds(duration)}
      </AppText>
    </>
  );
}
