import { useUpdateProfilePicture } from "@/app/hooks/mutations/useUpdateProfilePicture";
import { useAccount } from "@/app/hooks/queries/useAccount";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useEditPicture() {
  const { account } = useAccount();

  const [pictureUri, setPictureUri] = useState<string | null>(
    account?.profile?.profileImage || null,
  );

  const { uploadPicture, isLoading } = useUpdateProfilePicture();

  useEffect(() => {
    setPictureUri(account?.profile?.profileImage ?? null);
  }, [account?.profile?.profileImage]);

  const handleUpdatePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;
    const asset = result.assets[0];

    try {
      await uploadPicture(asset.uri);
      setPictureUri(asset.uri);
    } catch {
      Alert.alert("Oops!", "Não foi possível atualizar a foto de perfil.");
    }
  };

  return {
    pictureUri,
    isLoading,
    handleUpdatePicture,
  };
}
