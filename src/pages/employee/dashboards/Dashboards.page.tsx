import {
  Alert,
  Box,
  FloatingIndicator,
  Grid,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { LineChart } from "@mantine/charts";
import {
  IconAlertCircle,
  IconCalendarStats,
  IconChartLine,
  IconClockHour4,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useMemo, useRef, useState } from "react";
import type { IDashboardWindow } from "./model/type";
import {
  useAverageVisitDurationQuery,
  useReservationsQuery,
  useReservationsTotalQuery,
  useRevenueQuery,
  useRevenueTotalQuery,
  useWaitersProcessedStatsQuery,
} from "./api/dashboardApi";

type WindowOption = {
  label: string;
  value: IDashboardWindow;
};

const windowOptions: WindowOption[] = [
  { label: "День", value: "day" },
  { label: "Неделя", value: "week" },
  { label: "Месяц", value: "month" },
  { label: "Год", value: "year" },
  { label: "Все время", value: "all" },
];

const periodTitles: Record<IDashboardWindow, string> = {
  day: "день",
  week: "неделю",
  month: "месяц",
  year: "год",
  all: "все время",
};

export default function Dashboards() {
  const [windowMode, setWindowMode] = useState<IDashboardWindow>("week");

  const controlsRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = windowOptions.findIndex(
    (option) => option.value === windowMode,
  );
  const activeControl = controlsRefs.current[activeIndex] ?? null;

  const {
    data: revenueTotal,
    isLoading: isRevenueTotalLoading,
    isError: isRevenueTotalError,
  } = useRevenueTotalQuery(windowMode);

  const {
    data: reservationsTotal,
    isLoading: isReservationsTotalLoading,
    isError: isReservationsTotalError,
  } = useReservationsTotalQuery(windowMode);

  const {
    data: averageVisitDuration,
    isLoading: isAverageVisitLoading,
    isError: isAverageVisitError,
  } = useAverageVisitDurationQuery(windowMode);

  const { data: revenueSeries, isError: isRevenueSeriesError } =
    useRevenueQuery(windowMode);
  const { data: reservationsSeries, isError: isReservationsSeriesError } =
    useReservationsQuery(windowMode);
  const { data: waitersProcessedSeries, isError: isWaitersSeriesError } =
    useWaitersProcessedStatsQuery(windowMode);

  const hasError =
    isRevenueTotalError ||
    isReservationsTotalError ||
    isAverageVisitError ||
    isRevenueSeriesError ||
    isReservationsSeriesError ||
    isWaitersSeriesError;

  const isStatsLoading =
    isRevenueTotalLoading ||
    isReservationsTotalLoading ||
    isAverageVisitLoading;

  const totalRevenueValue = revenueTotal?.value ?? 0;
  const totalReservationsValue = reservationsTotal?.value ?? 0;
  const averageVisitMinutes = averageVisitDuration?.valueMinutes ?? 0;

  const subtitle = useMemo(
    () => `Метрики и графики за ${periodTitles[windowMode]}`,
    [windowMode],
  );

  return (
    <Stack p={{ base: "md", lg: "xl" }} gap="md">
      <Text fz="h1" fw={600} ff="'Playfair Display'">
        Дашборды
      </Text>
      <Text c="dimmed">{subtitle}</Text>

      <Paper withBorder p="xs" radius="md" mx="auto">
        <Box
          ref={parentRef}
          pos="relative"
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {windowOptions.map((option, index) => (
            <UnstyledButton
              key={option.value}
              ref={(node) => {
                controlsRefs.current[index] = node;
              }}
              onClick={() => setWindowMode(option.value)}
              style={(theme) => ({
                borderRadius: theme.radius.sm,
                padding: "8px 12px",
                position: "relative",
                zIndex: 2,
                color:
                  option.value === windowMode
                    ? theme.white
                    : theme.colors.gray[7],
                fontWeight: 600,
                transition: "color 120ms ease",
              })}
            >
              {option.label}
            </UnstyledButton>
          ))}

          <FloatingIndicator
            target={activeControl}
            parent={parentRef.current}
            transitionDuration={180}
            style={(theme) => ({
              backgroundColor: theme.colors.burgundy[6],
              borderRadius: theme.radius.sm,
              zIndex: 1,
            })}
          />
        </Box>
      </Paper>

      {hasError && (
        <Alert
          color="red"
          variant="light"
          icon={<IconAlertCircle size={18} />}
          title="Ошибка загрузки"
        >
          Не удалось получить часть данных дашборда.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        <Paper withBorder p="lg" radius="md">
          <Group justify="space-between" align="flex-start" mb="xs">
            <Stack gap={2}>
              <Text c="dimmed" fz="sm">
                Выручка за период
              </Text>
              <Text fz={32} fw={700} lh={1.1}>
                {isStatsLoading ? (
                  <Loader size="sm" />
                ) : (
                  `${totalRevenueValue} ₽`
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
                Бронирования за период
              </Text>
              <Text fz={32} fw={700} lh={1.1}>
                {isStatsLoading ? <Loader size="sm" /> : totalReservationsValue}
              </Text>
            </Stack>
            <ThemeIcon variant="light" color="burgundy" size="lg" radius="md">
              <IconCalendarStats size={20} />
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper withBorder p="lg" radius="md">
          <Group justify="space-between" align="flex-start" mb="xs">
            <Stack gap={2}>
              <Text c="dimmed" fz="sm">
                Среднее время посещения
              </Text>
              <Text fz={32} fw={700} lh={1.1}>
                {isStatsLoading ? (
                  <Loader size="sm" />
                ) : (
                  `${averageVisitMinutes} мин`
                )}
              </Text>
            </Stack>
            <ThemeIcon variant="light" color="gold" size="lg" radius="md">
              <IconClockHour4 size={20} />
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
              <Text fw={600}>Выручка</Text>
            </Group>

            <LineChart
              h={300}
              data={revenueSeries ?? []}
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
              <Text fw={600}>Бронирования</Text>
            </Group>

            <LineChart
              h={300}
              data={reservationsSeries ?? []}
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
              <Text fw={600}>Продуктивность официантов</Text>
            </Group>

            <LineChart
              h={320}
              data={waitersProcessedSeries ?? []}
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
