"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const user = new client_1.PrismaClient().user;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user.findMany();
    res.json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userById = yield user.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(userById);
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const newUser = yield user.create({
        data: {
            email,
            password,
            name
        },
    });
    res.json(newUser);
});
exports.createUser = createUser;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, password, name } = req.body;
    const updatedUser = yield user.update({
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
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield user.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(deletedUser);
});
exports.deleteUserById = deleteUserById;
