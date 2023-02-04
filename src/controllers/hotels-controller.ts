import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { findHotel, findHotels } from "@/services";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotelsList = await findHotels(userId);
    res.status(httpStatus.OK).send(hotelsList);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error.name === "PaymentRequired") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotelId = req.params.id;
    const hotelWithRooms = await findHotel(userId, Number(hotelId));
    res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error.name === "PaymentRequired") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
