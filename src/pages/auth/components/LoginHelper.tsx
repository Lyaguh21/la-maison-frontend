import { Blockquote, Group, ActionIcon, Text } from "@mantine/core";
import { IconClipboard, IconCopy } from "@tabler/icons-react";

const params = [
  {
    title: "Пользователь",
    email: "igor@lamaison.ru",
    password: "Password123!",
  },
  {
    title: "Админ",
    email: "admin@lamaison.ru",
    password: "Password123!",
  },
  {
    title: "Официант",
    email: "anna@lamaison.ru",
    password: "Password123!",
  },
  {
    title: "Повар",
    email: "maxim@lamaison.ru",
    password: "Password123!",
  },
];

export default function LoginHelper({ form }: { form: any }) {
  return (
    <Blockquote
      p="md"
      icon={<IconCopy />}
      title="Данные для входа"
      pos="fixed"
      bottom={{ base: 5, md: 30 }}
    >
      {params.map((param) => (
        <Group key={param.title} my={4}>
          <ActionIcon
            onClick={() =>
              form.setValues({
                email: param.email,
                password: param.password,
              })
            }
          >
            <IconClipboard />
          </ActionIcon>
          <Text fw={600}>{param.title} </Text>
        </Group>
      ))}
    </Blockquote>
  );
}
