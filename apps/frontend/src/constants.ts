import type { UserRole } from "./types";

interface Roles {
  Admin: UserRole;
  User: UserRole;
}

export const Role: Roles = {
    Admin: 'admin',
    User: 'user'
}