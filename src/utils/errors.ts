import { Response } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export function handleControllerError(
  res: Response,
  error: unknown,
  context: string
) {
  console.error(`${context} error:`, error);

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Database error" });
  }

  if (error instanceof Error) {
    const message = error.message.includes("credentials")
      ? "Invalid credentials"
      : error.message;
    return res.status(401).json({ message });
  }

  res.status(500).json({ message: "Internal server error" });
}

export function validateRequest<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}
