import express from "express";
import { mobileVerify, verifyOtp } from "../controllers/store/AuthController.js";
const router = express.Router();

router.post("/mobile-verification", mobileVerify);
router.post("/otp-verify", verifyOtp)
export default router;