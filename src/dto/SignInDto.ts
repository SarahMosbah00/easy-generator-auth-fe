import { CreateUserDto } from "./CreateUserDto";

export interface SignInDto extends Omit<CreateUserDto, 'username'> {}