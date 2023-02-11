import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { createMultipleRooms } from "./rooms-factory";

export function createHotel(roomCap?: number) {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
      Rooms: {
        createMany: {
          data: createMultipleRooms(roomCap),
        },
      },
    },
    include: { Rooms: true },
  });
}
