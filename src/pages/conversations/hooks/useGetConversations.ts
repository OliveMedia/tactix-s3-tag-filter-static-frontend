import { useEffect, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useGlobalStore } from "../../../store";
import { client } from "../../../utils/api-client";

import { format } from "date-fns";

interface IChatHistory {
  userId: string;
}

function useGetConversations({ userId }: IChatHistory) {
  const [conversations, setConversations] = useState<any>(null);

  const { token } = useGlobalStore();

  const pageLimit = 12;

  const getChatHistory = ({ pageParam = 1 }: { pageParam?: number }) => {
    return client({
      endpoint: `superadmin/user-conversations/${userId}`,
      method: "get",
      optional: {
        token: token,
        params: {
          limit: pageLimit,
          page: pageParam,
        },
      },
    });
  };

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["conversations", { userId }],
    queryFn: getChatHistory,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      const totalConversations = parseInt(pages[0].data.data.count);

      const totalPages = Math.ceil(totalConversations / pageLimit);

      if (pages.length < totalPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess) {
      const allChatList: any = [];

      data?.pages.map((group) => {
        return group.data.data.conversations.map((chat: any) => {
          return allChatList.push({
            ...chat,
            title: chat.title
              ? chat.title
              : format(new Date(chat.started_at), "EEEE dd/MM/yy, hh:mm a"),
          });
        });
      });

      setConversations(allChatList);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log({ error });

      // toast.error("Unable to fetch total players of play");
    }
  }, [error, isError]);

  return {
    isLoading,
    isFetching,
    hasNextPage,
    conversations,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export { useGetConversations };
