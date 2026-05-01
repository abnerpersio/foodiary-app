import { File } from "expo-file-system";

export const getFileInfo = (fileUri: string) => {
  const file = new File(fileUri).info();
  const filename = fileUri.split("/").at(-1);

  if (!file.exists || !file.size || !filename) {
    throw new Error(`${fileUri} file does not exists`);
  }

  const type =
    filename.endsWith(".jpeg") ||
    filename.endsWith(".jpg") ||
    filename.endsWith(".png")
      ? "image/jpeg"
      : "audio/m4a";

  return {
    size: file.size,
    filename,
    type,
  } as const;
};
