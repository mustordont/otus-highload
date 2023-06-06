import { BadRequestException, Body, Controller, Get, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { UsersService } from './users.service';
import { B2bGuard, UserAuthData } from '../core';
import { User } from './user.entity';

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

    @ApiOperation({ summary: 'Get block by Mongo.ObjectId' })
    @ApiException(() => [BadRequestException])
    @Get(':block_id')
    public async get(@Param() { block_id }: any) {
        return this.service.findAll();
    }

    @ApiOperation({ summary: 'Example of transform and validate request' })
    @ApiException(() => [BadRequestException])
    @Post('register')
    public register(@Body() user: User) {
        Logger.log(user);
        return this.service.create(user);
    }
}