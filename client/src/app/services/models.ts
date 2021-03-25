export interface PageMeta {
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  totalCount?: number;
}

export interface ApiResponse<T> {
  meta?: PageMeta;
  objects?: T[];
}

export interface User {
  email?: string;
  firstName?: string;
  isActive?: boolean;
  isAnonymous?: boolean;
  lastName?: string;
  picture?: string | URL;
  username?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface UserCreationForm {
  email: string;
  password: string;
  captcha: string;
}

export interface UserChangeForm {
  password: string;
}

export interface ResourceDTO {
  title?: string;
}
