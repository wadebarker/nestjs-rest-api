import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { PostModel } from './posts/posts.interface';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  private posts: Array<PostModel> = [];

  public findAll(): Array<PostModel> {
    this.logger.log('Returning all posts');
    return this.posts;
  }

  public findOne(id: number): PostModel {
    this.logger.log('Returning post by id');
    const post: PostModel = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post was not found');
    }
    return post;
  }

  public create(post: PostModel): PostModel {
    this.logger.log('Create post');
    // check is title exist
    const isTitleExist: boolean = this.posts.some(
      (item) => item.title === post.title,
    );
    if (isTitleExist) {
      throw new UnprocessableEntityException('Post title already exist');
    }
    // count id for post
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;
    const date = new Date();
    const blogPost: PostModel = {
      ...post,
      id,
      date,
    };
    this.posts.push(blogPost);

    return blogPost;
  }

  public delete(id: number): void {
    this.logger.log('Delete post by id');
    const index: number = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found');
    }
    this.posts.splice(index, 1);
  }

  public update(id: number, body: PostModel): PostModel {
    this.logger.log('Update post by id');
    const postId: number = this.posts.findIndex((post) => post.id === id);
    if (postId === -1) {
      throw new NotFoundException('Post does not exist');
    }
    const isTitleExist: boolean = this.posts.some(
      (post) => post.title === body.title && post.id !== id,
    );
    if (isTitleExist) {
      throw new UnprocessableEntityException('Post title already exist');
    }
    const blogPost: PostModel = {
      ...body,
      id,
      date: new Date(),
    };
    this.posts[postId] = blogPost;
    return blogPost;
  }
}
