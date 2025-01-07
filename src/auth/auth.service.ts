import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {

    try {
      const newUser = new this.userModel(createUserDto)

      // 1º Encriptar la constraseña

      // 2º Guardar el usuario

      // 3º Generar el JWT

      return newUser.save();
    } catch (error) {
      if( error.code == 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`)
      }
      throw new InternalServerErrorException('Something terrible happen!!!')
    }

    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
