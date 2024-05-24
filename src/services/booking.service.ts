import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Bookings } from "../entities/Bookings";
import { BookingModel } from "../models/booking.model";
import { checkIfDefined } from "../utils";
import { RestaurantService } from "./restaurant.service";

const repo = AppDataSource.getRepository(Bookings);

export class BookingService {
  static async getAllBooking() {
    const bookings: BookingModel[] = await repo.find({
      select: {
        bookingId: true,
        firstName: true,
        lastName: true,
        guestNumber: true,
        restoran: {
          restaurantId: true,
          name: true,
        },
        userId: true,
        status: {
          statusId: true,
          status: true,
        },
      },
      where: {
        deletedAt: IsNull(),
      },
      relations: ["restoran", "status"],
    });

    return bookings;
  }

  static async getBookingById(id: number) {
    const data = await repo.findOne({
      select: {
        bookingId: true,
        guestNumber: true,
        firstName: true,
        lastName: true,
        restoranId: true,
        status: {
          statusId: true,
          // status: true,
        },
        statusId: true,
      },
      where: {
        bookingId: id,
        deletedAt: IsNull(),
      },
      // relations: {
      //   booking:true,
      //   status: true,
      // },
      // relations: ["status"],
    });
    return checkIfDefined(data);
  }

  static async createBooking(model: BookingModel) {
    console.log(model);
    return await repo.save({
      guestNumber: model.guestNumber,
      firstName: model.firstName,
      lastName: model.lastName,
      restoranId: model.restoran.restaurantId,
      // restoranId: model.restoran.restaurantId,
      userId: model.userId,
      // statusId: model.status.statusId,
    });
  }

  static async updateBooking(id: number, model: BookingModel) {
    const data = await this.getBookingById(id);
    data.guestNumber = model.guestNumber;
    data.firstName = model.firstName;
    data.lastName = model.lastName;
    // data.restoranId = model.restoranId;
    data.restoranId = model.restoran.restaurantId;
    data.userId = model.userId;

    return await repo.save(data);
  }

  static async updateBookingStatus(id: number, model: BookingModel) {
    try {
      const data = await this.getBookingById(id);
      // const existingRestaurantId = booking.restoranId;
      // booking.restoranId = existingRestaurantId;

      data.statusId = model.statusId;
      data.userId = 1;
      data.updatedAt = new Date();
      return await repo.save(data);
    } catch (error) {
      console.error("Greška prilikom ažuriranja statusa rezervacije:", error);
      throw error;
    }
  }
  static async deleteBooking(id: number) {
    try {
      const data = await this.getBookingById(id);
      data.userId = 1;

      data.deletedAt = new Date();
      await repo.save(data);
    } catch (error) {
      console.error("Greška prilikom brisanja restorana:", error);
      throw error; // Ponovno izbacivanje greške kako bi se prosledila na viši nivo
    }
  }
}
