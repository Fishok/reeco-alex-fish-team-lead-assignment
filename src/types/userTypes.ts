export type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};


export type CreateUserDto = Omit<User, 'id'>;
export type UpdateUserDto = Partial<Omit<User, 'id'>> & { id: number };