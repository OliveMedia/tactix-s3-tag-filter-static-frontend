import { Grid, ScrollArea } from "@mantine/core";
import { ChatHistory, Messages } from "./components";
import { useState } from "react";

const Users = () => {
  const [conversationId, setConversationId] = useState("");
  return (
    <ScrollArea>
      <div className="flex flex-col items-end text-text overflow-hidden h-[calc(100vh-170px)]">
        <Grid w="100%">
          <Grid.Col span={2}>
            <ChatHistory
              conversationId={conversationId}
              setConversationId={setConversationId}
            />
          </Grid.Col>
          <Grid.Col span={10}>
            <Messages conversationId={conversationId} />
          </Grid.Col>
        </Grid>
      </div>
    </ScrollArea>
  );
};

export default Users;
