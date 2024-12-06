import { signup } from "@/app/(auth)/action";
import { ToastAction } from "@/app/_components/ui/toast";
import { useToast } from "@/app/_hooks/use-toast";

import { useMutation } from "@tanstack/react-query";

export const useRegistration = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast({
        title: "Sign Up : Success ",
        // description:
        action: <ToastAction altText="close">Undo</ToastAction>,
      });
    },
    onError: (error) => {
      toast({
        title: "Sign Up : Fail ",
        description: error.message,
        action: <ToastAction altText="close">Undo</ToastAction>,
      });
    },
  });
};
