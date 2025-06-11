import React, { useEffect, useState } from "react";
import { AppShell, Box, Card, ScrollArea, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { SideBar } from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();
    const timeGreeting =
      currentHour < 12
        ? "Good Morning!"
        : currentHour < 18
        ? "Good Afternoon!"
        : "Good Evening!";
    setGreeting(timeGreeting);
  }, []);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 0 }}
      navbar={{ width: 450, breakpoint: "xl", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Navbar opened={opened} toggle={toggle} greeting={greeting} />
      </AppShell.Header>
      <AppShell.Navbar>
        <SideBar navigate={navigate} opened={opened} toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box h="calc(100vh - 80px)">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
