import {
  Box,
  Burger,
  Button,
  Code,
  Group,
  NavLink,
  ScrollArea,
} from "@mantine/core";
import {
  IconLogout,
  IconMessage,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const menuItems = [
  { icon: IconUsers, label: "Users", link: "/" },
  {
    icon: IconSettings,
    label: "Settings",
    links: [{ label: "Chat Settings", link: "/chat-settings" }],
  },
];

const Sidebar = ({ navigate, opened, toggle }: any) => {
  const location = useLocation();

  const items = menuItems.map((item) => (
    <NavLink
      key={item.label}
      active={item.link === location.pathname}
      label={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        if (item.links) {
          return;
        }
        navigate(item.link);
      }}
      children={
        item.links
          ? item.links.map((link) => (
              <NavLink
                key={link.link}
                label={link.label}
                active={link.link === location.pathname}
                onClick={() => {
                  navigate(link.link);
                }}
                leftSection={<IconMessage size="1rem" stroke={1.5} />}
              />
            ))
          : null
      }
    />
  ));

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <Box className="flex flex-col justify-between  h-full" p="md">
      <Group>
        <Group w="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Code fw={700}>Vepa SuperAdmin</Code>
        </Group>
        <ScrollArea className="w-full" mt={10}>
          <Box className="space-y-5">{items}</Box>
        </ScrollArea>
      </Group>

      <Button
        leftSection={<IconLogout size={14} />}
        variant="default"
        onClick={handleLogout}
        className="justify-end"
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Sidebar;
