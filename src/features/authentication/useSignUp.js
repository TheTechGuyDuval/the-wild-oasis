import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (newUser) => {
      console.log(newUser);
      toast.success(
        "Account succefully created! , Please verify account from the user's email address"
      );
    },
  });
  return { signUp, isLoading };
}
