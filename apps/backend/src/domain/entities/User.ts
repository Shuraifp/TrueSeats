export type Role = "user" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
