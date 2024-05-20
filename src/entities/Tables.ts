import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";

@Index("fk_tables_restaurant_idx", ["restaurantId"], {})
@Entity("tables", { schema: "reservation" })
export class Tables {
  @PrimaryGeneratedColumn({ type: "int", name: "tables_id", unsigned: true })
  tablesId: number;

  @Column("int", { name: "restaurant_id", unsigned: true })
  restaurantId: number;

  @Column("int", { name: "table_number" })
  tableNumber: number;

  @Column("int", { name: "seats" })
  seats: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.tables, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "restaurant_id", referencedColumnName: "restaurantId" }])
  restaurant: Restaurant;
}
