import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';
import { RoleType } from '../../constants/role-type';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class User extends AbstractEntity {
  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: RoleType;

  @Column()
  refreshTokenRevoke: boolean;

  @Column()
  userName: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 3)
  langCode: string;
}
