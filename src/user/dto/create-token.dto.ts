import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
    user_id

    @IsString()
  @IsNotEmpty()
    role
  }