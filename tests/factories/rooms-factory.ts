import faker from "@faker-js/faker";

export function createMultipleRooms() {
  const roomsArr = [];
  for (let i = 0; i < 5; i++) {
    roomsArr.push({
      name: faker.name.findName(),
      capacity: faker.datatype.number({ max: 4 }),
    });
  }
  return roomsArr;
}
