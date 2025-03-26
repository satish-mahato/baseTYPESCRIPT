import { PrismaClient } from "@prisma/client";
const user = new PrismaClient().user;

import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await user.findMany();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userById = await user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(userById);
};

export const createUser = async (req: Request, res: Response) => {
  const { email,password, name } = req.body;
  const newUser = await user.create({
    data: {
        email,
        password,
        name
    },
  });
  res.json(newUser);
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, name } = req.body;
  const updatedUser = await user.update({
    where: {
      id: Number(id),
    },
    data: {
      email,
      password,
      name,
    },
  });
  res.json(updatedUser);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
};

