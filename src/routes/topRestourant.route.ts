import { Router } from "express";
import { handleRequrest } from "../utils";
import { RestaurantService } from "../services/restaurant.service";
import { TopRestaurantService } from "../services/topRastourant.service";

export const TopRestaurantRoute = Router();
TopRestaurantRoute.get("/", async (req, res) => {
  try {
    const topRestaurants = await TopRestaurantService.getTopRankedRestaurants();
    res.status(200).json(topRestaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
