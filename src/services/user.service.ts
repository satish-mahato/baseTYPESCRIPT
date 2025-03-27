import { UserRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: { email: string; password: string; name: string }): Promise<User> {
    return this.userRepository.createUser(userData);
  }
}