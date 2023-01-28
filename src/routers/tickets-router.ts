import { getAllTickets, getTicketTypes, postTicket } from "@/controllers/tickets-controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketCreationSchema } from "@/schemas/tickets-schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketTypes);
ticketsRouter.get("/", getAllTickets);
ticketsRouter.post("/", validateBody(ticketCreationSchema), postTicket);

export { ticketsRouter };
