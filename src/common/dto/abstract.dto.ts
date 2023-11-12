import { ApiProperty } from '@nestjs/swagger';
import type { AbstractEntity } from '../abstract.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractDto {
  @PrimaryGeneratedColumn()
  id: number | string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    this.id = entity.id;
    if (!options?.excludeFields) {
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}
