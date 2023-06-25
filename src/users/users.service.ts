import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '../core';
import { AuthService } from '../auth/auth.service';
import { UserSearchRequest } from './dto';
import { explain } from './explain';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly authService: AuthService,
        private readonly config: ConfigService,
    ) {}

    create(user: User): Promise<User> {
        user.password = this.authService.createHash(user.password);
        return this.usersRepository.save(user);
    }
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async search(request: UserSearchRequest): Promise<any> {
        const q = this.usersRepository
            .createQueryBuilder('user')
            .where('user.first_name like :first_name and user.second_name like :second_name', {
                first_name: `${request.first_name}%`,
                second_name: `${request.second_name}%`,
            })
            .orderBy('id')
            .limit(20);
        console.log(await explain(q as any, this.usersRepository.manager.connection));
        return q.getMany();
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
