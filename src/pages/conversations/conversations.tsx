import { Grid } from "@mantine/core";
import { ChatHistory, Messages } from "./components";
import { useState } from "react";

const Users = () => {
  const [conversationId, setConversationId] = useState("");
  return (
    <div className="flex flex-col items-end text-text pl-[98px] lg:pl-80 mt-[74px] overflow-hidden">
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
  );
};

export default Users;
