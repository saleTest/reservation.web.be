import { Router } from "express";
import { handleRequrest } from "../utils";
import { UserService } from "../services/user.service";

export const UserRoute = Router();

UserRoute.get("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, UserService.getUserById(id));
});

// UserRoute.get("/role/:id", (req, res) => {
//   const id = req.params.id as any as number;
//   handleRequrest(res, UserService.getUserByRole(id));
// });
