import {
  useGetUsersQuery,
  UserRole,
  useUpdateRoleUserMutation,
} from "@/entities/user";
import { useNotifications } from "@/shared/lib";
import {
  Center,
  Divider,
  Flex,
  Group,
  Input,
  Loader,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Select,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconFilter,
  IconSearch,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

const sortData = [
  { value: "asc", label: "Возрастанию" },
  { value: "desc", label: "Убыванию" },
];

const roleData = [
  {
    value: "ADMIN",
    label: "Администратор",
  },
  {
    value: "COOK",
    label: "Повар",
  },
  {
    value: "WAITER",
    label: "Официант",
  },
  {
    value: "CUSTOMER",
    label: "Пользователь",
  },
];

const filterData = [{ value: "ALL", label: "Все" }, ...roleData];

export default function UsersTable() {
  const { showError, showSuccess } = useNotifications();
  const theme = useMantineTheme();

  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("asc");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput] = useDebouncedValue(searchInput, 400);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [debouncedInput, sort]);

  const params = {
    search: debouncedInput,
    sort,
    page,
    filter,
  };

  const [updateRoleUser] = useUpdateRoleUserMutation();
  const { data, isFetching } = useGetUsersQuery(params);

  const hasMore = data ? page < data.meta.pages : false;
  const sentinelRef = useRef<HTMLTableRowElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isFetching) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isFetching],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleUpdateRoleUser = async (userId: number, role: UserRole) => {
    try {
      await updateRoleUser({ userId, role }).unwrap();
      showSuccess("Роль пользователя успешно обновлена");
    } catch (e: any) {
      showError(e.message || "Ошибка при обновлении роли пользователя");
    }
  };

  const rows = data?.data.map((user, index) => (
    <Table.Tr key={user.id ?? index}>
      <Table.Td>{user.name ?? "-"}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone ?? "-"}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>
        <Select
          value={user.role}
          allowDeselect={false}
          onChange={(value) => {
            value &&
              user.id &&
              handleUpdateRoleUser(user.id, value as UserRole);
          }}
          data={roleData}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder shadow="sm" p="md" flex={1}>
      <Flex justify="space-between" wrap="wrap" align="center">
        <Text fz="lg" fw={500} c="var(--mantine-color-text)">
          Пользователей:{" "}
          <Text span c={theme.primaryColor} fw={700}>
            {data?.meta.total || 0}
          </Text>
        </Text>
        <Group gap="md">
          <Input.Wrapper w={300}>
            <Input
              value={searchInput}
              leftSection={<IconSearch />}
              placeholder="Поиск по меню..."
              onChange={(e) => {
                setSearchInput(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>

          <Select
            leftSection={
              sort === "asc" ? <IconSortAscending2 /> : <IconSortDescending2 />
            }
            data={sortData}
            defaultValue={"asc"}
            value={sort}
            allowDeselect={false}
            onChange={(e) => e && setSort(e)}
          />

          <Select
            leftSection={<IconFilter />}
            data={filterData}
            defaultValue={"ALL"}
            value={filter}
            allowDeselect={false}
            onChange={(e) => e && setFilter(e)}
          />
        </Group>
      </Flex>
      <Divider my="md" />

      <ScrollArea h="calc(100vh - 220px)" pos="relative">
        <LoadingOverlay visible={isFetching && page === 1} />
        <Table.ScrollContainer minWidth={800}>
          <Table stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Имя</Table.Th>
                <Table.Th>Почта</Table.Th>
                <Table.Th>Телефон</Table.Th>
                <Table.Th>Роль</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.meta.total === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Center py="md">
                      <Text c="dimmed">Пользователи не найдены</Text>
                    </Center>
                  </Table.Td>
                </Table.Tr>
              )}
              {rows}
              <Table.Tr ref={sentinelRef} style={{ height: 1 }}>
                <Table.Td colSpan={5} p={0} />
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        {isFetching && page > 1 && (
          <Center py="md">
            <Loader size="sm" />
          </Center>
        )}
      </ScrollArea>
    </Paper>
  );
}
