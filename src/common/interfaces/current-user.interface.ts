export interface CurrentUser {
  id: string;
  email: string;
  username: string | null;
  roles: string[];
  permissions: string[];
}
