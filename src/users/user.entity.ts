import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

    @Column()
    birthdate: string;

    @Column()
    biography: string;

    @Column()
    city?: string;

    // @OneToMany(type => Photo, photo => photo.user)
    // photos: Photo[];
}
