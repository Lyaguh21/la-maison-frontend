import { Card, Text, Stack, Image } from "@mantine/core";

interface DishCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function DishCard({
  name,
  description,
  price,
  image,
}: DishCardProps) {
  return (
    <Card radius={0} p={0} shadow="none" bg="transparent">
      <Stack gap="sm">
        <Image src={image} alt={name} h={280} fit="cover" />

        <Stack gap={4} px={4}>
          <Text ff="'Playfair Display', serif" fw={500} fz="lg" c="dark.8">
            {name}
          </Text>
          <Text fz="sm" c="dark.4" lh={1.6}>
            {description}
          </Text>
          <Text fz="sm" fw={600} c="burgundy.6" mt={4}>
            {price}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
