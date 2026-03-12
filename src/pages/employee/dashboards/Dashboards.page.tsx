import {
  Alert,
  Grid,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { LineChart } from "@mantine/charts";
import {
  IconAlertCircle,
  IconChartLine,
  IconCurrencyDollar,
  IconCalendarStats,
} from "@tabler/icons-react";
import {
  useReservations7daysQuery,
  useReservationTodayQuery,
  useRevenue7daysQuery,
  useRevenueTodayQuery,
  useWaitersProcessedStats7DaysQuery,
} from "./api/dashboardApi";

export default function Dashboards() {
  const {
    data: revenueToday,
    isLoading: isRevenueTodayLoading,
    isError: isRevenueTodayError,
  } = useRevenueTodayQuery();
  const {
    data: reservationsToday,
    isLoading: isReservationsTodayLoading,
    isError: isReservationsTodayError,
  } = useReservationTodayQuery();
  const { data: revenue7Days } = useRevenue7daysQuery();
  const { data: reservations7Days } = useReservations7daysQuery();
  const { data: waitersProcessedStats7Days } =
    useWaitersProcessedStats7DaysQuery();

  const isTodayLoading = isRevenueTodayLoading || isReservationsTodayLoading;
  const hasTodayError = isRevenueTodayError || isReservationsTodayError;

  const todayRevenueValue = revenueToday?.value ?? 0;
  const todayReservationsValue = reservationsToday?.value ?? 0;

  return (
    <Stack p="xl" gap="md">
      <Text fz="h1" fw={600} ff="'Playfair Display'">
        Дашборды
      </Text>

      {hasTodayError && (
        <Alert
          color="red"
          variant="light"
          icon={<IconAlertCircle size={18} />}
          title="Ошибка загрузки"
        >
          Не удалось получить часть данных дашборда.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper withBorder p="lg" radius="md">
          <Group justify="space-between" align="flex-start" mb="xs">
            <Stack gap={2}>
              <Text c="dimmed" fz="sm">
                Выручка сегодня
              </Text>
              <Text fz={32} fw={700} lh={1.1}>
                {isTodayLoading ? (
                  <Loader size="sm" />
                ) : (
                  `${todayRevenueValue} ₽`
                )}
              </Text>
            </Stack>
            <ThemeIcon variant="light" color="gold" size="lg" radius="md">
              <IconCurrencyDollar size={20} />
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper withBorder p="lg" radius="md">
          <Group justify="space-between" align="flex-start" mb="xs">
            <Stack gap={2}>
              <Text c="dimmed" fz="sm">
                Бронирования сегодня
              </Text>
              <Text fz={32} fw={700} lh={1.1}>
                {isTodayLoading ? <Loader size="sm" /> : todayReservationsValue}
              </Text>
            </Stack>
            <ThemeIcon variant="light" color="burgundy" size="lg" radius="md">
              <IconCalendarStats size={20} />
            </ThemeIcon>
          </Group>
        </Paper>
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper withBorder p="lg" radius="md" h="100%">
            <Group mb="md" gap="xs">
              <ThemeIcon variant="light" color="burgundy" radius="md">
                <IconChartLine size={16} />
              </ThemeIcon>
              <Text fw={600}>Выручка за 7 дней</Text>
            </Group>

            <LineChart
              h={300}
              data={revenue7Days ?? []}
              dataKey="date"
              curveType="monotone"
              tickLine="none"
              gridAxis="xy"
              withLegend
              withDots
              series={[{ name: "value", color: "gold.6", label: "Выручка" }]}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper withBorder p="lg" radius="md" h="100%">
            <Group mb="md" gap="xs">
              <ThemeIcon variant="light" color="burgundy" radius="md">
                <IconChartLine size={16} />
              </ThemeIcon>
              <Text fw={600}>Бронирования за 7 дней</Text>
            </Group>

            <LineChart
              h={300}
              data={reservations7Days ?? []}
              dataKey="date"
              curveType="monotone"
              tickLine="none"
              gridAxis="xy"
              withLegend
              withDots
              series={[
                {
                  name: "value",
                  color: "burgundy.6",
                  label: "Бронирования",
                },
              ]}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper withBorder p="lg" radius="md">
            <Group mb="md" gap="xs">
              <ThemeIcon variant="light" color="gold" radius="md">
                <IconChartLine size={16} />
              </ThemeIcon>
              <Text fw={600}>Продуктивность официантов за 7 дней</Text>
            </Group>

            <LineChart
              h={320}
              data={waitersProcessedStats7Days ?? []}
              dataKey="name"
              curveType="linear"
              tickLine="none"
              gridAxis="xy"
              withLegend
              withDots
              series={[
                {
                  name: "reservations",
                  color: "gold.6",
                  label: "Обработано",
                },
              ]}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
