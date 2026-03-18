import {
  Group,
  Text,
  Button,
  Avatar,
  Menu,
  Image,
  Container,
  UnstyledButton,
  Box,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { IconUser, IconLogout, IconSun, IconMoon } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/entities/user/model/userSelectors";
import { userLogout } from "@/entities/user";
import { useLogoutMutation } from "@/entities/auth";
import { baseApi } from "@/shared/api";
import classes from "./classes/Header.module.css";

const linkEmployee = [
  {
    role: "ADMIN",
    link: "/employee/dashboards",
  },
  { role: "WAITER", link: "/employee/reservations" },
  { role: "COOK", link: "/employee/queue-orders" },
];

export default function Header() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectUser);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // Очищаем клиентское состояние даже если запрос logout не удался.
    } finally {
      dispatch(baseApi.util.resetApiState());
      dispatch(userLogout());
      navigate("/login");
    }
  };

  const links = [
    { label: "Главная", path: "/" },
    { label: "Меню", path: "/menu" },
    { label: "Бронирование", path: "/booking" },
    {
      label: "Панель работника",
      path: linkEmployee.find((link) => link.role === user?.role)?.link,
      auth: true,
    },
  ];

  return (
    <Box
      component="header"
      py="sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--mantine-color-body)",
        borderBottom: "1px solid var(--mantine-color-default-border)",
      }}
    >
      <ScrollProgressBar />

      <Container size="xl">
        <Group justify="space-between" align="center">
          <Image src="/icons/MiniLogo.png" w={200} />

          <Group gap={30} justify="center" className={classes.headerLinks}>
            {links
              .slice(0, user.role === "CUSTOMER" ? 3 : links.length)
              .map((link) => (
                <UnstyledButton
                  key={link.path}
                  onClick={() => navigate(link.path!)}
                >
                  <Stack gap={2}>
                    <Text
                      fz="sm"
                      fw={500}
                      c="var(--mantine-color-text)"
                      style={{
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      {link.label}
                    </Text>
                    <Box
                      h={2}
                      w="100%"
                      bg="burgundy.6"
                      style={{
                        opacity: link.path === window.location.pathname ? 1 : 0,
                      }}
                    />
                  </Stack>
                </UnstyledButton>
              ))}
          </Group>
          <Box w={200}>
            {user?.email ? (
              <Menu shadow="md">
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap="xs">
                      <Avatar radius="xl" size="sm" color="burgundy.6">
                        <IconUser size={16} />
                      </Avatar>
                      <Text fz="sm" fw={500} c="dimmed">
                        {user?.email}
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown w={200}>
                  <Menu.Item
                    leftSection={<IconUser size={18} />}
                    onClick={() => navigate("/profile")}
                  >
                    Профиль
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      colorScheme === "light" ? (
                        <IconMoon size={18} />
                      ) : (
                        <IconSun size={18} />
                      )
                    }
                    onClick={() =>
                      setColorScheme(colorScheme === "light" ? "dark" : "light")
                    }
                  >
                    {colorScheme === "light" ? "Темная тема" : "Светлая тема"}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout size={18} />}
                    onClick={handleLogout}
                    c="red.6"
                  >
                    Выйти
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                variant="outline"
                color="burgundy.6"
                radius={0}
                size="sm"
                style={{
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderColor: "var(--mantine-color-default-border)",
                }}
                onClick={() => navigate("/login")}
              >
                Войти
              </Button>
            )}
          </Box>
        </Group>
      </Container>
    </Box>
  );
}
