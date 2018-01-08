import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import { Blog } from './entity/Blog';

// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {

    async function saveNewBlog (name: string, author: string): Promise<Blog> {
        const blog = new Blog();
        blog.name = name;
        blog.author = author;
        await connection.manager.save(blog);
        return blog
    }

    async function saveNewPost (title: string, blog: Blog): Promise<Post> {
        const post = new Post();
        post.title = title;
        post.createdAt = new Date();
        post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
        post.blog = blog;
        await connection.manager.save(post);
        console.log("Post has been saved: ", post);
        return post
    }

    const blog1 = await saveNewBlog("Blog 1", "Sharon Mwangi")
    await saveNewPost("Blog 1 Post 1", blog1)
    await saveNewPost("Blog 1 Post 2", blog1)
    await saveNewPost("Blog 1 Post 3", blog1)

    const blog2 = await saveNewBlog("Blog 2", "Someone Else")
    await saveNewPost("Blog 2 Post 1", blog2)
    await saveNewPost("Blog 2 Post 2", blog2)
    await saveNewPost("Blog 2 Post 3", blog2)

    const blog3 = await saveNewBlog("Blog 3", "Sharon Mwangi")
    await saveNewPost("Blog 3 Post 1", blog3)
    await saveNewPost("Blog 3 Post 2", blog3)
    await saveNewPost("Blog 3 Post 3", blog3)

    const posts = await connection.getRepository(Post)
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.blog', 'blog')
        .where('blog.author = :author', { author: 'Sharon Mwangi' })
        .orderBy('post.createdAt', 'DESC')
        .skip(1)
        .take(5)
        .getMany()

    console.log("Got posts: ", posts.length)

}).catch(error => console.log("Error: ", error));
