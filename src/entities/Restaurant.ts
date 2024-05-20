import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookings } from "./Bookings";
import { User } from "./User";
import { Tables } from "./Tables";

@Index("fk_restaurant_user_idx", ["createdBy"], {})
@Index("fk_restaurant_updated_idx", ["updatedBy"], {})
@Index("uq_restaurant_name", ["name"], { unique: true })
@Entity("restaurant", { schema: "reservation" })
export class Restaurant {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "restaurant_id",
    unsigned: true,
  })
  restaurantId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "location", length: 255 })
  location: string;

  @Column("varchar", { name: "price", length: 255, default: () => "'FREE'" })
  price: string;

  @Column("varchar", { name: "details", length: 255 })
  details: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("float", { name: "rating", precision: 12, default: () => "'3'" })
  rating: number;

  @Column("float", { name: "views", precision: 12, default: () => "'0'" })
  views: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "image_url", length: 255 })
  imageUrl: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("int", { name: "created_by", unsigned: true })
  createdBy: number;

  @Column("int", { name: "updated_by", nullable: true, unsigned: true })
  updatedBy: number | null;

  @OneToMany(() => Bookings, (bookings) => bookings.restoran)
  bookings: Bookings[];

  @ManyToOne(() => User, (user) => user.restaurants, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "userId" }])
  createdByUser: User;

  @OneToMany(() => Tables, (tables) => tables.restaurant)
  tables: Tables[];

  @JoinColumn([{ name: "updated_by", referencedColumnName: "userId" }])
  updatedByUser: User;
}
