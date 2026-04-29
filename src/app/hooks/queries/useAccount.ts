import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AccountService } from "../../services/AccountService";

type UseAccountParams = {
  enabled?: boolean;
};

export function useAccount(params?: UseAccountParams) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["account"],
    queryFn: () => AccountService.getMe(),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
    placeholderData: keepPreviousData,
  });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    isRefreshing,
    account: data,
    loadAccount: refetch,
    handleRefresh,
  };
}
