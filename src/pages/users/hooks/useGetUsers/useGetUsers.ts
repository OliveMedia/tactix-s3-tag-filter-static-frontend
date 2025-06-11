import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";
import { isTokenExpired } from "@/utils/isTokenExpired";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function useGetUsers() {
  const [userData, setUserData] = useState<any>(null);

  const [searchValue, setSearchValue] = useState("");

  const [totalPages, setTotalPages] = useState(2);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit] = useState(10);

  const { token } = useGlobalStore();

  const navigate = useNavigate();

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
    enabled: false,
  });

  useEffect(() => {
    const allUserList: any[] = [
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

    setUserData({
      rows: allUserList,
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
