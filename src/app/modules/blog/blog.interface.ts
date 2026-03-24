import { Types } from 'mongoose';

// --- Blog Interface ---
export type IBlog = {
  title: string;
  description: string; // Rich text content (HTML/Markdown)
  likes: Types.ObjectId[];
  image: string;
  isDeleted: boolean;
};
