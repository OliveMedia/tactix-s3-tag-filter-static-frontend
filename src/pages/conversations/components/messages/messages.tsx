import React, { useRef, useState } from "react";
import { useGetMessages } from "../../hooks";
import { Skeleton } from "@mantine/core";

import ReactMarkdown from "react-markdown";
import { InfiniteScroller } from "../../../../components";

const Messages = ({ conversationId }: { conversationId: string }) => {
  const { messages, fetchNextPage, hasNextPage, isLoading } = useGetMessages({
    conversationId,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAPICall, setStartAPICall] = useState(false);

  const renderMessage = (message: any, index: number) => {
    const isSelf = message.isSelf;

    return (
      <li
        key={index}
        className={`flex ${isSelf ? "justify-end pl-4" : "justify-start pr-4"}`}
      >
        <div
          className={` max-w-[90%] overflow-x-hidden  space-y-2 flex flex-col`}
        >
          <div
            className={`w-full px-5 flex flex-col py-[0.625rem] border dark:border-0 shadow-sm rounded-md ${
              isSelf
                ? "bg-zinc-400 text-gray-700"
                : "bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-white"
            }`}
          >
            <div className="flex space-x-5 w-full">
              <div>
                {message.message.includes("\n") ? (
                  <ReactMarkdown className="prose dark:prose-invert dark:prose-dark">
                    {message.message}
                  </ReactMarkdown>
                ) : (
                  <span>{message.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderSkeletonLoader = (item: number) => (
    <li
      className={`flex w-full ${
        item % 2 === 0 ? "justify-end" : "justify-start"
      } pr-4`}
    >
      <div className="w-1/2 space-y-2 flex flex-col">
        <Skeleton height={100} radius="md" />
      </div>
    </li>
  );
  return (
    <div className="w-full">
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
          flexDirection: "column-reverse",
          gap: "2rem",
          height: "calc(100vh - 148px)",
          overflowY: "auto",
          margin: "20px 0",
        }}
      >
        <div ref={scrollRef} />
        <ul className="flex flex-col space-y-3 w-full justify-center px-[20px]">
          {isLoading || messages === null ? (
            <ul>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <>{renderSkeletonLoader(item)}</>
              ))}
            </ul>
          ) : (
            messages?.map(renderMessage)
          )}
        </ul>
      </InfiniteScroller>
    </div>
  );
};

export default Messages;
