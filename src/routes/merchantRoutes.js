import express from "express";
import { mobileVerify, verifyOtp } from "../controllers/store/AuthController.js";
import { sendOtpEligibilityCheck, verifyOtpEligibilityCheck } from "../controllers/Merchant/createOrder.controller.js";
const router = express.Router();

router.post("/mobile-verification", mobileVerify);
router.post("/otp-verify", verifyOtp)
router.post('/send-otp-eligibility-check', sendOtpEligibilityCheck)
router.post('/otp-verify-eligible-check', verifyOtpEligibilityCheck)
// router.use()
export default router;