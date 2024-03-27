import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMedicationDto{
    @IsOptional()
    @IsNumber()
    id 
    
    @IsString()
    @IsNotEmpty()
    name

    @IsString()
    @IsNotEmpty()
    description

    @IsNumber()
    @IsNotEmpty()
    qty

    @IsNumber()
    @IsOptional()
    status


}