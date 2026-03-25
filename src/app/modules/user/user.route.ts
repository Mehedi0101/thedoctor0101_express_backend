import express from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';

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

export const UserRoutes = router;
