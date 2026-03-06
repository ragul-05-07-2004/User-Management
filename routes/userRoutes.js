import express from "express";

const router = express.Router();

import upload from "../middleware/upload.js";

import {
  register,
  login,
  getProfile,
  updateProfile,
  updateImage
} from "../controllers/userController.js";

router.post("/register", upload.single("image"), register);

router.post("/login", login);

router.get("/profile/:email", getProfile);

router.put("/profile/:id", updateProfile);

router.put("/profile/:id/image", upload.single("image"), updateImage);

export default router;