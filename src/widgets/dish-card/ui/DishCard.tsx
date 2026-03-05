import { IDishCard } from "@/entities/menu";
import { Card, Text, Image, useMantineTheme, Badge, Flex } from "@mantine/core";

export default function dishCard({ dish }: { dish: IDishCard }) {
  const theme = useMantineTheme();

  return (
    <Card
      radius={"sm"}
      p={0}
      shadow="none"
      bg="transparent"
      style={{ boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <Flex direction="column" flex={1} gap="sm">
        <Image
          bg={theme.colors.burgundy[7]}
          src={dish.photo}
          alt={dish.name}
          h={280}
          fit="cover"
        />

        <Flex direction="column" justify="space-between" flex={1} gap={4} p={8}>
          <div>
            <Text ff="'Playfair Display', serif" fw={500} fz="lg" c="dark.8">
              {dish.name}
            </Text>
            <Text fz="sm" c="dark.4" lh={1.6}>
              {dish.description}
            </Text>
            <Flex wrap="wrap" gap={4} mt={8}>
              {dish.dishIngredients &&
                dish.dishIngredients.map((ingredient) => (
                  <Badge size="sm" key={ingredient.id}>
                    {ingredient.name}
                  </Badge>
                ))}
            </Flex>
          </div>

          <Text fz="md" fw={600} c="burgundy.6">
            {dish.price}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
