import { prisma } from "@/config";
import { PrismaPromise, TicketType } from "@prisma/client";

export function findTypes(): PrismaPromise<TicketType[]> {
  return prisma.ticketType.findMany();
}
