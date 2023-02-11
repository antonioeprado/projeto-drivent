import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { bookRoom } from "@/services";
import httpStatus from "http-status";

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { roomId } = req.body as Record<string, string>;
    const { userId } = req;
    const bookedRoom = await bookRoom(userId, Number(roomId));
    res.status(httpStatus.OK).send({ bookingId: bookedRoom.id });
  } catch (error) {
    if (error.name === "ForbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    } else if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
