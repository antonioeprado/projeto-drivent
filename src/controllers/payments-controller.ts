import { AuthenticatedRequest } from "@/middlewares";
import { PaymentRequestInput } from "@/protocols";
import { getPaymentsWithTicketId, paymentProcessing } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketId } = req.query;
    const payment = await getPaymentsWithTicketId(Number(ticketId), userId);
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "WrongTicketId") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error.name === "NotUserTicket") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    } else return res.status(httpStatus.BAD_REQUEST).send(`${error}`);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const paymentInfo = req.body as PaymentRequestInput;
    const processedPayment = await paymentProcessing(paymentInfo, userId);
    res.status(httpStatus.OK).send(processedPayment);
  } catch (error) {
    if (error.name === "WrongTicketId") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === "NotUserTicket") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(`${error}`);
  }
}
