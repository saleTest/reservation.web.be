import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Index("fk_user_role_role_idx", ["roleId"], {})
@Index("fk_user_role_user_idx", ["userId"], {})
@Entity("user_role", { schema: "reservation" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "user_role_id", unsigned: true })
  userRoleId: number;

  @Column("int", { primary: true, name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { primary: true, name: "role_id", unsigned: true })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
