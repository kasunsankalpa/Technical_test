import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCustomerDto{
    @IsOptional()
    @IsNumber()
    id

    @IsString()
    @IsNotEmpty()
    first_name

    @IsString()
    @IsOptional()
    middle_name

    @IsString()
    @IsOptional()
    last_name

    @IsString()
    @IsOptional()
    mobile

    @IsString()
    @IsOptional()
    status
}