import { useCreateMeal } from "@/app/hooks/mutations/useCreateMeal";
import { useMeal } from "@/app/hooks/queries/useMeal";
import { AppStackNavigationProps } from "@/app/navigation/AppStack";
import { Meal } from "@/app/types/Meal";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export type AudioModalState = "idle" | "recording" | "recorded";

type UsePictureModalParams = {
  onClose: () => void;
  onCreate?: () => void;
};

export function usePictureModal({ onClose, onCreate }: UsePictureModalParams) {
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const queryClient = useQueryClient();

  const [permission, requestPermission] = useCameraPermissions();
  const [pictureUri, setPictureUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const memoizedOnClose = useRef(onClose);
  memoizedOnClose.current = onClose;
  const memoizedOnCreate = useRef(onCreate);
  memoizedOnCreate.current = onClose;

  const {
    createMeal,
    isLoading: isCreatingMeal,
    createdMealId,
  } = useCreateMeal();

  const {
    meal,
    isLoading: isLoadingMeal,
    isProcessing: isProcessingMeal,
  } = useMeal(createdMealId);

  useEffect(() => {
    if (!meal?.status) return;

    if (meal.status === Meal.Status.FAILED) {
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição");
    }

    if (meal.status === Meal.Status.SUCCESS) {
      navigate("MealDetails", { mealId: meal.id });
      queryClient.invalidateQueries({
        queryKey: ["meals"],
        exact: false,
      });
      memoizedOnClose.current();
      memoizedOnCreate.current?.();
    }
  }, [meal?.status, meal?.id, navigate]);

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

  const handleConfirm = async () => {
    if (!pictureUri) return;

    try {
      await createMeal(pictureUri);
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição");
    }
  };

  return {
    cameraRef,
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    permission,
    pictureUri,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
  };
}
