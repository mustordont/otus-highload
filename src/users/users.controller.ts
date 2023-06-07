import { BadRequestException, Body, Controller, Get, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserGuard } from '../auth/user-guard.service';

// @ApiBearerAuth()
// @UseGuards(B2bGuard)
@Controller({
    path: 'user',
})
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @ApiOperation({ summary: 'Get block by id' })
    @Get('user')
    @ApiResponse({ status: HttpStatus.OK, type: Number })
    public async userInfo() {
        return 'user';
    }

    @UserGuard()
    @ApiOperation({ summary: 'Get user by id' })
    @ApiException(() => [BadRequestException])
    @Get('get/:id')
    public async get(@Param() { id }: { id: string }) {
        return this.service.findOne(id);
    }

    @ApiOperation({ summary: 'Example of transform and validate request' })
    @ApiException(() => [BadRequestException])
    @Post('register')
    public register(@Body() user: User) {
        return this.service.create(user);
    }
}
