import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { Response } from "express";
import { getTypes } from "@/services/tickets-service";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await getTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`${error}`);
  }
}
