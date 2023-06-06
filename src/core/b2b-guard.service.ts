import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, SetMetadata } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from './config';
import { UserAuthData } from './user-param.model';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class B2bGuard implements CanActivate {
    public static TOKEN_NAME: string = 'auth_token';

    constructor(private _reflector: Reflector, private _httpService: HttpService, private _config: ConfigService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this._reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();
        const auth_token = request.query[B2bGuard.TOKEN_NAME] || request.headers?.authorization?.slice(7);
        return this._httpService
            .get(this._config.api.auth, {
                params: {
                    [B2bGuard.TOKEN_NAME]: auth_token,
                },
            })
            .pipe(
                catchError(errors => {
                    Logger.error(errors.message);
                    return of({ data: { errors: errors } });
                }),
                map(result => {
                    if (result.data.errors || result.data.error) {
                        throw new ForbiddenException(result.data.errors?.message || result.data.error?.message);
                    }
                    request.user = new UserAuthData();
                    if (!requiredRoles || requiredRoles.length === 0) {
                        return true;
                    }
                    return requiredRoles.some(i => request.user.roles.includes(i));
                }),
            );
    }
}
