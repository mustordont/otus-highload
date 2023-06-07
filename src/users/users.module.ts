import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth';
import { LoginController } from './login.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    providers: [UsersService],
    controllers: [LoginController, UsersController],
})
export class UsersModule {}
