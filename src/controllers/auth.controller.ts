import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { loginSchema, userSchema } from "../validators/user";

import { generateJWT } from "../utils/auth";
import { handleControllerError, validateRequest } from "../utils/errors";
import { transformUser } from "../utils/apiResponse";

export class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  async createUser(req: Request, res: Response) {
    try {
      const validatedData = validateRequest(userSchema, req.body);
      const newUser = await this.userService.createUser(validatedData);
      const token = generateJWT(newUser);

      res.status(201).json({
        user: transformUser(newUser),
        token
      });
    } catch (error) {
      handleControllerError(res, error, 'User creation');
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = validateRequest(loginSchema, req.body);
      const user = await this.authService.validateUser(email, password);
      const token = generateJWT(user);

      res.status(200).json({
        user: transformUser(user),
        token
      });
    } catch (error) {
      handleControllerError(res, error, 'User login');
    }
  }
}


export const authController = new AuthController();