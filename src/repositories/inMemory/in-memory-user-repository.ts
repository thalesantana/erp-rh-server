import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ? data.role : "WORKER",
      position: data.position,
      birthdate: new Date(data.birthdate),
      is_active: data.is_active,
      inactive_at: data.inactive_at ? new Date(data.inactive_at) : null,
      created_at: new Date(),
    };
    this.items.push(user);
    return user;
  }
}
