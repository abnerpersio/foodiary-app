import { useCreateMeal } from "@/app/hooks/mutations/useCreateMeal";
import { useMeal } from "@/app/hooks/queries/useMeal";
import { AppStackNavigationProps } from "@/app/navigation/AppStack";
import { Meal } from "@/app/types/Meal";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export type AudioModalState = "idle" | "recording" | "recorded";

type UseAudioModalParams = {
  onClose: () => void;
  onCreate?: () => void;
};

export function useAudioModal({ onClose, onCreate }: UseAudioModalParams) {
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const queryClient = useQueryClient();

  const [state, setState] = useState<AudioModalState>("idle");
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const memoizedOnClose = useRef(onClose);
  memoizedOnClose.current = onClose;
  const memoizedOnCreate = useRef(onCreate);
  memoizedOnCreate.current = onClose;

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

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

  useEffect(() => {
    async function load() {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        Alert.alert("A permissão de acesso ao microfone foi negada");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
        shouldRouteThroughEarpiece: false,
      });
    }

    load();
  }, []);

  const handleStartRecording = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setState("recording");
  };

  const handleStopRecording = useCallback(async () => {
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri);
    setState("recorded");
  }, []);

  const handleTryAgain = async () => {
    setState("idle");
  };

  const handleConfirm = async () => {
    if (!audioUri) return;

    try {
      await createMeal(audioUri);
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Ocorreu um erro ao criar a sua refeição");
    }
  };

  return {
    state,
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    audioUri,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirm,
  };
}
