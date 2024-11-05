import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";

function useGetUsers() {
  const [userData, setUserData] = useState<any>(null);

  const [searchValue, setSearchValue] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit] = useState(10);

  const { token } = useGlobalStore();

  const getUserList = ({
    currentPage,
    pageLimit,
    searchValue,
  }: {
    currentPage: number;
    pageLimit: number;
    searchValue: string;
  }) => {
    const params = {
      page: currentPage,
      limit: pageLimit,
      search_key: searchValue,
    };

    return client({
      method: "get",
      endpoint: "superadmin/users",
      optional: {
        token,
        params,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["users", { currentPage, searchValue }],
    queryFn: () => getUserList({ currentPage, pageLimit, searchValue }),
  });

  useEffect(() => {
    if (isSuccess) {
      const allUserList: any[] = [];

      setTotalPages(Math.ceil(data.data.data.count / pageLimit));

      data.data.data.users.map((user: any) => {
        return allUserList.push({
          id: user.id,
          name: user.name ?? "N/A",
          email: user.email ?? "N/A",
          number: user.phone,
          gender: user.gender ?? "N/A",
          age: user.age ?? "N/A",
          address: user.address ?? "N/A",
          createdAt: new Date(user.created_at).toDateString(),
        });
      });

      setUserData({
        rows: allUserList,
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
    userData,
    error,
    isError,
    totalPages,
    data,
    isFetching,
    setCurrentPage,
    currentPage,
    setSearchValue,
    searchValue,
  };
}

export { useGetUsers };
