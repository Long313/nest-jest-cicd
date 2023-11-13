import { ApiProperty } from '@nestjs/swagger';
import type { AbstractEntity } from '../abstract.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    this.id = entity.id;
    console.log('entity.id', entity.id);
    if (!options?.excludeFields) {
      console.log('entity.createdAt: ', entity.createdAt);
      console.log('entity.updatedAt: ', entity.updatedAt);
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}
