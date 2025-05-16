import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetConversations } from "../../hooks";
import { InfiniteScroller } from "../../../../components";
import { Box, Center, List, rem, Skeleton, Text, Title } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { useColorScheme } from "@mantine/hooks";

const ChatHistory = ({
  setConversationId,
  conversationId,
}: {
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
  conversationId: string;
}) => {
  const params = useParams();

  const colorScheme = useColorScheme();

  const {
    conversations,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    isLoading,
  } = useGetConversations({ userId: params.userId as string });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAPICall, setStartAPICall] = useState(false);

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      setConversationId(conversations[0].id);
    }
  }, [conversations, setConversationId]);

  return (
    <div className="w-full">
      <Title size={20} mb={20}>
        Chat History
      </Title>
      <InfiniteScroller
        loadMore={async () => {
          if (isAPICall) return;
          setStartAPICall(true);
          await fetchNextPage();
          setTimeout(() => setStartAPICall(false), 2000);
        }}
        hasMore={hasNextPage && !isAPICall}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          overflowX: "hidden",
          maxWidth: "250px",
        }}
      >
        <div ref={scrollRef} />
        <List
          spacing="lg"
          size="md"
          center
          icon={<IconMessage style={{ width: rem(16), height: rem(16) }} />}
        >
          {isLoading || conversations === null ? (
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((chat) => (
                <Skeleton key={chat} className="h-20" />
              ))}
            </ul>
          ) : (
            <>
              {conversations?.map((conversation: any) => (
                <List.Item
                  key={conversation.id}
                  onClick={() => setConversationId(conversation.id)}
                  className={`hover:bg-zinc-700 p-2 cursor-pointer ${
                    conversation.id === conversationId
                      ? "dark:bg-zinc-700 bg-gray-100"
                      : ""
                  }`}
                >
                  <Text className="break-words">{conversation.title}</Text>
                </List.Item>
              ))}
            </>
          )}
          {conversations && conversations.length === 0 && (
            <Center h="calc(85vh)" bg="var(--mantine-color-gray-light)">
              <Box>No Conversation Found</Box>
            </Center>
          )}
        </List>
      </InfiniteScroller>
    </div>
  );
};

export default ChatHistory;
