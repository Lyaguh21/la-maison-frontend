import {
  AppShell,
  AppShellNavbar,
  Burger,
  Flex,
  Image,
  Box,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

export default function EmployeeLayout() {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell
      header={{ height: 60, collapsed: !isMobile }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Flex align="center" justify="space-between" h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
          <Image src="/icons/MiniLogo.png" w={150} />
        </Flex>
      </AppShell.Header>
      <AppShellNavbar>
        <Navbar />
      </AppShellNavbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
