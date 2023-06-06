import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export interface IUserAuthData {
    data: any;
    auth_token: string;
}

export class UserAuthData {
    public readonly roles: string[] = [];
    public readonly show_commission: boolean = false;
    public readonly auth_token: string;


}

export const User = createParamDecorator((data: string = '', ctx: ExecutionContext): UserAuthData => {
    const request = ctx.switchToHttp().getRequest();
    return request?.user[data] ?? request.user;
});
