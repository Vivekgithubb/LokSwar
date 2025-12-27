import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSuccess: (data) => {
      localStorage.removeItem("token");

      // 2️⃣ Clear auth cache
      queryClient.removeQueries({ queryKey: ["auth"] });

      // 3️⃣ Redirect
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
