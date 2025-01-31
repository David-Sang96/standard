import express from "express";
import { getUsers, register } from "../controllers/userController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profile_photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  register
);

router.get("/users", getUsers);

export default router;
