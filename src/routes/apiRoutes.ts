import { Router } from "express";
const router = Router();

import v1Routes from "./v1/v1Routes";

router.use("/v1",v1Routes)

export default router;