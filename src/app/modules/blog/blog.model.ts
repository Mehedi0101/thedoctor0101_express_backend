import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

// --- Schema Definition ---
const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }, // For rich text content
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// --- Middlewares ---
// Filter out deleted blogs by default
blogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// --- Export Model ---
export const Blog = model<IBlog>('Blog', blogSchema);
