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
} from "@mantine/core";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/entities/user/model/userSelectors";
import { userLogout } from "@/entities/user";
import { useLogoutMutation } from "@/features/auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectUser);

  const links = [
    { label: "Главная", path: "/" },
    { label: "Меню", path: "/menu" },
    { label: "Бронирование", path: "/booking" },
    { label: "Панель работника", path: "/employee", auth: true },
  ];

  return (
    <Box
      component="header"
      py="sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "white",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <ScrollProgressBar />
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Image src="/icons/MiniLogo.png" w={200} />

          <Group gap={30} justify="center">
            {links
              .slice(0, user.role === "CUSTOMER" ? 3 : links.length)
              .map((link) => (
                <UnstyledButton
                  key={link.path}
                  onClick={() => navigate(link.path)}
                >
                  <Stack gap={2}>
                    <Text
                      fz="sm"
                      fw={500}
                      c="dark.7"
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
                      <Text fz="sm" fw={500} c="dark.6">
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
                    leftSection={<IconLogout size={18} />}
                    onClick={() => dispatch(userLogout(), logout())}
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
                style={{ letterSpacing: "1px", textTransform: "uppercase" }}
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
