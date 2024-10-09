import React, { useEffect, useState } from "react";
import {
  Burger,
  Group,
  rem,
  Switch,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import PersonImage from "../../assets/images/person.jpg";

const Navbar = ({ opened, toggle, greeting }: any) => {
  const { toggleColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(false);

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Text fw="bold">{`${greeting} Admin`}</Text>
      </Group>
      <Group>
        <Switch
          size="lg"
          onLabel="Dark Mode"
          offLabel="Light Mode"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
            toggleColorScheme();
          }}
          thumbIcon={
            checked ? (
              <IconMoon style={{ width: rem(15), height: rem(15) }} />
            ) : (
              <IconSun style={{ width: rem(15), height: rem(15) }} />
            )
          }
        />
        <img
          alt="profile"
          src={PersonImage}
          className="rounded-full"
          width={30}
          height={30}
        />
      </Group>
    </Group>
  );
};

export default Navbar;
