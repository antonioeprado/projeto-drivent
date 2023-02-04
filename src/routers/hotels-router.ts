import { getAllHotels, getHotelRooms } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken);
hotelsRouter.get("/", getAllHotels);
hotelsRouter.get("/:id", getHotelRooms);

export { hotelsRouter };
