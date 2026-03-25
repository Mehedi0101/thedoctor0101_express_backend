import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

/**
 * Registers a new user and issues tokens.
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

const verifyOtp = catchAsync(async (req, res) => {
  const result = await AuthServices.verifyOtp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP verified successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
};
