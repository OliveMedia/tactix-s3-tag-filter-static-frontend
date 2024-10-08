import { useEffect, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useGlobalStore } from "../../../store";
import { client } from "../../../utils/api-client";

import { format } from "date-fns";

interface IMessageList {
  conversationId: string;
}

function useGetMessages({ conversationId }: IMessageList) {
  const [messages, setMessages] = useState<any>(null);

  const { token } = useGlobalStore();

  const pageLimit = 10;

  const getMessages = ({ pageParam = 1 }: { pageParam?: number }) => {
    return client({
      endpoint: `superadmin/conversation-messages/${conversationId}`,
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
    queryKey: ["messages", { conversationId }],
    queryFn: getMessages,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      const totalMessages = parseInt(pages[0].data.data.count);

      const totalPages = Math.ceil(totalMessages / pageLimit);

      if (pages.length < totalPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    enabled: !!conversationId,
  });

  useEffect(() => {
    console.log("all", isSuccess);
    if (isSuccess) {
      const allChatList: any = [];

      data?.pages.map((group) => {
        return group.data.data.messages.map((chat: any) => {
          chat.message.map((message: any) => {
            return allChatList.push({
              message,
              isSelf: chat.sender !== "SYSTEM",
              sentAt: format(new Date(chat.sent_at), "EEEE dd/MM/yy, hh:mm a"),
            });
          });
        });
      });
      setMessages(allChatList);
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
    messages,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export { useGetMessages };
