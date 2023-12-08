export interface AuthenticationInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface AuthenticationByTokenInterface {
  toke: string;
}
