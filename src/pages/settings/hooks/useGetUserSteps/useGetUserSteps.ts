import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";

function useGetUserSteps() {
  const [userSteps, setUserSteps] = useState<any>(null);

  const { token } = useGlobalStore();

  const getUserSteps = () => {
    return client({
      endpoint: "superadmin/step-settings",
      method: "get",
      optional: {
        token,
      },
    });
  };

  const { data, error, isLoading, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["steps"],
    queryFn: getUserSteps,
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (isSuccess) {
      setUserSteps(data?.data?.data);
    }
  }, [data, isSuccess]);

  return {
    isLoading,
    isFetching,
    userSteps,
  };
}

export { useGetUserSteps };
