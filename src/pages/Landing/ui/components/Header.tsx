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
import ScrollProgressBar from "./ScrollProgressBar";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/entities/user/model/userSelectors";
import { userLogout } from "@/entities/user";
import { useLogoutMutation } from "@/features/auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectUser);

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
                fz="sm"
                fw={500}
                c="dark.7"
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Меню
              </Text>
            </UnstyledButton>
            <UnstyledButton>
              <Text
                fz="sm"
                fw={500}
                c="dark.7"
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Бронирование
              </Text>
            </UnstyledButton>
            {user.role !== "CUSTOMER" && (
              <UnstyledButton>
                <Text
                  fz="sm"
                  fw={500}
                  c="dark.7"
                  style={{ letterSpacing: "2px", textTransform: "uppercase" }}
                >
                  Панель работника
                </Text>
              </UnstyledButton>
            )}
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
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconLogout size={14} />}
                    onClick={() => dispatch(userLogout(), logout())}
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
