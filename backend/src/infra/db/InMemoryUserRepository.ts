import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class InMemoryUserRepository extends UserRepository {
  private users: User[] = [];

  async list(): Promise<Omit<User, "id">[]> {
    return this.users;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
