export const localToUtcIso = (
  date: string | undefined,
  time: string | null,
): string => {
  // If date is not provided, use today's local date
  if (!time) {
    throw new Error("Выберите время");
  }
  const now = new Date();
  const localDate = date
    ? date
    : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate(),
      ).padStart(2, "0")}`;

  const [year, month, day] = localDate.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  // Construct local Date and convert to ISO (UTC)
  return new Date(year, month - 1, day, hours, minutes, 0).toISOString();
};
