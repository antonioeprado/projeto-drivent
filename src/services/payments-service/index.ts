import { notUserTicket } from "@/errors/notUserTicket";
import { wrongTicketId } from "@/errors/wrongTicketId";
import { PaymentInfoType, PaymentRequestInput } from "@/protocols";
import {
  createTicketPayment,
  findPaymentByTicketId,
  getTicketValue,
  updateTicketStatus,
} from "@/repositories/payments-repository";
import { findUserTickets } from "@/repositories/tickets-repository";
import { getTicketsById } from "../tickets-service";

export async function getPaymentsWithTicketId(ticketId: number, userId: number) {
  const payment = await findPaymentByTicketId(ticketId);
  if (!payment) {
    throw wrongTicketId();
  }
  await verifyIfOwner(userId, ticketId);
  return payment;
}

export async function paymentProcessing(paymentInput: PaymentRequestInput, userId: number) {
  await getTicketsById(paymentInput.ticketId);
  await verifyIfOwner(userId, paymentInput.ticketId);

  const { TicketType } = await getTicketValue(paymentInput.ticketId);
  const paymentInfo: PaymentInfoType = {
    ticketId: paymentInput.ticketId,
    value: TicketType.price,
    cardIssuer: paymentInput.cardData.issuer,
    cardLastDigits: paymentInput.cardData.number.toString().slice(13),
  };

  const paidTicket = await createTicketPayment(paymentInfo);
  if (paidTicket) {
    await updateTicketStatus(paymentInput.ticketId);

    return paidTicket;
  }
}

async function verifyIfOwner(userId: number, ticketId: number) {
  const userTickets = await findUserTickets(userId);
  if (!userTickets || userTickets.id !== ticketId) {
    throw notUserTicket();
  }
}
