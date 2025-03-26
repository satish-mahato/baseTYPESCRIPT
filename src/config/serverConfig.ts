import dotenv from "dotenv";
dotenv.config();

interface Config {
    PORT: number;
  
}



const parsePort = (port?: string): number => {
    const parsed = parseInt(port || "3000", 10);
    if (isNaN(parsed)) throw new Error("Invalid PORT number");
    return parsed;
};

const config: Config = {
    PORT: parsePort(process.env.PORT)
    
};

export default config;