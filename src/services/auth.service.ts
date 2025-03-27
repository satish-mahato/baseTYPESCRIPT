import { UserRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";
import { comparePassword } from "../utils/auth";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return user;
  }
}