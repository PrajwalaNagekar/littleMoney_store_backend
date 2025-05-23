import sendSMSCustomerConsent from "../../services/sendSMSCustomerConsent.js";
import Joi from 'Joi';
import jwt from 'jsonwebtoken';
import EligibilityCheckOtpsModel from '../../models/EligibilityCheckOtps.model.js'

export const sendOtpEligibilityCheck = async (req, res) => {
    const mobileNumberSchema = Joi.object({
        mobileNumber: Joi.string().required(),
    });

    const { error } = mobileNumberSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { mobileNumber } = req.body;
    try {
        if (mobileNumber) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const message = `${otp} is your one-time password(OTP) to check your loan eligibility on LittleMoney Portal`;

            await sendSMSCustomerConsent(mobileNumber, message);

            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now

            const otpDoc = await EligibilityCheckOtpsModel.findOneAndUpdate(
                { mobileNumber },
                { mobileNumber, otp, otpExpiry },
                { upsert: true, new: true }
            );

            console.log("Saved OTP doc:", otpDoc);  // ✅ Add this line


            console.log(" OTP record saved/updated:", otpDoc);
            console.log("OTP saved for:", mobileNumber);
            console.log("Generated OTP:", otp);

            return res.status(200).json({
                success: true,
                message: mobileNumber,
                // otp: otp, 
            });
        }
    } catch (error) {
        console.error("Error in mobileVerify:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }

}
export const verifyOtpEligibilityCheck = async (req, res) => {
    const schema = Joi.object({
        mobileNumber: Joi.string().required(),
        otp: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { mobileNumber, otp } = req.body;

    try {
        const record = await EligibilityCheckOtpsModel.findOne({ mobileNumber });

        if (!record) {
            return res.status(400).json({ message: 'No OTP sent to this number' });
        }

        if (Date.now() > Number(record.otpExpiry)) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        if (record.otp === otp) {
            return res.status(200).json({
                success: true,
                message: "OTP verified successfully",
            });
        } else {
            return res.status(400).json({ message: "Invalid OTP, please check again." });
        }

    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ message: 'Server error during OTP verification' });
    }
};