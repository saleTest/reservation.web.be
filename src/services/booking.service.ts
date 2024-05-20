import { AppDataSource } from "../db";
import { Bookings } from "../entities/Bookings";
import { BookingModel } from "../models/booking.model";

const repo = AppDataSource.getRepository(Bookings);

export class BookingService {
  static async getAllBooking() {
    return await repo.find({
      select: {
        bookingId: true,
        firstName: true,
        lastName: true,
        guestNumber: true,
        restoranId: true,
        userId: true,
      },
      // where: {
      //   deletedAt: IsNull(),
      // },
    });
  }
  static async createBooking(model: BookingModel) {
    return await repo.save({
      guestNumber: model.guestNumber,
      firstName: model.firstName,
      lastName: model.lastName,
      restoranId: model.restaurantId,
      userId: model.userId,
      statusId: model.statusId,
    });
  }
}
