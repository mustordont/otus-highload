import { Body, Controller, ForbiddenException, Get, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginRequest } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

class AppInfo {
    @ApiProperty()
    name: string;
    @ApiProperty()
    version: string;
}

@Controller({
    path: 'login',
})
export class LoginController {
    constructor(private authService: AuthService, private userService: UsersService) {}

    @ApiOperation({ summary: 'get jwt' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: AppInfo,
    })
    @Post()
    public async login(@Body() request: LoginRequest): Promise<{ token: string }> {
        const user = await this.userService.findOne(request.id);
        if (!user) {
            throw new NotFoundException();
        }

        const check = this.authService.createHash(request.password);
        if (check === user.password) {
            return {
                token: this.authService.generateJwt({ id: user.id }),
            };
        } else {
            throw new ForbiddenException();
        }
    }
}
