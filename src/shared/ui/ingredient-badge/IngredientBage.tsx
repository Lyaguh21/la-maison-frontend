import { Badge } from "@mantine/core";

export default function IngredientBadge({
  ingredient,
}: {
  ingredient: { id: number; name: string };
}) {
  return (
    <Badge size="sm" key={ingredient.id}>
      {ingredient.name}
    </Badge>
  );
}
