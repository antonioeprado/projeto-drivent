import { getTicketTypes } from "@/controllers/tickets-controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketTypes);
ticketsRouter.get("/");
ticketsRouter.post("/");

export { ticketsRouter };
