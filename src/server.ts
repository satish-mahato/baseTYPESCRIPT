import express from "express";
const app = express();
import config from "./config/serverConfig";
import apiRoutes from "./routes/apiRoutes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
