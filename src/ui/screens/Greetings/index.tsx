import { ImageBackground } from "react-native";

import greetingsBg from "@/ui/assets/greetings-bg/image.jpg";
import { Logo } from "@/ui/components/Logo";
import { styles } from "./styles";

export function Greetings() {
  return (
    <ImageBackground
      source={greetingsBg}
      resizeMode="cover"
      style={styles.container}
    >
      <Logo />
    </ImageBackground>
  );
}
