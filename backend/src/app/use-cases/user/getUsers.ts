import { UserRepository } from "@/domain/repositories/UserRepository";

export class GetUsers {
  constructor(private userRepo: UserRepository) {}

  async execute() {
    return await this.userRepo.list();
  }
}
