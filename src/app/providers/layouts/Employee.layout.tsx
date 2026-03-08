import { AppShell, AppShellNavbar, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell
      header={{ height: 60, collapsed: !isMobile }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <div>Logo</div>
      </AppShell.Header>
      <AppShellNavbar>Navbar</AppShellNavbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
