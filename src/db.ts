import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./utils/auth";

const prisma = new PrismaClient().$extends({
    name: "UserHooks",
    query: {
      user: {
        async $allOperations({ operation, args, query }) {
        
          if (["create", "update"].includes(operation)) {
           
            const createOrUpdateArgs = args as { data: { password?: string } };
            if (createOrUpdateArgs.data?.password) {
              createOrUpdateArgs.data.password = await hashPassword(createOrUpdateArgs.data.password);
            }
          }
          return query(args);
        },
      },
    },
  });
  export default prisma;