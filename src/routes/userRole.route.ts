import { Router } from "express";
import { handleRequrest } from "../utils";
import { UserRoleService } from "../services/userRole.service";

export const UserRoleRoute = Router();

UserRoleRoute.get("/:id", (req, res) => {
  const id = req.params.id as any as number;
  handleRequrest(res, UserRoleService.getUserRole(id));
});
