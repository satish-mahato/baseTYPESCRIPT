import { User } from "@prisma/client";

export function transformUser(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}