import { prisma } from "@/config";
import faker from "@faker-js/faker";

export function createMultipleRooms(capacity?: number) {
  const roomsArr = [];
  const cap = capacity || faker.datatype.number({ min: 0, max: 3 });
  for (let i = 0; i < 5; i++) {
    roomsArr.push({
      name: faker.name.findName(),
      capacity: cap,
    });
  }
  return roomsArr;
}

export function createBookedRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 0,
      hotelId,
    },
  });
}
