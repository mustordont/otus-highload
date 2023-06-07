import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../core';

import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private config: ConfigService) {}

    public createHash(data: string): string {
        return createHmac('sha256', this.config.auth.secret).update(data).digest('hex');
    }

    public generateJwt(data: Record<string, any>) {
        return sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data,
            },
            this.config.auth.secret,
        );
    }
}
