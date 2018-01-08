import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { Blog } from './Blog'

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;

    @Column()
    createdAt: Date;

    @Column('uuid', { name: 'blog_id' })
    blogId: string

    @ManyToOne(type => Blog)
    @JoinColumn({ name: 'blog_id' })
    blog: Blog;

}
