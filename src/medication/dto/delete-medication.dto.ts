import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteMedicationDto{
    @IsNotEmpty()
    @IsNumber()
    id
}