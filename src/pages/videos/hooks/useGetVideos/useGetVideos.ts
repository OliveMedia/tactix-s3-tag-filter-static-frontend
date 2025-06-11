import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function useGetVideos() {
  const [videoData, setVideoData] = useState<any>(null);

  const [searchValue, setSearchValue] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit] = useState(5);

  const { token, videoFilter } = useGlobalStore();

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

    return client({
      method: "post",
      endpoint: "v1/getClipsTag",
      optional: {
        data: params,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["videos", { currentPage, videoFilter }],
    queryFn: () => getUserList({ currentPage, pageLimit, videoFilter }),
  });

  useEffect(() => {
    const allVideoList: any[] = [
      {
        _id: "6849219b8f9a189bf84aeee6",
        bucket: "tactix-data-read-write",
        key: "training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 001.mp4",
        url: "https://tactix-data-read-write.s3.amazonaws.com/training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 001.mp4",
        content_type: "video/mp4",
        size: 21524130,
        last_modified: "2025-06-09T17:43:17+00:00",
        metadata: {},
        tags: {
          LoS: "",
          leftDistance: "",
          defensePersonnel: "",
          playType: "",
          fieldSide: "",
          playSubType: "",
          fieldZone: "",
          personnel: "",
          hash: "",
        },
      },
      {
        _id: "6849219c8f9a189bf84aeee7",
        bucket: "tactix-data-read-write",
        key: "training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 002.mp4",
        url: "https://tactix-data-read-write.s3.amazonaws.com/training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 002.mp4",
        content_type: "video/mp4",
        size: 8756953,
        last_modified: "2025-06-09T17:43:20+00:00",
        metadata: {},
        tags: {
          LoS: "",
          leftDistance: "",
          defensePersonnel: "",
          playType: "",
          fieldSide: "",
          playSubType: "",
          fieldZone: "",
          personnel: "",
          hash: "",
        },
      },
      {
        _id: "6849219d8f9a189bf84aeee8",
        bucket: "tactix-data-read-write",
        key: "training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 003.mp4",
        url: "https://tactix-data-read-write.s3.amazonaws.com/training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 003.mp4",
        content_type: "video/mp4",
        size: 8235423,
        last_modified: "2025-06-09T17:43:22+00:00",
        metadata: {},
        tags: {
          LoS: "",
          leftDistance: "",
          defensePersonnel: "",
          playType: "",
          fieldSide: "",
          playSubType: "",
          fieldZone: "",
          personnel: "",
          hash: "",
        },
      },
      {
        _id: "6849219d8f9a189bf84aeee9",
        bucket: "tactix-data-read-write",
        key: "training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 004.mp4",
        url: "https://tactix-data-read-write.s3.amazonaws.com/training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 004.mp4",
        content_type: "video/mp4",
        size: 13174156,
        last_modified: "2025-06-10T08:52:24+00:00",
        metadata: {},
        tags: {},
      },
      {
        _id: "6849219e8f9a189bf84aeeea",
        bucket: "tactix-data-read-write",
        key: "training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 005.mp4",
        url: "https://tactix-data-read-write.s3.amazonaws.com/training-films/highschool/PLAYON/00 TEST Tags/clip/Clip 005.mp4",
        content_type: "video/mp4",
        size: 11991150,
        last_modified: "2025-06-10T08:52:40+00:00",
        metadata: {},
        tags: {},
      },
    ];

    setVideoData({
      rows: allVideoList,
      totalPages,
    });
  }, []);

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
    setSearchValue,
    searchValue,
  };
}

export { useGetVideos };
