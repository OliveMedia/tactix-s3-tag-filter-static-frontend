import {
  Box,
  Burger,
  Button,
  Code,
  Group,
  NavLink,
  ScrollArea,
} from "@mantine/core";
import { IconLogout, IconUsers } from "@tabler/icons-react";

const menuItems = [{ icon: IconUsers, label: "Users", link: "/" }];

const Sidebar = ({ active, setActive, navigate, opened, toggle }: any) => {
  const items = menuItems.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        setActive(index);
        navigate(item.link);
      }}
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
