import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/entities/user";

import { ILoginRequest } from "@/entities/auth/model/type";
import { useAppDispatch, useNotifications } from "@/shared/lib";
import {
  Box,
  Button,
  Center,
  Anchor,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  LoadingOverlay,
  Paper,
} from "@mantine/core";
import { useLoginMutation } from "@/entities/auth";
import LoginHelper from "../components/LoginHelper";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useNotifications();

  const form = useForm<ILoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (v) =>
        /^\S+@\S+\.\S+$/.test(v) ? null : "Введите корректный email",
      password: (v) =>
        v.length >= 4 ? null : "Пароль должен содержать минимум 4 символа",
    },
  });

  const handleSubmit = async () => {
    try {
      const data = await login(form.values).unwrap();
      dispatch(setUser(data));
      showSuccess("Вы вошли в аккаунт");
      navigate("/");
      form.reset();
    } catch (error: any) {
      showError(error.data.message);
    }
  };

  return (
    <Box
      mih="100vh"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--mantine-color-gray-0)",
      }}
    >
      <Paper w={500} p="lg" radius="md" shadow="md">
        <LoadingOverlay visible={isLoading} />
        <Stack gap="xl">
          <Center>
            <Text
              ff="'Playfair Display', serif"
              fw={400}
              fz={36}
              c="burgundy.6"
              style={{ letterSpacing: "4px", textTransform: "uppercase" }}
            >
              La Maison
            </Text>
          </Center>

          <Box w={40} h={1} bg="burgundy.6" mx="auto" />

          <Text
            fz="sm"
            c="dark.4"
            ta="center"
            style={{ letterSpacing: "1px", textTransform: "uppercase" }}
          >
            Вход в аккаунт
          </Text>

          {/* Форма */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="user@example.com"
                radius={0}
                styles={{
                  label: {
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontSize: 11,
                    marginBottom: 6,
                  },
                  input: { borderColor: "var(--mantine-color-gray-4)" },
                }}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Пароль"
                placeholder="Минимум 4 символа"
                radius={0}
                styles={{
                  label: {
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontSize: 11,
                    marginBottom: 6,
                  },
                  input: { borderColor: "var(--mantine-color-gray-4)" },
                }}
                {...form.getInputProps("password")}
              />

              <Button
                type="submit"
                fullWidth
                radius={0}
                color="burgundy.6"
                mt="sm"
                size="md"
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Войти
              </Button>
            </Stack>
          </form>

          <Text fz="sm" c="dark.4" ta="center">
            Нет аккаунта?{" "}
            <Anchor
              c="burgundy.6"
              fw={500}
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}
            >
              Зарегистрироваться
            </Anchor>
          </Text>
        </Stack>
      </Paper>
      <LoginHelper form={form} />
    </Box>
  );
}
