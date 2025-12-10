import { Role } from '../../domain/entities/User';

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: Role;
  };
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
  user: {
    id: number;
    email: string;
    role: Role;
  };
}

