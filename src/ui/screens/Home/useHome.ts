import { useMeals } from "@/app/hooks/queries/useMeals";
import { useCallback, useState } from "react";

export const useHome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0);
    return date;
  });

  const { meals, isInitialLoading, isLoading, reloadMeals } =
    useMeals(selectedDate);

  const handlePreviousDay = useCallback(() => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }, []);

  const handleNextDay = useCallback(() => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await reloadMeals();
    } finally {
      setIsRefreshing(true);
    }
  };

  return {
    isRefreshing,
    isLoading,
    handleRefresh,
    selectedDate,
    isInitialLoading,
    meals,
    handleNextDay,
    handlePreviousDay,
  };
};
