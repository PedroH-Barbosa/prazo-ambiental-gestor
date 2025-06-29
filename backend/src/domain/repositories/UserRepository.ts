import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(user: Omit<User, "id">): Promise<void>;
  abstract list(): Promise<User[]>;
}
