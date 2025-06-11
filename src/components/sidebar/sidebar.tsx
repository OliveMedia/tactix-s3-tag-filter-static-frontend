import { useGlobalStore } from "@/store";
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
import { useState } from "react";
import { useLocation } from "react-router-dom";

const menuItems = [{ icon: IconUsers, label: "Users", link: "/" }];

const initialTags = [
  { id: 1, title: "Personnel", tagName: "personnel", value: "" },
  { id: 2, title: "Defense Personnel", tagName: "defencePersonnel", value: "" },
  { id: 3, title: "Play Type", tagName: "playType", value: "" },
  { id: 4, title: "Play Subtype", tagName: "playSubType", value: "" },
  { id: 5, title: "Hash", tagName: "hash", value: "" },
  { id: 6, title: "Left Distance", tagName: "leftDistance", value: "" },
  { id: 7, title: "LoS", tagName: "LoS", value: "" },
  { id: 8, title: "Field Side", tagName: "fieldSide", value: "" },
  { id: 9, title: "Field Zone", tagName: "fieldZone", value: "" },
];

const Sidebar = ({ navigate, opened, toggle }: any) => {
  const location = useLocation();
  const [tags, setTags] = useState(initialTags);
  const { setVideoFilter, setCurrentPage, setPageLimit } = useGlobalStore();

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

  const handleChangeTag = (id: number, newValue: string) => {
    const updatedTags = tags.map((tag) =>
      tag.id === id ? { ...tag, value: newValue } : tag
    );
    setTags(updatedTags);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const result = tags
      .filter((tag: any) => tag.value !== "")
      .reduce((acc: any, tag) => {
        acc[tag.tagName] = tag.value;
        return acc;
      }, {});
    console.log("Submitted data:", result);
    setCurrentPage(1);
    setPageLimit(20);
    setVideoFilter(result);
    // You can send `tags` to a backend API or use it as needed.
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
      <Stack>
        <Group w="100%" justify="space-between">
          <Code fw={700} className="invisible">
            Video Explorer
          </Code>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xl" size="sm" />
        </Group>
        <form onSubmit={handleSubmit}>
          <ScrollArea mt="lg">
            {tags.map((tag) => (
              <Card key={tag.id}>
                <Group justify="space-between">
                  <Text className="capitalize">{tag.title}</Text>
                  <TextInput
                    onChange={(e) => handleChangeTag(tag.id, e.target.value)}
                    placeholder="Enter Tag Value"
                  />
                </Group>
              </Card>
            ))}
          </ScrollArea>
          <Button
            leftSection={<IconFilter size={14} />}
            className="justify-end"
            type="submit"
            w="100%"
            mt="md"
          >
            Submit
          </Button>
        </form>
      </Stack>
      <Stack>
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
