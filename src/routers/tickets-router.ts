import { getAllTickets, getTicketTypes, postTicket } from "@/controllers/tickets-controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketTypes);
ticketsRouter.get("/", getAllTickets);
ticketsRouter.post("/", postTicket);

export { ticketsRouter };
