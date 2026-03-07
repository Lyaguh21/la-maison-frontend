import { Box, Container, Stack, Text, Tabs } from "@mantine/core";
import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ReservationList from "./components/ReservationList";
import { MOCK_RESERVATIONS } from "./components/mockData";

const ACTIVE_STATUSES = ["BOOKED", "SEATED"];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<string | null>("upcoming");

  const upcomingReservations = MOCK_RESERVATIONS.filter((r) =>
    ACTIVE_STATUSES.includes(r.status),
  );
  const historyReservations = MOCK_RESERVATIONS.filter(
    (r) => !ACTIVE_STATUSES.includes(r.status),
  );

  return (
    <Box py={120}>
      <Container size="md">
        <Stack gap="xl" align="center">
          <Text
            ff="'Playfair Display', serif"
            fw={400}
            fz={48}
            c="black"
            ta="center"
            style={{ letterSpacing: "6px", textTransform: "uppercase" }}
          >
            Профиль
          </Text>
          <Box w={60} h={2} bg="gold.4" />

          {/* Форма редактирования профиля */}
          <Box w="100%">
            <ProfileForm />
          </Box>

          {/* Бронирования */}
          <Box w="100%">
            <Tabs value={activeTab} onChange={setActiveTab} variant="unstyled">
              <Tabs.List
                grow
                style={{
                  position: "relative",
                  borderBottom: "2px solid var(--mantine-color-gray-2)",
                }}
              >
                <FloatingTab
                  value="upcoming"
                  label={`Брони (${upcomingReservations.length})`}
                  isActive={activeTab === "upcoming"}
                />
                <FloatingTab
                  value="history"
                  label={`История посещений (${historyReservations.length})`}
                  isActive={activeTab === "history"}
                />
              </Tabs.List>

              <Box mt="lg">
                <Tabs.Panel value="upcoming">
                  <ReservationList
                    reservations={upcomingReservations}
                    emptyMessage="У вас нет предстоящих бронирований"
                  />
                </Tabs.Panel>

                <Tabs.Panel value="history">
                  <ReservationList
                    reservations={historyReservations}
                    emptyMessage="История посещений пуста"
                  />
                </Tabs.Panel>
              </Box>
            </Tabs>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function FloatingTab({
  value,
  label,
  isActive,
}: {
  value: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Tabs.Tab
      value={value}
      style={{
        position: "relative",
        fontWeight: isActive ? 600 : 400,
        color: isActive
          ? "var(--mantine-color-burgundy-6)"
          : "var(--mantine-color-gray-6)",
        paddingBottom: 12,
        transition: "color 0.2s ease",
        border: "none",
        background: "none",
        cursor: "pointer",
      }}
    >
      {label}
      <Box
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: isActive
            ? "var(--mantine-color-burgundy-6)"
            : "transparent",
          transition: "background-color 0.2s ease",
          borderRadius: 1,
        }}
      />
    </Tabs.Tab>
  );
}
