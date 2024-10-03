export interface RegisterRequestType {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "WORKER";
  position: string;
  birthdate: Date;
  isActive: boolean;
}
