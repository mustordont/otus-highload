import { ApiHideProperty } from '@nestjs/swagger';
import { classToPlain, Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { Photo } from '../photos/photo.entity';
import { User as UserGenerated } from '../../gen/model/user';

@Entity()
export class User implements UserGenerated {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    first_name: string;

    @Column()
    second_name: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    birthdate: string;

    @Column({ nullable: true })
    biography: string;

    @Column({ nullable: true })
    city?: string;

    @ApiHideProperty()
    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    toJSON() {
        return classToPlain(this);
    }

    // @OneToMany(type => Photo, photo => photo.user)
    // photos: Photo[];
}
