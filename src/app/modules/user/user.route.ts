import express from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

/**
 * @route GET /api/v1/users/me
 * @description Retrieves current authenticated user profile.
 * @access Private (Admin, User)
 */
router.get(
  '/me',
  auth('ADMIN', 'USER'),
  UserControllers.getMe,
);

/**
 * @route PATCH /api/v1/users/change-password
 * @description Changes current authenticated user's password.
 * @access Private (Admin, User)
 */
router.patch(
  '/change-password',
  auth('ADMIN', 'USER'),
  validateRequest(UserValidation.changePasswordValidationSchema),
  UserControllers.changePassword,
);

export const UserRoutes = router;
