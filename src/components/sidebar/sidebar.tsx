"use client";

import { Center, UnstyledButton, Stack } from "@mantine/core";

import {
  HelpIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  SettingsIcon,
} from "../icons";

import classes from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

interface NavbarLinkProps {
  icon: typeof HomeIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      className={classes.link}
      data-active={active || undefined}
    >
      <Icon />
      <div className="text-sm text-secondary-foreground">{label}</div>
    </UnstyledButton>
  );
}

const menuItemsUpper = [
  { route: "/home", icon: HomeIcon, label: "Home" },
  //   { route: "/chatHistory", icon: HistoryIcon, label: "History" },
  //   { route: "/note", icon: NoteIcon, label: "Note" },
];

function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {};

  const links = menuItemsUpper.map((link) => (
    <Link
      className={classes.link}
      data-active={link.route === location.pathname || undefined}
      to={{ pathname: link.route }}
      key={link.label}
    >
      <link.icon />
      <span className="text-sm text-secondary-foreground">{link.label}</span>
    </Link>
  ));

  return (
    <nav className={`${classes.navbar} bg-gray-200 shadow-md dark:bg-primary`}>
      <Center>
        <LogoIcon height="65" />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0} className="flex flex-col gap-5">
          {links}
        </Stack>
      </div>

      <Stack
        justify="center"
        gap={0}
        className="flex flex-col gap-5 items-center justify-center"
      >
        <NavbarLink icon={SettingsIcon} label="Settings" />
        <NavbarLink icon={HelpIcon} label="Help" />
        <NavbarLink icon={LogoutIcon} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
}

export default Sidebar;
