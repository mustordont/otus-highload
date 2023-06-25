import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserGuard } from '../auth/user-guard.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserSearchRequest } from './dto';

// @UseGuards(B2bGuard)
@Controller({
    path: 'user',
})
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @UserGuard()
    @ApiOperation({ summary: 'Get user by id' })
    @ApiParam({ name: 'id' })
    @ApiException(() => [BadRequestException])
    @Get('get/:id')
    public async get(@Param() { id }: { id: string }) {
        return this.service.findOne(id);
    }

    @UserGuard()
    @ApiOperation({ summary: 'Search user by first_name and last_name' })
    @ApiException(() => [BadRequestException])
    @Get('search')
    public async search(@Query() request: UserSearchRequest) {
        return this.service.search(request);
    }

    @ApiOperation({ summary: 'Register new user' })
    @ApiException(() => [BadRequestException])
    @Post('register')
    public register(@Body() user: User) {
        return this.service.create(user);
    }
}
