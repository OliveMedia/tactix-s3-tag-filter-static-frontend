import React, { useEffect, useState } from "react";
import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { SideBar } from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [greeting, setGreeting] = useState("");
  const [active, setActive] = useState(0);
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
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Navbar opened={opened} toggle={toggle} greeting={greeting} />
      </AppShell.Header>
      <AppShell.Navbar>
        <SideBar
          active={active}
          setActive={setActive}
          navigate={navigate}
          opened={opened}
          toggle={toggle}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea>{children}</ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
