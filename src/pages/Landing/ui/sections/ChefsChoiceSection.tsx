import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Box,
  Center,
} from "@mantine/core";
import { DishCard } from "@/widgets/dish-card";
import { useNavigate } from "react-router-dom";

const dishes = [
  {
    id: 1,
    name: "Утиное конфи",
    description: "Томлёная утиная ножка с гарниром из картофеля сарладез",
    price: "2 400",
    photo:
      "https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIxMC9YWXNBSm0uanBlZw.jpg",
    dishIngredients: [
      { id: 1, name: "Утиная ножка" },
      { id: 2, name: "Картофель" },
    ],
  },

  {
    id: 2,
    name: "Буйабес",
    description: "Классический марсельский рыбный суп с шафраном и руем",
    price: "1 800",
    photo:
      "https://img.inmyroom.ru/inmyroom/thumb/1240x796/jpg:60/uploads/food_recipe/teaser/ff/ff0a/jpg_2000_ff0a53d4-732a-4fda-9747-69127e54869b.jpg?sign=2e94776ef983dc79d423dfe0fcbf5b3f940146e825d352b27efd5c74154d370e",
    dishIngredients: [
      { id: 1, name: "Рыба" },
      { id: 2, name: "Шафран" },
      { id: 3, name: "Руем" },
    ],
  },
  {
    id: 3,
    name: "Тартар из говядины",
    description: "Рубленая говядина с каперсами, корнишонами и желтком",
    price: "1 600",
    photo:
      "https://cdnn21.img.ria.ru/images/07e9/02/0a/1998460908_3:0:1454:816_1920x1080_80_0_0_ab44eda5cf8db7bb737989cea7dd9f84.jpg",
    dishIngredients: [
      { id: 1, name: "Говядина" },
      { id: 2, name: "Каперсы" },
      { id: 3, name: "Корнишоны" },
      { id: 4, name: "Желток" },
    ],
  },
  {
    id: 4,
    name: "Крем-брюле",
    description: "Классический французский десерт с карамельной корочкой",
    price: "800",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2014_0531_Crème_brûlée_Doi_Mae_Salong_%28cropped%29.jpg/1280px-2014_0531_Crème_brûlée_Doi_Mae_Salong_%28cropped%29.jpg",
  },
];

export default function ChefsChoiceSection() {
  const navigate = useNavigate();

  return (
    <Box py={100}>
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
            Выбор шеф-повара
          </Text>

          <Box w={40} h={1} bg="burgundy.6" />

          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="xl" w="100%">
            {dishes.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </SimpleGrid>

          <Center mt="md">
            <Button
              onClick={() => navigate("/menu")}
              variant="outline"
              color="burgundy.6"
              radius={0}
              size="md"
              px={40}
              style={{ letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Посмотреть всё меню
            </Button>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}
