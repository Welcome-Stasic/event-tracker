export interface ApiResponse<T> {
  data: T;
  message: string | null;
  success: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
