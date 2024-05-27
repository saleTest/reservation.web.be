import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Restaurant } from "../entities/Restaurant";
import { checkIfDefined } from "../utils";
import { RestaurantModel } from "../models/restaurant.model";
import { RestaurantService } from "./restaurant.service";

const repo = AppDataSource.getRepository(Restaurant);

export class TopRestaurantService {
  static async getTopRankedRestaurants() {
    const restaurant = await RestaurantService.getAllRestaurants();
    const sortedRestourants = restaurant.sort((a, b) => b.rating - a.rating);
    const topRankedRestaurants = sortedRestourants.slice(0, 4);

    return topRankedRestaurants;
  }
}
