export interface User {
  email: string;
  id: string
  name: string;
  password: string;
  type: "ADMIN" | "USER"
}