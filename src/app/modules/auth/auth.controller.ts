import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

/**
 * @function registerUser
 * @description Registers a new user, creates their account, and issues access tokens.
 */
const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  const { accessToken, newUser } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully!",
    data: {
      accessToken,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    },
  });
});

/**
 * @function loginUser
 * @description Authenticates a user using email and password, and issues access tokens upon successful login.
 */
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

/**
 * @function forgotPassword
 * @description Initiates the password recovery process by generating and sending a 6-digit OTP to the user's email.
 */
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthServices.forgotPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'If email exists in our system, an OTP has been sent.',
    data: null,
  });
});

/**
 * @function verifyOtp
 * @description Verifies the provided OTP against the database and issues a temporary reset token if valid.
 */
const verifyOtp = catchAsync(async (req, res) => {
  const result = await AuthServices.verifyOtp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP verified successfully!',
    data: result,
  });
});

/**
 * @function resetPassword
 * @description Resets the user's securely hashed password using a valid reset token.
 */
const resetPassword = catchAsync(async (req, res) => {
  await AuthServices.resetPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: null,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
