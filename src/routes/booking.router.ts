import { Router } from "express";
import { handleRequrest } from "../utils";
import { BookingService } from "../services/booking.service";

export const BookingRoute = Router();

BookingRoute.get("/", (req, res) => {
  // console.log(res);
  handleRequrest(res, BookingService.getAllBooking());
});
BookingRoute.get("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, BookingService.getBookingById(id));
});
BookingRoute.put("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, BookingService.updateBooking(id, req.body));
});

// BookingRoute.put("/:id/status", (req, res) => {
//   const id = req.params.id as any as number;
//   handleRequrest(res, BookingService.updateBookingStatus(id, req.body));
// });

BookingRoute.put("/:id/cancel", (req, res) => {
  const id = req.params.id as any as number;
  // console.log(req.body);
  handleRequrest(res, BookingService.updateBookingStatus(id, req.body));
});

BookingRoute.put("/:id/accept", async (req, res) => {
  const bookingId = req.params.id as any as number;
  handleRequrest(res, BookingService.updateBookingStatus(bookingId, req.body));
  // res.sendStatus(200);
});
BookingRoute.post("/", (req, res) => {
  // console.log(req.body);
  const {
    guestNumber,
    firstName,
    lastName,
    restoran: { restaurantId },
    userId,
  } = req.body;
  console.log(req.body);
  if (!guestNumber || !firstName || !lastName || !restaurantId || !userId) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  handleRequrest(res, BookingService.createBooking(req.body));
});
BookingRoute.delete("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, BookingService.deleteBooking(id));
});
