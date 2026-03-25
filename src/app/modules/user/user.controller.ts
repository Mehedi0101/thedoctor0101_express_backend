import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

/**
 * @function getMe
 * @description Controller to fetch the current authenticated user's profile relying on req.user.
 */
const getMe = catchAsync(async (req, res) => {
  // Extract email from the decoded JWT payload attached by the auth middleware
  const email = req.user?.email;

  const result = await UserServices.getMe(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  getMe,
};
