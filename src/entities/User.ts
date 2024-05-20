import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookings } from "./Bookings";
import { Restaurant } from "./Restaurant";
import { UserRole } from "./UserRole";

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user", { schema: "reservation" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "phone_number", length: 255 })
  phoneNumber: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("tinyint", { name: "active", default: () => "'1'" })
  active: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Bookings, (bookings) => bookings.user)
  bookings: Bookings[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.createdByUser)
  restaurants: Restaurant[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
