import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UpdateUserDto } from "./create-user.dto";


@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUsers(page?:number, limit?:number) {
        return await this.usersRepository.getUsers(page, limit);
    }

    async getUserById(id:string){
        return this.usersRepository.getUserById(id)
    }

    async addUser(user: any) {
        return this.usersRepository.addUser(user)
    }

    async deleteUser(id:string) {
        return this.usersRepository.deleteUser(id)
    }

    async updateUser(id:string, UserDto:Partial<UpdateUserDto>){
        return this.usersRepository.updateUser(id, UserDto)
    }

    async ChangePassword(id:string, password:string, newpassword:string, confirmPassword:string){
        return this.usersRepository.ChangePassword(id, password, newpassword,confirmPassword)
    }
}