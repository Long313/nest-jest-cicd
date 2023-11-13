import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { RoleType } from 'src/constants';
@Entity('user')
export class User extends AbstractEntity {
  @Column()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  role: RoleType;

  @Column()
  @IsNotEmpty()
  refreshTokenRevoke: boolean;

  @Column()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 3, { message: 'langCode must be between 1 and 3 characters' })
  langCode: string;
}
