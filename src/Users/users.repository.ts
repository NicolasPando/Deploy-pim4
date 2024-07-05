import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { users } from "src/Entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./create-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(users) private usersRepository:Repository<users>
  ){}

  async getUsers(page?:number, limit?:number){
    if(!page){
      page = 1
    }
    if(!limit){
      limit = 5
    }
    const skip = (page - 1) * limit
    const users = await this.usersRepository.find({
      take:limit,
      skip: skip,
    });
    return users.map(({password, ... userNoPassword })=> userNoPassword);
  }

  async getUserById(id:string){
    const user = await this.usersRepository.findOne({
      where:{id},
      relations:{
        orders:true,
      },
    });
    if(!user) return `No se encontró el usuario con el id ${id}`;
    const newUser = await this.usersRepository.save(user);
    const {password, ...userNoPassword} = newUser;
    return userNoPassword    
  }

  async addUser (user:Partial<users>){
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({id: newUser.id})

    const {password, ...userNoPassword} = dbUser
    return userNoPassword
  }

  async updateUser(id:string, user:Partial<UpdateUserDto>){
    await this.usersRepository.update(id,user);
    const updatedUser = await this.usersRepository.findOneBy({ id })
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword
  } 

  async deleteUser(id:string){
    const user = await this.usersRepository.findOneBy({ id })
    this.usersRepository.remove(user);
    const {password, ...userNoPasword} = user;
    return userNoPasword
    }

  async getUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email})
  }

  async ChangePassword(id:string, password:string, newpassword:string, confirmPassword:string){
    const user:users = await this.usersRepository.findOneBy({ id:id });
    console.log(user)
    if(!user){
     throw new BadRequestException('No existe un usuario con el id ingresado')
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestException('Contraseña incorrecta');
    }

    if (newpassword !== confirmPassword) {
      throw new BadRequestException('La nueva contraseña y la confirmación de la contraseña no coinciden');
  }


    user.password = await bcrypt.hash(newpassword, 10);

    await this.usersRepository.update(id, user)

    return user
  }
  
}


