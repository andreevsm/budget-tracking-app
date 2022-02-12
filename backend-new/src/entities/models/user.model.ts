import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';

export interface IUserModel {
  id: number;
  login: string;
  password_hash: string;
  email: string;
  role: RoleEnum;
  status: StatusEnum;
}
