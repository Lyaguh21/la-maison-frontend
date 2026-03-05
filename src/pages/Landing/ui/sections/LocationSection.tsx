import { Container, Grid, Stack, Text, Box, Group } from "@mantine/core";
import { IconPhone, IconMail, IconClock } from "@tabler/icons-react";

export default function LocationSection() {
  return (
    <Box py={100} bg="gray.0">
      <Container size="lg">
        <Stack align="center" gap="xl" mb="xl">
          <Text
            ff="'Playfair Display', serif"
            fw={400}
            fz={36}
            c="dark.8"
            ta="center"
            style={{ letterSpacing: "3px", textTransform: "uppercase" }}
          >
            Где мы находимся
          </Text>

          <Box w={40} h={1} bg="burgundy.6" />
        </Stack>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box h={400} style={{ overflow: "hidden" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae5bfdbb8dfd70252a2986c67b4cb601f7e184594ffec6bc4f34f6bc41657120f&amp;source=constructor"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                title="Расположение ресторана"
              />
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="lg" justify="center" h="100%">
              <Text ff="'Playfair Display', serif" fz="xl" fw={500} c="dark.8">
                La Maison
              </Text>

              <Text fz="sm" c="dark.4" lh={1.8}>
                ул. Примерная, 42
                <br />
                Москва, Россия, 101000
              </Text>

              <Stack gap="xs">
                <Group gap="xs">
                  <IconPhone
                    size={16}
                    color="var(--mantine-color-burgundy-6)"
                  />
                  <Text fz="sm" c="dark.5">
                    +7 (495) 123-45-67
                  </Text>
                </Group>

                <Group gap="xs">
                  <IconMail size={16} color="var(--mantine-color-burgundy-6)" />
                  <Text fz="sm" c="dark.5">
                    info@lamaison.ru
                  </Text>
                </Group>

                <Group gap="xs">
                  <IconClock
                    size={16}
                    color="var(--mantine-color-burgundy-6)"
                  />
                  <Text fz="sm" c="dark.5">
                    Пн — Вс: 12:00 — 23:00
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
