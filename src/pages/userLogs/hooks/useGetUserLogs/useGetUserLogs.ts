import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";

function useGetUserLogs() {
  const [logData, setLogData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [action, setAction] = useState<any>("");

  const [searchValue, setSearchValue] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit] = useState(10);

  const { token } = useGlobalStore();

  const getLogs = ({
    currentPage,
    pageLimit,
    searchValue,
  }: {
    currentPage: number;
    pageLimit: number;
    searchValue: string;
  }) => {
    const params: any = {
      page: currentPage,
      limit: pageLimit,
    };
    if (action) {
      params.action = action;
    }

    if (user) {
      params.user = user.value;
    }

    return client({
      method: "get",
      endpoint: "superadmin/logs",
      optional: {
        token,
        params,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["logs", { currentPage, searchValue, action, user }],
    queryFn: () => getLogs({ currentPage, pageLimit, searchValue }),
  });

  useEffect(() => {
    if (isSuccess) {
      const allLogList: any[] = [];

      setTotalPages(Math.ceil(data.data.data.total_counts / pageLimit));

      data.data.data.data.map((log: any) => {
        return allLogList.push(log);
      });

      setLogData({
        rows: allLogList,
        totalPages,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      //   toast.error("Unable to fetch player list");
    }
  }, [error, isError]);

  return {
    isSuccess,
    isLoading,
    logData,
    error,
    isError,
    totalPages,
    data,
    isFetching,
    setCurrentPage,
    currentPage,
    setSearchValue,
    searchValue,
    action,
    setAction,
    user,
    setUser,
  };
}

export { useGetUserLogs };
