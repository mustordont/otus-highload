import {
    applyDecorators,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ConfigService } from '../core';

@Injectable()
export class UserGuardService implements CanActivate {
    static TOKEN_NAME = 'token';
    constructor(private readonly config: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const client_token = request.query[UserGuardService.TOKEN_NAME] || request.headers?.authorization;
        if (!client_token) throw new ForbiddenException();

        const user = await this.verifyToken(client_token);
        if (!user) throw new NotFoundException();
        request.user = user;

        return true;
    }

    private async verifyToken(token: string): Promise<JwtPayload> {
        return new Promise(resolve => {
            verify(token, this.config.auth.secret, (error, data) => {
                if (error) {
                    resolve(null);
                } else {
                    resolve(data as JwtPayload);
                }
            });
        });
    }
}

export const UserGuard = () => {
    return applyDecorators(ApiBearerAuth(), ApiBearerAuth(UserGuardService.TOKEN_NAME), UseGuards(UserGuardService));
};
