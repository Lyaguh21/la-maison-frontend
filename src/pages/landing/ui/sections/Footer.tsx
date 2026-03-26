import {
  Container,
  Grid,
  Text,
  Stack,
  Group,
  Box,
  Anchor,
  Divider,
} from "@mantine/core";
import {
  IconBrandTelegram,
  IconBrandInstagram,
  IconBrandVk,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <Box bg="dark.9" py={60}>
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text
                ff="'Playfair Display', serif"
                fw={600}
                fz={20}
                c="white"
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                La Maison
              </Text>
              <Text fz="sm" c="gray.5" lh={1.8}>
                Изысканная французская кухня
                <br />в самом сердце Москвы
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text
                fz="sm"
                fw={600}
                c="gray.3"
                style={{ letterSpacing: "1px", textTransform: "uppercase" }}
              >
                Навигация
              </Text>
              <Stack gap="xs">
                <Anchor fz="sm" c="gray.5" underline="never">
                  Меню
                </Anchor>
                <Anchor fz="sm" c="gray.5" underline="never">
                  Бронирование
                </Anchor>
                <Anchor fz="sm" c="gray.5" underline="never">
                  О нас
                </Anchor>
                <Anchor fz="sm" c="gray.5" underline="never">
                  Контакты
                </Anchor>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text
                fz="sm"
                fw={600}
                c="gray.3"
                style={{ letterSpacing: "1px", textTransform: "uppercase" }}
              >
                Контакты
              </Text>
              <Text fz="sm" c="gray.5" lh={1.8}>
                ул. Примерная, 42
                <br />
                +7 (495) 123-45-67
                <br />
                info@lamaison.ru
              </Text>
              <Group gap="md">
                <IconBrandTelegram
                  size={18}
                  color="var(--mantine-color-gray-5)"
                />
                <IconBrandInstagram
                  size={18}
                  color="var(--mantine-color-gray-5)"
                />
                <IconBrandVk size={18} color="var(--mantine-color-gray-5)" />
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="dark.6" />

        <Text fz="xs" c="gray.5" ta="center">
          © 2026 La Maison. Все права защищены.
        </Text>
      </Container>
    </Box>
  );
}
