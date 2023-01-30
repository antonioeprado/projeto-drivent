import { userNotEnrolled } from "@/errors/user-not-enrolled";
import { wrongTicketId } from "@/errors/wrongTicketId";
import {
  createUserTicket,
  findEnrollment,
  findTicket,
  findTypes,
  findUserTickets,
} from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

export async function getTypes(): Promise<TicketType[]> {
  const types = await findTypes();
  if (!types) throw new Error("Cannot connect to database");
  return types;
}

export async function getTicketsFromUser(userId: number) {
  const userTickets = await findUserTickets(userId);
  if (!userTickets) {
    throw new Error();
  }
  return userTickets;
}

export async function getTicketsById(ticketId: number) {
  const ticket = await findTicket(ticketId);
  if (!ticket) throw wrongTicketId();
}

export async function insertTicket(typeId: number, userId: number) {
  const enrollment = await findEnrollment(userId);
  if (!enrollment) throw userNotEnrolled();
  return await createUserTicket(typeId, userId);
}
