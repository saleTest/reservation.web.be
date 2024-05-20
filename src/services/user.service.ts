import { Not } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { UserModel } from "../models/user.model";

const repo = AppDataSource.getRepository(User);

export class UserService {
  static async getUserById(id: number) {
    const data = await repo.findOne({
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
      },
      where: {
        userId: id,
        active: Not(0),
      },
    });
    return data;
  }

  static async createUser(model: UserModel) {}

  //   static async getUserByRole(id: number) {
  //     const data = await this.getUserById(id);

  //     // if (!data) return;
  //     const role = await repo.findOne({});

  //     if (data.userRoles.some((role) => role.userRoleId == 1)) {
  //       console.log("je admin");
  //     } else {
  //       console.log("nije");
  //     }
  //   }
}
