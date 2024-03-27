import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { CreateTokenDto } from './dto/create-token.dto';
import * as jwt from 'jsonwebtoken';
import { UserLoginDto } from './dto/user-login.dto';
import { roles } from 'src/common/utils/roles';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

   async signupUser(createUserDto:CreateUserDto){

    try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
            createUserDto.password = hashedPassword;
            const user:User = await this.userRepo.save(createUserDto);
            if(user){
                return {success:true, message:'user signup successfully'}
            }else{
                return {error:true, message:'user signup error'}
            }
        
    } catch (error) {
        if(error.errno == 19){
            return {error:true, message:'user name already exists.'}
        }
        return {error:true, message:'user signup error '}
    }
   
   }

   async userLogin(userLoginDto:UserLoginDto){
    try {
        const user:User = await this.userRepo.findOne({where:{user_name:userLoginDto.user_name}});
        if (!user) throw new NotFoundException();
        const isCorrectPwd : boolean = await bcrypt.compare(userLoginDto.password, user.password);
        if(isCorrectPwd){
            const tokenPayload: CreateTokenDto = {
                user_id: user.id.toString(),
                role: user.role,
              };
    
              const accessToken = await jwt.sign(tokenPayload,
                process.env.PRIVATEKEY_ACCESSTOCKEN,
                {
                    expiresIn:3000
                }
                )
    
                return {accessToken:accessToken} ;
        }else{
            throw new UnauthorizedException('userName or password is incorrect');
        }


    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  
   }
}
