import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UserDbService } from './user-db.service';
import { users } from "src/Entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepository } from "src/Auth/auth.repository";
import { AuthService } from "src/Auth/auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([users])],
    controllers:[UsersController],
    providers:[UserService, UsersRepository, UserDbService, AuthRepository, AuthService],
})

export class UsersModule{}