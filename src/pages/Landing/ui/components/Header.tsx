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
} from "@mantine/core";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { logout } from "@/features/auth";
import ScrollProgressBar from "./ScrollProgressBar";

export default function Header() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

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

          <Group gap={40} justify="center">
            <UnstyledButton>
              <Text
                fz="md"
                fw={500}
                c="dark.7"
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Меню
              </Text>
            </UnstyledButton>
            <UnstyledButton>
              <Text
                fz="md"
                fw={500}
                c="dark.7"
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Бронирование
              </Text>
            </UnstyledButton>
          </Group>

          <Box w={200}>
            {isAuthenticated && user ? (
              <Menu shadow="md">
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap="xs">
                      <Avatar radius="xl" size="sm" color="burgundy.6">
                        <IconUser size={16} />
                      </Avatar>
                      <Text fz="sm" c="dark.6">
                        {user?.email}
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconLogout size={14} />}
                    onClick={() => dispatch(logout())}
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
