import { AppDataSource } from "../db";
import { UserRole } from "../entities/UserRole";
import { UserService } from "./user.service";

const repo = AppDataSource.getRepository(UserRole);

export class UserRoleService {
  static async getUserRole(id: number) {
    const data = await UserService.getUserById(id);
    if (!data) return;
    const userRole = await repo.findOneBy({ userId: data.userId });
    return userRole.roleId;
  }
}
