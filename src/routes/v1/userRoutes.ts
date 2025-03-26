import { Router } from "express";
const router = Router();
import * as userController from "../../controllers/userControllers";

router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;