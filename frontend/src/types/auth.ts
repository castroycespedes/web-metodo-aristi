export interface AuthUser {
  id: string;
  email: string;
  username: string;
  roles: string[];
  permissions: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}
