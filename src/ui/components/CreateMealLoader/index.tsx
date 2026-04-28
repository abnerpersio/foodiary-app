import { View } from "react-native";

import { Meal } from "@/app/types/Meal";
import { theme } from "@/ui/styles/theme";
import { AppText } from "../AppText";
import { Logo } from "../Logo";
import { styles } from "./styles";

import { useVideoPlayer, VideoView } from "expo-video";

import video from "./ai-animation.mp4";

type CreateMealLoaderProps = {
  type: Meal.InputType;
};

export function CreateMealLoader({ type }: CreateMealLoaderProps) {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} nativeControls={false} />

      <View style={styles.content}>
        <Logo width={75} height={24} />

        <AppText align="center" color={theme.colors.gray[300]}>
          {type === Meal.InputType.AUDIO && "Estou ouvindo o seu áudio..."}
          {type === Meal.InputType.PICTURE && "Estou analisando a sua foto..."}
        </AppText>
      </View>
    </View>
  );
}
