import { selectUser } from "@/entities/user/model/userSelectors";
import { useAppSelector } from "@/shared/lib";
import { NavLink, Stack } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

const links = [
  {
    label: "Дашборды",
    link: "/employee/dashboards",
    roles: ["ADMIN"],
  },
  {
    label: "Пользователи",
    link: "/employee/users",
    roles: ["ADMIN"],
  },
  {
    label: "Ресторан",
    link: "/employee/edit-floor-scheme",
    roles: ["ADMIN"],
  },

  {
    label: "Ресторан",
    link: "/employee/floor-scheme",
    roles: ["WAITER"],
  },
  {
    label: "Заказы",
    link: "/employee/orders",
    roles: ["WAITER"],
  },
  {
    label: "Готовые блюда",
    link: "/employee/ready-dishes",
    roles: ["WAITER"],
  },
  {
    label: "Очередь заказов",
    link: "/employee/queue-orders",
    roles: ["COOK"],
  },
];

export default function Navbar() {
  const user = useAppSelector(selectUser);

  return (
    <Stack p="md">
      {links
        .filter((link) => link.roles.includes(user?.role || ""))
        .map((link) => (
          <NavLink
            href={link.link}
            key={link.link}
            label={link.label}
            rightSection={
              <IconChevronRight
                size={12}
                stroke={1.5}
                className="mantine-rotate-rtl"
              />
            }
          />
        ))}
    </Stack>
  );
}
