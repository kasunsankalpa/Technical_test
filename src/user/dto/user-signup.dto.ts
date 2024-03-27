import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto{

    @IsString()
    @IsOptional()
    first_name

    @IsString()
    @IsOptional()
    middle_name

    @IsString()
    @IsOptional()
    last_name

    @IsEmail()
    @IsOptional()
    email

    @IsEmail()
    @IsOptional()
    mobile

    @IsString()
    @IsNotEmpty()
    user_name

    @IsString()
    @IsNotEmpty()
    password

    @IsString()
    @IsNotEmpty()
    role
}