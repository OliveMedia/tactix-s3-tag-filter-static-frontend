import React, { useEffect, useState } from "react";
import { Group, Switch, Text, useMantineColorScheme, rem } from "@mantine/core";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useViewportSize } from "@mantine/hooks";

const Navbar = () => {
  const [greeting, setGreeting] = useState("");

  const { toggleColorScheme } = useMantineColorScheme();

  const { width } = useViewportSize();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning!");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon!");
      } else {
        setGreeting("Good Evening!");
      }
    };

    updateGreeting();
  }, []);

  return (
    <>
      <header
        className={`${
          width > 1040
            ? "left-[300px] w-[calc(100vw-290px)]"
            : "w-[calc(100vw-70px)] left-[70px]"
        } z-40 p-3 border border-s-0 border-t-0 border-x-0 border-b-gray-300 dark:border-b-zinc-700  fixed top-0 flex items-center justify-between`}
      >
        {/* {!isLoading ? (
          <Text fw="bold">{greeting + " " + profile?.name}</Text>
        ) : (
          <Skeleton className="w-52 h-6" />
        )} */}

        <Text fw="bold">{greeting + " " + "Admin"}</Text>

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
                <IconMoon
                  className="text-gray-500"
                  style={{ width: rem(15), height: rem(15) }}
                />
              ) : (
                <IconSun
                  className="text-primary"
                  style={{ width: rem(15), height: rem(15) }}
                />
              )
            }
          />
          <span className="flex gap-3">
            <img
              alt="profile"
              src="../../assets/images/person.jpg"
              width={30}
              height={30}
              className="rounded-full w-[30px] h-[30px]"
            />
          </span>
        </Group>
      </header>
    </>
  );
};

export default Navbar;
