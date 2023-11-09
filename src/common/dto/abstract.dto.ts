import { ApiProperty } from '@nestjs/swagger';
import type { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    this.id = entity.id.toString();

    if (!options?.excludeFields) {
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}
