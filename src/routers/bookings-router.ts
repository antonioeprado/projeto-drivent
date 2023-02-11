import { postBooking } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter.all("/*", authenticateToken);
bookingsRouter.post("/", postBooking);

export { bookingsRouter };
