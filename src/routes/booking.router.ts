import { Router } from "express";
import { handleRequrest } from "../utils";
import { BookingService } from "../services/booking.service";

export const BookingRoute = Router();

BookingRoute.post("/", (req, res) => {
  console.log(req.body);
  const { guestNumber, firstName, lastName, restaurantId, userId } = req.body;
  if (!guestNumber || !firstName || !lastName || !restaurantId || !userId) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  handleRequrest(res, BookingService.createBooking(req.body));
});
