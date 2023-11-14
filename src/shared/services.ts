import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  private getNumber(key: string): number {
    console.log('before', key);
    const value = this.get(key);
    console.log('after', value);
    try {
      return Number(value);
    } catch {
      throw new Error(key + 'enviroment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);
    return value.replace(/\\n/g, '\n');
  }

  private get(key: string): string {
    if (isNil(key)) {
      throw new Error(key + 'enviroment variable does not set');
    }
    return key;
  }
  get authConfig() {
    const jwt_secret = process.env.JWT_SECRET;
    const jwt_expiration_time = process.env.JWT_EXPIRATION_TIME;
    return {
      jwtExpirationTime: this.getNumber(jwt_expiration_time),
      secret: this.getString(jwt_secret),
    };
  }
}
