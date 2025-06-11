import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useGlobalStore } from "@/store";

const baseURL = import.meta.env.VITE_API_URL;

function useGetVideos() {
  const [videoData, setVideoData] = useState<any>(null);

  const [totalPages, setTotalPages] = useState(0);

  const { currentPage, pageLimit, setCurrentPage, setPageLimit, videoFilter } =
    useGlobalStore();

  const getUserList = ({
    currentPage,
    pageLimit,
    videoFilter,
  }: {
    currentPage: number;
    pageLimit: number;
    videoFilter: any;
  }) => {
    const params: any = {
      page: currentPage,
      pageSize: pageLimit,
    };

    if (videoFilter) {
      params.filter = videoFilter;
    }
    return fetch(`${baseURL}/v1/getClipsTag`, {
      method: "POST",
      body: JSON.stringify(params),
    }).then((res) => res.json());
  };

  const { data, error, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["videos", { currentPage, videoFilter, pageLimit }],
    queryFn: () => getUserList({ currentPage, pageLimit, videoFilter }),
  });

  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data.totalPages);

      setVideoData({
        rows: data.results,
        totalCount: data.totalCount,
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
    videoData,
    error,
    isError,
    totalPages,
    data,
    isFetching,
    setCurrentPage,
    currentPage,
    setPageLimit,
    pageLimit,
  };
}

export { useGetVideos };
