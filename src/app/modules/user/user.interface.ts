export type IUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
};
