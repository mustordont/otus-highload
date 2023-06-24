import { Module } from '@nestjs/common';
import { CommandModule as CliModule } from 'nestjs-command';
import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import { MigrateCommand } from './migrate.command';

@Module({
    imports: [CliModule, UsersModule, AuthModule],
    providers: [MigrateCommand],
})
export class CommandModule {}
