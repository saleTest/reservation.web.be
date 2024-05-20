import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserRole } from "./UserRole";

@Index("uq_role_name", ["roleName"], { unique: true })
@Entity("role", { schema: "reservation" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "role_id", unsigned: true })
  roleId: number;

  @Column("enum", {
    name: "role_name",
    unique: true,
    enum: ["admin", "user", "stuff"],
    default: () => "'user'",
  })
  roleName: "admin" | "user" | "stuff";

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
