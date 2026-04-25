import { useQuery } from "@tanstack/react-query";
import { AccountService } from "../../services/AccountService";

type UseAccountParams = {
  enabled?: boolean;
};

export function useAccount(params?: UseAccountParams) {
  const { data, refetch } = useQuery({
    queryKey: ["account"],
    queryFn: () => AccountService.getMe(),
    staleTime: Infinity,
    enabled: params?.enabled ?? true,
  });

  return {
    account: data,
    loadAccount: refetch,
  };
}
