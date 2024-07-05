import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { users } from "../Entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(users) private readonly userRepository: Repository<users>) {}

  async findByEmail(email: string): Promise<users | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
