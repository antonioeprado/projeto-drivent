import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { Response } from "express";
import { getTicketsFromUser, getTypes, insertTicket } from "@/services/tickets-service";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await getTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`${error}`);
  }
}

export async function getAllTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const tickets = await getTicketsFromUser(userId);
    res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketTypeId } = req.body as UserTicketInput;
    const ticket = await insertTicket(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "UserNotEnrolled") {
      res.status(404).send(error.message);
    }
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

type UserTicketInput = {
  ticketTypeId: number;
};
