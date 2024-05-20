import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Bookings } from "./entities/Bookings";
import { Restaurant } from "./entities/Restaurant";
import { Role } from "./entities/Role";
import { Status } from "./entities/Status";
import { Tables } from "./entities/Tables";
import { User } from "./entities/User";
import { UserRole } from "./entities/UserRole";

configDotenv();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT || "3306", 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Bookings, Restaurant, Role, Status, Tables, User, UserRole],
  logging: false,
});
