"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const parsePort = (port) => {
    const parsed = parseInt(port || "3000", 10);
    if (isNaN(parsed))
        throw new Error("Invalid PORT number");
    return parsed;
};
const config = {
    PORT: parsePort(process.env.PORT)
};
exports.default = config;
