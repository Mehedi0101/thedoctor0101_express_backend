import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { USER_ROLE } from './user.constant';
import { IUserModel, TUser } from './user.interface';

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    notificationSettings: {
      pushNotification: {
        type: Boolean,
        default: false,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

// Set password to empty string after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isUserExistsById = async function (id: string) {
  return await this.findById(id).select('-password');
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, IUserModel>('User', userSchema);
