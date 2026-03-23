import { IUser } from './user.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Database logic goes here
  return user;
};

export const UserService = {
  createUser,
};
