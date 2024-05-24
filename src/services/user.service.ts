import { Not } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { UserModel } from "../models/user.model";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginModel } from "../models/login.model";
import { checkIfDefined } from "../utils";
import { UserRoleService } from "./userRole.service";

const repo = AppDataSource.getRepository(User);

configDotenv();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService {
  static async login(model: LoginModel) {
    const user = await this.getUserByEmail(model.email);
    // console.log(bcrypt.hashSync(model.password, 10))
    // console.log(user);
    const matches = await bcrypt.compare(model.password, user.password);
    if (matches) {
      const role = await UserRoleService.getUserRole(user.userId);

      return {
        email: user.email,
        role: role,
        access: jwt.sign({ name: user.email, role: role }, accessSecret, {
          expiresIn: accessExpire,
        }),
        refresh: jwt.sign({ name: user.email, role: role }, refreshSecret, {
          expiresIn: refreshExpire,
        }),
      };
    }
    throw new Error("BAD_CREDENTIALS");
  }

  public static async refreshToken(refresh: string) {
    try {
      const decoded: any = jwt.verify(refresh, refreshSecret as string);
      return {
        email: decoded.name,
        role: decoded.role,
        access: jwt.sign(
          { name: decoded.name, role: decoded.role },
          accessSecret,
          {
            expiresIn: accessExpire,
          }
        ),
        refresh: refresh,
      };
    } catch (err) {
      throw new Error("REFRESH_FAILED");
    }
  }

  static async getUserByEmail(email: string) {
    const data = await repo.findOne({
      where: {
        active: Not(0),
        email: email,
      },
    });
    return checkIfDefined(data);
  }

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
