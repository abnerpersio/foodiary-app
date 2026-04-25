import { WelcomeModal } from "@/ui/components/WelcomeModal";
import { theme } from "@/ui/styles/theme";
import { useState } from "react";
import { FlatList, RefreshControl, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "./components/EmptyState";
import { Header } from "./components/Header";
import { ItemSeparator } from "./components/ItemSeparator";
import { MealCard } from "./components/MealCard";
import { styles } from "./styles";

export function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { bottom, top } = useSafeAreaInsets();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    setIsRefreshing(false);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar animated translucent barStyle="dark-content" />

      <WelcomeModal />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => String(item)}
        contentContainerStyle={[
          styles.listItemContent,
          { paddingBottom: Math.max(bottom, 24) + 24 },
        ]}
        ListHeaderComponent={Header}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={ItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.lime[900]}
            colors={[theme.colors.lime[700]]}
          />
        }
        renderItem={() => <MealCard />}
      />
    </View>
  );
}
