import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black[900],
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    paddingTop: 12,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  picture: {
    flex: 1,
    width: "100%",
  },
  permissionContainer: {
    alignItems: "center",
    gap: 8,
  },
  permissionLabel: {
    maxWidth: 260,
  },
  footer: {
    height: 112,
    marginTop: 24,
    marginBottom: 32,
  },
  actionsContainer: {
    gap: 16,
    alignItems: "center",
  },
  actionLabel: {
    maxWidth: 180,
  },
  actionsGroup: {
    flexDirection: "row",
    gap: 32,
  },
});
