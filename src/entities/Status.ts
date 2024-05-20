import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookings } from "./Bookings";

@Index("uq_status_status", ["status"], { unique: true })
@Entity("status", { schema: "reservation" })
export class Status {
  @PrimaryGeneratedColumn({ type: "int", name: "status_id", unsigned: true })
  statusId: number;

  @Column("enum", {
    name: "status",
    unique: true,
    enum: ["accepted", "rejected", "in process"],
  })
  status: "accepted" | "rejected" | "in process";

  @OneToMany(() => Bookings, (bookings) => bookings.status)
  bookings: Bookings[];
}
