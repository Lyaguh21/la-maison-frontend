import { Button, Center, Flex, Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Error404() {
  const theme = useMantineTheme();
  return (
    <Center h="100vh">
      <Flex direction="column">
        <Text
          style={{ fontSize: "80px" }}
          fw={900}
          variant="gradient"
          gradient={{
            from: theme.colors.burgundy[6],
            to: theme.colors.burgundy[9],
            deg: 77,
          }}
        >
          ERROR 404
        </Text>
        <Center>
          <Link to="/">
            <Button variant="outline">Вернуться на главную</Button>
          </Link>
        </Center>
      </Flex>
    </Center>
  );
}
