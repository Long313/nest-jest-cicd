import { Injectable, ConflictException } from '@nestjs/common';
import { UserRegisterDto } from '../auth/dto/request/UserRegisterDto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { generateHash } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: UserRegisterDto) {
    let user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await generateHash(createUserDto.password);
    user = await this.create({
      userName: createUserDto.userName,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
      langCode: createUserDto.langCode,
      refreshTokenRevoke: true,
      role: 'USER',
    });
    if (!user) {
      throw new ConflictException('User not created');
    }

    return new UserDto(user);
  }

  async create(data: object) {
    return this.userRepository.save(data);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
