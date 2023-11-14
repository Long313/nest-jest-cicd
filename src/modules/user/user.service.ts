import { Injectable, ConflictException } from '@nestjs/common';
import { UserRegisterDto } from '../auth/dto/request/UserRegisterDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { generateHash } from '../common/utils';
import { RoleType } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: UserRegisterDto) {
    let user = await this.findUserByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = generateHash(createUserDto.password);
    user = this.userRepository.create({
      userName: createUserDto.userName,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
      langCode: createUserDto.langCode,
      refreshTokenRevoke: true,
      role: RoleType.USER,
    });
    if (!user) {
      throw new ConflictException('User not created');
    }
    return await this.userRepository.save(user);
  }
  async findUserByEmail(condition: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: condition } });
  }

  async updateRefreshToken(userId: any, isRevoke: boolean) {
    return await this.userRepository.update(
      { id: userId },
      { refreshTokenRevoke: isRevoke },
    );
  }
}
