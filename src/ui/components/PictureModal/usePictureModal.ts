import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";

export type AudioModalState = "idle" | "recording" | "recorded";

export function usePictureModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const [pictureUri, setPictureUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      imageType: "jpg",
    });

    setPictureUri(picture.uri);
  };

  const handleTryAgain = async () => {
    setPictureUri(null);
  };

  const handleConfirm = async () => {};

  return {
    cameraRef,
    isLoading: false,
    permission,
    pictureUri,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
  };
}
