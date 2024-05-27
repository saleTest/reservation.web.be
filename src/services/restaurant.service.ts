import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Restaurant } from "../entities/Restaurant";
import { checkIfDefined } from "../utils";
import { RestaurantModel } from "../models/restaurant.model";

const repo = AppDataSource.getRepository(Restaurant);

export class RestaurantService {
  static async getAllRestaurants() {
    return await repo.find({
      select: {
        restaurantId: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        details: true,
        rating: true,
        views: true,
        description: true,
        imageUrl: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  static async getRestaurantById(id: number) {
    const data = await repo.findOne({
      select: {
        restaurantId: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        details: true,
        rating: true,
        views: true,
        description: true,
        imageUrl: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        restaurantId: id,
        deletedAt: IsNull(),
      },
    });
    return checkIfDefined(data);
  }
  static async createRestaurant(model: RestaurantModel) {
    try {
      return await repo.save({
        name: model.name,
        location: model.location,
        price: model.price,
        details: model.details,
        phone: model.phone,
        email: model.email,
        description: model.description,
        imageUrl: "r.jpg",
        createdBy: 1,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  }
  static async updateRestaurant(id: number, model: RestaurantModel) {
    const data = await this.getRestaurantById(id);
    data.name = model.name;
    data.location = model.location;
    data.price = model.price;
    data.details = model.details;
    data.phone = model.phone;
    data.email = model.email;
    data.description = model.description;
    data.imageUrl = model.image_url;
    // createdBy= model.created_by;
    data.updatedAt = new Date();
    data.updatedByUser = model.updated_by;
    return await repo.save(data);
  }
  static async deleteRestaurant(id: number) {
    const data = await this.getRestaurantById(id);
    data.deletedAt = new Date();
    await repo.save(data);
  }

  static async getTopRankedRestaurants() {
    console.log(123123);

    return await repo.find({
      select: {
        restaurantId: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        details: true,
        rating: true,
        views: true,
        description: true,
        imageUrl: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        deletedAt: IsNull(),
      },
    });
    // const restaurant = await this.getAllRestaurants();
    // const sortedRestourants = restaurant.sort((a, b) => b.rating - a.rating);
    // const topRankedRestaurants = sortedRestourants.slice(0, 4);

    // return topRankedRestaurants;
  }
}
