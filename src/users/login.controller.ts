import { Body, Controller, ForbiddenException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Controller({
    path: 'login',
})
export class LoginController {
    constructor(private authService: AuthService, private userService: UsersService) {}

    @ApiOperation({ summary: 'get jwt' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: LoginResponse,
    })
    @Post()
    public async login(@Body() request: LoginRequest): Promise<LoginResponse> {
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
