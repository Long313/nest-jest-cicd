import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) {}

    private getNumber(key: string): number {
        const value = this.get(key);
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
        const  value = this.configService.get<string>(key);
        if(isNil(value)) {
            throw new Error(key + 'enviroment variable does not set');
        }
        return value;
    }
    get authConfig() {
        return {
            jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
            secret: this.getString('JWT_SECRET')
        }
    }
 }