import { getPayment, postPayment } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentRequestSchema } from "@/schemas/payments-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken);
paymentsRouter.get("/", getPayment);
paymentsRouter.post("/process", validateBody(paymentRequestSchema), postPayment);

export { paymentsRouter };
