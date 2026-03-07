import type { Reservation } from "./ReservationCard";

// Захардкоженные данные бронирований

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

function d(dayOffset: number, hour: number, minute = 0) {
  const date = new Date(today);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export const MOCK_RESERVATIONS: Reservation[] = [
  // Предстоящие
  {
    id: 101,
    tableId: 3,
    guestsCount: 2,
    status: "BOOKED",
    startTime: d(2, 19, 0),
    endTime: d(2, 21, 0),
    createdAt: d(0, 12, 0),
    orders: [],
  },
  {
    id: 102,
    tableId: 7,
    guestsCount: 4,
    status: "BOOKED",
    startTime: d(5, 18, 30),
    endTime: d(5, 20, 30),
    createdAt: d(0, 10, 0),
    orders: [],
  },

  // История
  {
    id: 55,
    tableId: 5,
    guestsCount: 3,
    status: "COMPLETED",
    startTime: d(-3, 19, 0),
    endTime: d(-3, 21, 30),
    realStartTime: d(-3, 19, 5),
    realEndTime: d(-3, 21, 20),
    createdAt: d(-5, 14, 0),
    orders: [
      {
        id: 201,
        totalPriceOrder: 4350,
        createdAt: d(-3, 19, 15),
        orderItems: [
          {
            id: 1,
            dishName: "Стейк Рибай",
            quantity: 2,
            priceSnapshot: 1500,
            status: "SERVED",
            comment: "Medium rare",
          },
          {
            id: 2,
            dishName: "Салат Цезарь",
            quantity: 1,
            priceSnapshot: 650,
            status: "SERVED",
          },
          {
            id: 3,
            dishName: "Тирамису",
            quantity: 1,
            priceSnapshot: 700,
            status: "SERVED",
          },
        ],
      },
    ],
  },
  {
    id: 42,
    tableId: 2,
    guestsCount: 2,
    status: "PAID",
    startTime: d(-7, 20, 0),
    endTime: d(-7, 22, 0),
    realStartTime: d(-7, 20, 10),
    realEndTime: d(-7, 21, 50),
    createdAt: d(-8, 16, 0),
    orders: [
      {
        id: 180,
        totalPriceOrder: 2800,
        createdAt: d(-7, 20, 20),
        orderItems: [
          {
            id: 4,
            dishName: "Паста Карбонара",
            quantity: 1,
            priceSnapshot: 850,
            status: "SERVED",
          },
          {
            id: 5,
            dishName: "Том Ям",
            quantity: 1,
            priceSnapshot: 750,
            status: "SERVED",
          },
          {
            id: 6,
            dishName: "Чизкейк",
            quantity: 2,
            priceSnapshot: 600,
            status: "SERVED",
            comment: "Без топпинга",
          },
        ],
      },
    ],
  },
  {
    id: 38,
    tableId: 4,
    guestsCount: 6,
    status: "COMPLETED",
    startTime: d(-14, 18, 0),
    endTime: d(-14, 21, 0),
    realStartTime: d(-14, 18, 0),
    realEndTime: d(-14, 20, 45),
    createdAt: d(-15, 11, 0),
    orders: [
      {
        id: 160,
        totalPriceOrder: 5200,
        createdAt: d(-14, 18, 10),
        orderItems: [
          {
            id: 7,
            dishName: "Утка по-пекински",
            quantity: 1,
            priceSnapshot: 1800,
            status: "SERVED",
          },
          {
            id: 8,
            dishName: "Ризотто с грибами",
            quantity: 2,
            priceSnapshot: 900,
            status: "SERVED",
          },
          {
            id: 9,
            dishName: "Брускетта",
            quantity: 3,
            priceSnapshot: 400,
            status: "SERVED",
          },
        ],
      },
      {
        id: 161,
        totalPriceOrder: 1800,
        createdAt: d(-14, 19, 30),
        orderItems: [
          {
            id: 10,
            dishName: "Мороженое ассорти",
            quantity: 3,
            priceSnapshot: 350,
            status: "SERVED",
          },
          {
            id: 11,
            dishName: "Эспрессо",
            quantity: 3,
            priceSnapshot: 250,
            status: "SERVED",
          },
        ],
      },
    ],
  },
  {
    id: 30,
    tableId: 1,
    guestsCount: 2,
    status: "CANCELLED",
    startTime: d(-10, 20, 0),
    endTime: d(-10, 22, 0),
    createdAt: d(-12, 9, 0),
    orders: [],
  },
];
