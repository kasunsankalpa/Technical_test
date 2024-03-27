import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('signup')
  async userSignUp( @Body() createUserDto: CreateUserDto){
    return await this.userService.signupUser(createUserDto);
  }

  @Post('login')
  async userLogin( @Body() userLoginDto:UserLoginDto){
    return this.userService.userLogin(userLoginDto);
  }
}
