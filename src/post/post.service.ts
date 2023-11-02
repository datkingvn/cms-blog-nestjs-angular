import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const slug = createPostDto.title.split(' ').join('_').toLowerCase();
    return await this.postRepository.insert({ ...createPostDto, slug });
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Post Not Found!');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postRepository.delete(id);
  }
}
