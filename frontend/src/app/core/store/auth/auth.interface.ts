export interface IUser {
  id?: number;
  email: string;
  login: string;
  role: string;
  status: string;
}

export interface IRequestUser {
  email: string;
  password: string;
}

export interface IResponseUser {
  email: string;
  token: string;
}
