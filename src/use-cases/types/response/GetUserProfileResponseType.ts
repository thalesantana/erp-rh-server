import { Role } from "@prisma/client";

export interface GetUserProfileResponseType {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  position: string;
  birthdate: string;
  is_active: boolean;
  inactive_at: Date | null;
  created_at: Date;
}
