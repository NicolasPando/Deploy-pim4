import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordUserDto } from './create-user.dto';

@Injectable()
export class UserDbService {
    constructor(
       @InjectRepository(users)private readonly userRepository: Repository<users>) {}
    
    async create(user:users){                                                            
        return this.userRepository.save(user)
    }

    async getUsers(): Promise<users[]> {
        return this.userRepository.find();
      }
}
