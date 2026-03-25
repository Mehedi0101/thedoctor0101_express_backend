import express from 'express';
import validateRequest, { validateRequestCookies } from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

// --- Auth Routes ---

const router = express.Router();

// User registration
router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser,
);

// Login user
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

// Forgot password
router.post(
  '/forgot-password',
  validateRequest(AuthValidation.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword,
);

// Verify OTP
router.post(
  '/verify-otp',
  validateRequest(AuthValidation.verifyOtpValidationSchema),
  AuthControllers.verifyOtp,
);

export const AuthRoutes = router;
