import { Text, Flex } from "@mantine/core";
import UsersTable from "./sections/UsersTable";

export default function Users() {
  return (
    <Flex direction="column" p="xl" h="100vh" gap="md">
      <Text fz="h1" fw={600} ff="'Playfair Display'">
        Управление пользователями
      </Text>
      <UsersTable />
    </Flex>
  );
}
