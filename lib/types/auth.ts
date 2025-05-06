import { College, Department } from '.';

export interface LoginType {
  credential: string;
  password: string;
  role: string;
}

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type ResetPassword = {
  password: string;
  token: string;
  credential: string;
  confirmPassword: string;
};

export type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  department: Department;
  college: College;
};
