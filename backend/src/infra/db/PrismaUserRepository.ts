import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/infra/http/controller";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    // Implement with Prisma, Sequelize, raw SQL, etc.
  }

  async list(): Promise<User[]> {
    return [];
  }
}
