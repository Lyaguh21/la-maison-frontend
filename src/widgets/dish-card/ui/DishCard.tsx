import { Ingredient } from "@/entities/dish";
import { IDishCard } from "@/entities/menu";
import { IngredientBadge } from "@/shared/ui";
import {
  Card,
  Text,
  Image,
  useMantineTheme,
  Flex,
  Group,
  AspectRatio,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export default function dishCard({
  dish,
  visibleType,
}: {
  dish: IDishCard;
  visibleType?: "grid" | "list";
}) {
  const theme = useMantineTheme();
  const [searchParams] = useSearchParams();
  const visible = searchParams.get("visible") || visibleType || "grid";

  return (
    <Card
      radius={"sm"}
      p={0}
      shadow="none"
      bg="transparent"
      style={{ boxShadow: "4px 4px 8px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <Flex
        direction={
          visible === "grid" ? "column" : { base: "column", sm: "row" }
        }
        flex={1}
        gap="sm"
      >
        <AspectRatio ratio={1 / 1}>
          <Image
            bg={theme.colors.burgundy[7]}
            src={dish.photo}
            h={280}
            fit="cover"
          />
        </AspectRatio>

        <Flex
          direction={"column"}
          justify="space-between"
          flex={1}
          gap={4}
          p={8}
        >
          <div>
            <Text
              ff="Playfair Display"
              fw={600}
              fz={visible === "grid" ? "xl" : { base: "xl", sm: "32" }}
              c="var(--mantine-color-text)"
            >
              {dish.name}
            </Text>
            <Text fz="sm" c="dimmed" lh={1.6}>
              {dish.description}
            </Text>
            <Flex wrap="wrap" gap={4} mt={8}>
              {dish.dishIngredients &&
                dish.dishIngredients.map((ingredient: Ingredient) => (
                  <IngredientBadge
                    key={ingredient.id}
                    ingredient={ingredient}
                  />
                ))}
            </Flex>
          </div>

          <Group gap="0px" align="center">
            <Text fz="md" fw={700} c="burgundy.6">
              {dish.price} ₽
            </Text>
          </Group>
        </Flex>
      </Flex>
    </Card>
  );
}
