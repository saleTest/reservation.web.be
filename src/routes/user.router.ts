import { Router } from "express";
import { handleRequrest } from "../utils";
import { UserService } from "../services/user.service";

export const UserRoute = Router();

UserRoute.get("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, UserService.getUserById(id));
});
UserRoute.post("/login", (req, res) => {
  handleRequrest(res, UserService.login(req.body));
});

UserRoute.post("/refresh", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  handleRequrest(res, UserService.refreshToken(token));
});
// UserRoute.get("/role/:id", (req, res) => {
//   const id = req.params.id as any as number;
//   handleRequrest(res, UserService.getUserByRole(id));
// });
