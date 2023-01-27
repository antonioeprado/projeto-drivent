import { findTypes } from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

export async function getTypes(): Promise<TicketType[]> {
  const types = await findTypes();
  if (!types) throw new Error("Cannot connect to database");
  return types;
}
