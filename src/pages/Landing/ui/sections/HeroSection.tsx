import { Center, Stack, Text, Button, Container, Box } from "@mantine/core";

export default function HeroSection() {
  return (
    <Box
      py={150}
      style={{
        position: "relative",
        backgroundImage: `url("/img/hero2.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Полупрозрачный оверлей для затемнения фона. Измените alpha (0.0-1.0) по вкусу */}
      <Box
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 1,
        }}
      />

      <Container size="md" style={{ position: "relative", zIndex: 2 }}>
        <Center>
          <Stack align="center" gap="xl">
            <Text
              ff="'Playfair Display', serif"
              fw={400}
              fz={72}
              c="white"
              ta="center"
              style={{ letterSpacing: "8px", textTransform: "uppercase" }}
            >
              La Maison
            </Text>

            <Box w={60} h={2} bg="gold.4" />

            <Text
              fz="lg"
              c="gray.4"
              ta="center"
              maw={520}
              lh={1.8}
              style={{ letterSpacing: "1px" }}
            >
              Изысканная французская кухня в самом сердце города. Традиции
              высокой гастрономии с 1987 года.
            </Text>

            <Button
              size="lg"
              radius={0}
              color="burgundy.6"
              mt="md"
              px={40}
              style={{ letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Забронировать стол
            </Button>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
