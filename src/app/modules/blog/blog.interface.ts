import { Types } from 'mongoose';

export type TBlog = {
  title: string;
  description: string;
  likes: Types.ObjectId[];
  image: string;
  isDeleted: boolean;
};
