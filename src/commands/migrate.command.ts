import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

@Injectable()
export class MigrateCommand {
    private buffer: User[] = [];
    private count: number = 0;
    constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>, private authService: AuthService) {}

    @Command({
        command: 'migrate',
    })
    async migrate() {
        // download file from
        // https://raw.githubusercontent.com/OtusTeam/highload/master/homework/people.csv
        const readableStream = fs
            .createReadStream(path.join(__dirname, 'raw.githubusercontent.com_OtusTeam_highload_master_homework_people.csv'))
            .pipe(parse({ delimiter: ',', from_line: 1 }));

        readableStream.on('error', function (error) {
            Logger.error(`error: ${error.message}`);
        });

        for await (const chunk of readableStream) {
            const [name, age, city] = chunk;
            const user = new User();
            user.first_name = name.split(' ')[1];
            user.second_name = name.split(' ')[0];
            user.city = city;
            user.age = Number(age);
            user.password = this.authService.createHash('test');
            // Logger.log(user);
            this.buffer.push(user);
            if (this.buffer.length === 500) {
                await this.save();
            }
        }

        readableStream.on('finish', async () => {
            Logger.log('stream end');
            await this.save();
            Logger.log('Total', this.count);
        });
    }

    private async save() {
        Logger.log('saving ', this.buffer.length, this.usersRepo.manager.connection.isInitialized);

        await this.usersRepo.save(this.buffer);
        this.count += this.buffer.length;
        this.buffer = [];
    }
}
