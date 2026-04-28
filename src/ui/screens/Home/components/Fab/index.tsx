import { View } from "react-native";

import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { CreateMealOptions } from "@/ui/components/CreateMealOptions";
import { theme } from "@/ui/styles/theme";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { PlusIcon } from "lucide-react-native";
import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export function Fab() {
  const { bottom } = useSafeAreaInsets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <View style={[styles.buttonContainer, { bottom: Math.max(bottom, 16) }]}>
        <Button size="icon" onPress={handleOpenBottomSheet}>
          <PlusIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          style={styles.bottomSheet}
          enablePanDownToClose
        >
          <BottomSheetView
            style={[styles.content, { paddingBottom: Math.max(bottom, 24) }]}
          >
            <AppText style={styles.title} size="lg" weight="semiBold">
              Cadastre sua refeição
            </AppText>

            <CreateMealOptions
              onCreate={() => bottomSheetModalRef.current?.dismiss()}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
