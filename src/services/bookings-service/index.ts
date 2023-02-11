import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbiddenError";
import { createBooking, findBooking, findRoom, findTicketInfo } from "@/repositories/bookings-repository";
import { Booking, Room } from "@prisma/client";

export async function bookRoom(userId: number, roomId: number): Promise<Booking> {
  await verifyUser(userId);
  await verifyRoom(roomId);
  const bookedRoom = await createBooking(userId, roomId);
  return bookedRoom;
}

export async function findUserBookings(userId: number): Promise<Pick<Booking, "id"> & { Room: Room }> {
  const booking = await findBooking(userId);
  if (!booking) throw notFoundError();
  return booking;
}

async function verifyRoom(roomId: number) {
  const isValid = await findRoom(roomId);
  if (!isValid) throw notFoundError();
  if (isValid.capacity === 0) throw forbiddenError("Room already fully booked");
}

async function verifyUser(userId: number) {
  const isValid = (await findTicketInfo(userId)).pop();
  if (!isValid) throw forbiddenError("Forbidden!");
  if (isValid.status !== "PAID") throw forbiddenError("Your ticket wasn't paid!");
  if (!isValid.TicketType.includesHotel) throw forbiddenError("Your ticket doesn't include hotels!");
  if (isValid.TicketType.isRemote) throw forbiddenError("Your ticket is remote!");
}
