import { Group, Code, ScrollArea, NavLink, Box } from "@mantine/core";
import { IconGauge, IconUsers } from "@tabler/icons-react";
import classes from "./sidebar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";

const data = [
  { icon: IconGauge, label: "Dashboard", link: "/" },

  { icon: IconUsers, label: "Users", link: "/users" },
];

const SideBar = () => {
  const [active, setActive] = useState(0);

  const { width } = useViewportSize();

  const navigate = useNavigate();

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={width > 1040 ? item.label : ""}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        setActive(index);
        navigate(item.link);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Code fw={700}>Vepa</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <Box w={width > 1040 ? 300 : "auto"} className="space-y-5" mt={10}>
          {items}
        </Box>
      </ScrollArea>
    </nav>
  );
};
export default SideBar;
