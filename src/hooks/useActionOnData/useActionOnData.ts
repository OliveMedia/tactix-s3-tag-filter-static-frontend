import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

interface IActionOnDataProps {
  actionFunction: any;
  navigateTo?: string;
  queryToBeInvalidated: string;
}

export const useActionOnData = ({
  actionFunction,
  navigateTo,
}: IActionOnDataProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, mutateAsync, isPending, ...rest } = useMutation({
    mutationFn: actionFunction,
    onSuccess: (data: any) => {
      if (data?.statusCode === 400) {
        notifications.show({
          title: "Oops! Something went wrong",
          message: data?.data?.message,
          color: "red",
        });
      } else {
        notifications.show({
          title: "Action successfull!",
          message: data?.data?.message,
          color: "teal",
        });
        queryClient.invalidateQueries();
        if (navigateTo) {
          navigate(`${navigateTo}`);
        }
      }
    },
    onError: (data: any) => {
      notifications.show({
        title: "Oops! Something went wrong",
        message: data?.data?.message,
        color: "red",
      });
    },
  });
  return {
    mutate,
    mutateAsync,
    isPending,
    ...rest,
  };
};
