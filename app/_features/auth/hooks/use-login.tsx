import { signin } from "@/app/(auth)/action";
import { ToastAction } from "@/app/_components/ui/toast";
import { useToast } from "@/app/_hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: signin,
    onSuccess: () => {
      toast({
        title: "Sign In : Success ",
        // description:
        action: <ToastAction altText="close">Undo</ToastAction>,
      });
    },
    onError: (error) => {
      toast({
        title: "Sign In : Fail ",
        description: error.message,
        action: <ToastAction altText="close">Undo</ToastAction>,
      });
    },
  });
};
