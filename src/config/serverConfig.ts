import dotenv from "dotenv";
dotenv.config();

interface Config {
    PORT: number;
    JWT_SECRET: string;
    SALT_ROUNDS: number;
  
}



const parsePort = (port?: string): number => {
    const parsed = parseInt(port || "3000", 10);
    if (isNaN(parsed)) throw new Error("Invalid PORT number");
    return parsed;
};

const parseJwtSecret = (secret?: string): string => {
    if (!secret) throw new Error("JWT_SECRET must be provided");
    return secret;
};

const parseSaltRounds = (saltRounds?: string): number => {
    const parsed = parseInt(saltRounds || "10", 10);    
    if (isNaN(parsed)) throw new Error("Invalid SALT_ROUNDS number");
    return parsed;
}


const config: Config = {
    PORT: parsePort(process.env.PORT),
    JWT_SECRET: parseJwtSecret(process.env.JWT_SECRET),
    SALT_ROUNDS: parseSaltRounds(process.env.SALT_ROUNDS)
    
    
};

export default config;