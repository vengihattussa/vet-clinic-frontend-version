export type UserDefaultValues = {
  code: string;
  fullName: string;
  cellPhone: string;
  userEmail: string;
  address: string;
  inactive: boolean;
  doctor: boolean;
  password: string;
  username: string;
  locations: Array<string>;
  categoryId: string;
  userId?: string;
};

type ICategory = {
  id: number;
  name: string;
  description: string;
};
export type CategoryDataType = ICategory[];

type IPermissonList = {
  id: number;
  name: string;
  userCategoryId: number;
};
export type PermissionList = IPermissonList[];

export type UserResponse = {
  id: string | number;
  fullName: string | null;
  inactive: boolean;
  userId: string;
  userEmail?: string;
};
export type UserTableValue = UserResponse[];
