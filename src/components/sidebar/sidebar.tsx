import {
  Box,
  Burger,
  Button,
  Card,
  Code,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconFilter, IconLogout, IconUsers } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const menuItems = [{ icon: IconUsers, label: "Users", link: "/" }];

const tags = [
  { id: 1, title: "personnel" },
  { id: 2, title: "defensePersonnel" },
  { id: 3, title: "playType" },
  { id: 4, title: "playSubtype" },
  { id: 5, title: "hash" },
  { id: 6, title: "leftDistance" },
  { id: 7, title: "LoS" },
  { id: 8, title: "fieldSide" },
  { id: 9, title: "fieldZone" },
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
      {/* <Group>
        <Group w="100%" justify="space-between">
          <Code fw={700}>Vepa SuperAdmin</Code>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xl" size="sm" />
        </Group>
        <ScrollArea className="w-full" mt={10}>
          <Box className="space-y-5">{items}</Box>
        </ScrollArea>
      </Group> */}
      <Group w="100%" justify="space-between">
        <Code fw={700}>Video Explorer</Code>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xl" size="sm" />
      </Group>
      <ScrollArea>
        {tags.map((tag) => (
          <Card key={tag.id}>
            <Group justify="space-between">
              <Text className="capitalize">{tag.title}</Text>
              <TextInput className="w-full" />
            </Group>
          </Card>
        ))}
      </ScrollArea>
      <Stack>
        <Button
          leftSection={<IconFilter size={14} />}
          onClick={handleLogout}
          className="justify-end"
        >
          Submit
        </Button>

        <Button
          leftSection={<IconLogout size={14} />}
          variant="default"
          onClick={handleLogout}
          className="justify-end"
        >
          Sign Out
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;
