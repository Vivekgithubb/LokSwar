import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await authApi.me();
      return data;
    },
    retry: false,
    staleTime: Infinity,
  });
}
