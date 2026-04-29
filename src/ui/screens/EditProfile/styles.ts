import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 24,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 110,
    height: 110,
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[400],
    backgroundColor: theme.colors.white,
  },
});
