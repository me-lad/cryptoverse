// Directives
import "server-only";

// Local imports
import type { OtpResendResultType, UserOtpCheckerResultType } from "@/lib/types";
import type { OtpDocumentType } from "@/lib/models/Otp/types";
import { AuthService } from "./auth.service";
import { connectToDB } from "@/lib/configs/mongoose";
import { AuthMessages } from "./auth.messages";
import { isDatePassedTime, makeRandomCode } from "@/lib/helpers";
import { restrictionThresholds } from "@/lib/constants";
import OtpModel from "@/lib/models/Otp";
import UserModel from "@/lib/models/User";
import BlockedNumberModel from "@/lib/models/BlockedNumber";

class VerifyService extends AuthService {
  constructor() {
    super();
  }

  async sendOtp(phoneNumber: string): Promise<OtpDocumentType | null> {
    try {
      const data = {
        phoneNumber,
        code: makeRandomCode(),
      };
      await this.sms(data.phoneNumber, data.code);
      return await OtpModel.model.create(data);
    } catch (err) {
      console.log("Error in create otp document ->", err);
      return null;
    }
  }

  async resendOtp(username: string): Promise<OtpResendResultType> {
    const userOtpStatus = await this.checkUserOtpStatus(username);
    const { status } = userOtpStatus;

    const userData = await UserModel.model.findOne({ username });
    if (!userData || status === "Error") {
      return { success: false, message: AuthMessages.Error_CatchHandler };
    }

    if (status === "Limited") {
      return {
        success: false,
        message: AuthMessages.Error_VerificationPermanentLimit,
        refreshNeed: true,
      };
    }

    if (status === "Waiting") {
      const { isTemporaryLimit, referenceTime } = userOtpStatus;

      if (isTemporaryLimit) {
        return {
          success: false,
          isTemporaryLimit: true,
          referenceTime,
          message: "You' ve been temporary limited due to high code request . Please wait.",
        };
      }

      return {
        success: false,
        message:
          "Code has been already sent to you. Please wait for the specified time to get a new one.",
      };
    }

    // status === "Allowed"
    const { phoneNumber } = userData;
    const sendResult = await this.sendOtp(phoneNumber);

    if (!sendResult || !sendResult.createdAt) {
      return { success: false, message: AuthMessages.Error_CatchHandler };
    }

    return {
      success: true,
      newReferenceTime: sendResult.createdAt,
    };
  }

  async checkUserOtpStatus(username: string): Promise<UserOtpCheckerResultType> {
    try {
      // 1. DB connection ensure
      await connectToDB();
      await UserModel.model.init();
      await OtpModel.model.init();
      await BlockedNumberModel.model.init();

      // 2. Find user data to access the phone number
      const userData = await UserModel.model.findOne({ username }, "phoneNumber");

      if (!userData) {
        return { status: "Error", message: AuthMessages.Error_CatchHandler };
      }
      const { phoneNumber } = userData;

      // 3. Check for valid otp document
      const validExistOtpData = await OtpModel.model.findOne({
        phoneNumber,
        expiresAt: { $gte: new Date() },
      });

      if (validExistOtpData && validExistOtpData.createdAt) {
        const { createdAt } = validExistOtpData;
        return { status: "Waiting", referenceTime: createdAt };
      }

      // 4. Count recent codes
      const recentOTPs = await OtpModel.model.countDocuments({
        phoneNumber,
        expiresAt: { $lte: new Date() },
      });

      if (restrictionThresholds.includes(recentOTPs)) {
        if (recentOTPs === 10) {
          // Add phone number to block list
          await BlockedNumberModel.model.create({ phoneNumber });
          await userData.updateOne({
            $set: { isRestricted: true },
          });

          // Return state
          return { status: "Limited" };
        }

        const lastExpiredCode = await OtpModel.model
          .findOne({ phoneNumber, expiresAt: { $lte: new Date() } })
          .sort({ createdAt: -1 });

        if (!lastExpiredCode || !lastExpiredCode.expiresAt) {
          return { status: "Error", message: AuthMessages.Error_CatchHandler };
        }

        const { expiresAt } = lastExpiredCode;
        const isRestrictionPassed = isDatePassedTime(expiresAt, 5);

        if (!isRestrictionPassed) {
          return {
            status: "Waiting",
            referenceTime: expiresAt,
            isTemporaryLimit: true,
          };
        }
      }

      // User has not received any code yet or waiting/restriction passed
      return {
        status: "Allowed",
      };
    } catch (err) {
      console.log("Error in verify service ->", err);
      return { status: "Error", message: AuthMessages.Error_CatchHandler };
    }
  }

  sms(phoneNumber: string, code: string) {
    return fetch("http://ippanel.com/api/select", {
      method: "POST",
      body: JSON.stringify({
        op: "pattern",
        user: process.env.OTP_USERNAME,
        pass: process.env.OTP_PASSWORD,
        fromNum: "3000505",
        toNum: phoneNumber,
        patternCode: "7am85rbvye0bqqz",
        inputData: [{ "verification-code": code }],
      }),
    });
  }
}

export default new VerifyService();
