import { UserRepository } from "@/domain/repositories/UserRepository";
import { randomUUID } from "crypto";

export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(data: { name: string; email: string }) {
    const user = { id: randomUUID(), ...data };
    await this.userRepo.create(user);
  }
}
