import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { users } from "src/Entities/user.entity";
import * as bcrypt from 'bcrypt'
import { UsersRepository } from "src/Users/users.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository,
    private readonly usersRepository:UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException( "Email o contraseña incorrectos.");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw new BadRequestException('credenciales incorrectas')

      const payLoad = {id:user.id, email:user.email, isAdmin:user.isAdmin}
      const token = this.jwtService.sign(payLoad)

    return {
      message: 'usuario logueado',
      token
    };
  }

  async singUp(user: Partial<users>){
    const { email, password } = user;

    const foundUser = await this.authRepository.findByEmail(email)
    if(foundUser) throw new BadRequestException('El email ya esta registrado');
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.addUser({
      ...user,
      password:hashedPassword
    })
  }
}
