import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    flex: 1,
  },
  ctaContainer: {
    width: "100%",
    alignItems: "center",
  },
  heading: {
    letterSpacing: -0.32,
    textAlign: "center",
    maxWidth: 311,
  },
  ctaContent: {
    width: "100%",
    marginTop: 24,
    padding: 20,
  },
  signInContainer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 4,
    paddingVertical: 14,
    justifyContent: "center",
  },
});
