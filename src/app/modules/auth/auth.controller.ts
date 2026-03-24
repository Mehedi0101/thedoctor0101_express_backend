import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
    },
  });
});

export const AuthController = {
  registerUser,
};
