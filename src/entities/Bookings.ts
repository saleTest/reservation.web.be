import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";
import { Status } from "./Status";
import { User } from "./User";

@Index("fk_bookings_restoran_idx", ["restoranId"], {})
@Index("fk_bookings_status_idx", ["statusId"], {})
@Index("fk_bookings_user_idx", ["userId"], {})
@Entity("bookings", { schema: "reservation" })
export class Bookings {
  @PrimaryGeneratedColumn({ type: "int", name: "booking_id", unsigned: true })
  bookingId: number;

  @Column("int", { name: "guest_number" })
  guestNumber: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("int", { primary: true, name: "restoran_id", unsigned: true })
  restoranId: number;

  @Column("int", { primary: true, name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { primary: true, name: "status_id", unsigned: true })
  statusId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.bookings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "restoran_id", referencedColumnName: "restaurantId" }])
  restoran: Restaurant;

  @ManyToOne(() => Status, (status) => status.bookings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "status_id", referencedColumnName: "statusId" }])
  status: Status;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
