import { IsNotEmpty, IsString } from "class-validator"

export class UserLoginDto{
   
    @IsString()
    @IsNotEmpty()
    user_name

    @IsString()
    @IsNotEmpty()
    password
}