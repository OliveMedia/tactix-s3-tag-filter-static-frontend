import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/utils/api-client";
import { useGlobalStore } from "@/store";
import dayjs from "dayjs";

function useGetBookings() {
  const [bookingData, setBookingData] = useState<any>(null);

  const { token } = useGlobalStore();

  const [date, setDate] = useState<Date | null>(null);

  const [location, setLocation] = useState<any>(null);

  const [user, setUser] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageLimit] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const getBooking = ({
    pageParam = 1,
    pageLimit = 20,
  }: {
    pageParam?: number;
    pageLimit?: number;
  }) => {
    const params: any = {
      limit: pageLimit,
      page: pageParam,
    };

    if (date) {
      params.date = dayjs(date).format("YYYY-MM-DD");
    }

    if (location) {
      params.location = location.children;
    }

    if (user) {
      params.user = user.value;
    }
    return client({
      endpoint: `superadmin/booking-history`,
      method: "get",
      optional: {
        token: token,
        params,
      },
    });
  };

  const { data, error, isError, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: ["bookings", { currentPage, location, date, user }],
    queryFn: () => getBooking({ pageLimit, pageParam: currentPage }),
  });

  useEffect(() => {
    if (isSuccess) {
      const allBookingList: any = [];

      setTotalPages(Math.ceil(data.data.data.total_counts / pageLimit));

      data.data.data.data.map((booking: any) => {
        return allBookingList.push(booking);
      });

      setBookingData({
        rows: allBookingList,
        totalPages,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log({ error });

      // toast.error("Unable to fetch total players of play");
    }
  }, [error, isError]);

  return {
    isSuccess,
    isLoading,
    bookingData,
    error,
    isError,
    totalPages,
    data,
    isFetching,
    setCurrentPage,
    currentPage,
    setDate,
    date,
    user,
    setUser,
    location,
    setLocation,
  };
}

export { useGetBookings };
