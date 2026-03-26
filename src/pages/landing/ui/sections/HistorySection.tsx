import { Container, Text, Stack, Box } from "@mantine/core";

export default function HistorySection() {
  return (
    <Box py={100} bg="var(--mantine-color-default-hover)">
      <Container size="lg">
        <Stack align="center" gap="xl">
          <Text
            ff="'Playfair Display', serif"
            fw={400}
            fz={36}
            c="var(--mantine-color-text)"
            ta="center"
            style={{ letterSpacing: "3px", textTransform: "uppercase" }}
          >
            Наша история
          </Text>

          <Box w={40} h={1} bg="burgundy.6" />

          <Text fz="md" c="dimmed" ta="center" maw={700} lh={2}>
            La Maison был основан в 1987 году шеф-поваром Жаном-Пьером Дюбуа,
            мечтавшим перенести дух парижской гастрономии за пределы Франции.
            Вот уже более 35 лет мы бережно храним традиции классической
            французской кухни, сочетая их с современными кулинарными техниками.
            Каждое блюдо — это история, рассказанная языком вкуса.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
