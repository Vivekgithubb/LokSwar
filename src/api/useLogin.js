import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await authApi.login({ email, password });
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      //cache authed users
      queryClient.setQueryData(["auth"], data.user);

      navigate("/", { replace: true });
    },
  });
  return { login, isLoading, isPending, error };
}
