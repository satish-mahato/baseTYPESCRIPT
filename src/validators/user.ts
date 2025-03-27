import z from "zod";

// Common error messages
const ERROR_MESSAGES = {
  EMAIL: {
    INVALID: "Please enter a valid email address",
    REQUIRED: "Email is required",
  },
  PASSWORD: {
    LENGTH: "Password must be between 8-50 characters",
    LOWERCASE: "Must contain at least one lowercase letter",
    UPPERCASE: "Must contain at least one uppercase letter",
    NUMBER: "Must contain at least one number",
    SPECIAL_CHAR: "Must contain at least one special character (!@#$%^&*)",
    REQUIRED: "Password is required",
  },
  NAME: {
    LENGTH: "Name must be between 3-50 characters",
    REQUIRED: "Name is required",
  },
};

// Common password validation logic
const passwordValidation = z
  .string()
  .min(8, ERROR_MESSAGES.PASSWORD.LENGTH)
  .max(50, ERROR_MESSAGES.PASSWORD.LENGTH)
  .regex(/[a-z]/, ERROR_MESSAGES.PASSWORD.LOWERCASE)
  .regex(/[A-Z]/, ERROR_MESSAGES.PASSWORD.UPPERCASE)
  .regex(/[0-9]/, ERROR_MESSAGES.PASSWORD.NUMBER)
  .regex(/[!@#$%^&*]/, ERROR_MESSAGES.PASSWORD.SPECIAL_CHAR);

export const userSchema = z.object({
  email: z
    .string({
      required_error: ERROR_MESSAGES.EMAIL.REQUIRED,
    })
    .email(ERROR_MESSAGES.EMAIL.INVALID)
    .transform((val) => val.trim().toLowerCase()),

  password: passwordValidation
    .min(8, ERROR_MESSAGES.PASSWORD.LENGTH)
    .max(50, ERROR_MESSAGES.PASSWORD.LENGTH)
    .nonempty(ERROR_MESSAGES.PASSWORD.REQUIRED),

  name: z
    .string({
      required_error: ERROR_MESSAGES.NAME.REQUIRED,
    })
    .trim()
    .min(3, ERROR_MESSAGES.NAME.LENGTH)
    .max(50, ERROR_MESSAGES.NAME.LENGTH)
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: ERROR_MESSAGES.EMAIL.REQUIRED,
    })
    .email(ERROR_MESSAGES.EMAIL.INVALID)
    .transform((val) => val.trim().toLowerCase()),

  password: z
    .string({
      required_error: ERROR_MESSAGES.PASSWORD.REQUIRED,
    })
    .nonempty(ERROR_MESSAGES.PASSWORD.REQUIRED),
});

// Type definitions for TypeScript
export type UserInput = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
