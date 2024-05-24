import { Router } from "express";
import { handleRequrest } from "../utils";
import { RestaurantService } from "../services/restaurant.service";

export const RestaurantRoute = Router();

RestaurantRoute.get("/", (req, res) => {
  handleRequrest(res, RestaurantService.getAllRestaurants());
});

RestaurantRoute.get("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, RestaurantService.getRestaurantById(id));
});

RestaurantRoute.post("/", (req, res) => {
  console.log(req.body);
  handleRequrest(res, RestaurantService.createRestaurant(req.body));
});

RestaurantRoute.put("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, RestaurantService.updateRestaurant(id, req.body));
});

RestaurantRoute.delete("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, RestaurantService.deleteRestaurant(id));
});
