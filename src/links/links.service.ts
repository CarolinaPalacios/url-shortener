import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { GetLinkDto } from './dto/get-link.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linksRepository: Repository<Link>,
  ) {}

  async getAllLinks() {
    return await this.linksRepository.find({});
  }

  async createLink({ name, url }: CreateLinkDto) {
    const link = this.linksRepository.create({ name, url });
    try {
      return await this.linksRepository.save(link);
    } catch (error) {
      if (error.code == '23505')
        throw new ConflictException('Short name already in use');
    }
  }

  async getLink(conditions: FindOptionsWhere<Link>) {
    const link = await this.linksRepository.findOneBy(conditions);
    if (!link) throw new NotFoundException('Link not found');
    return link;
  }

  async deleteLink({ id }: GetLinkDto) {
    const res = await this.linksRepository.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Link with ID: "${id}" not found`);
  }

  async updateLink({ id }: GetLinkDto, { name, url }: CreateLinkDto) {
    const link = await this.getLink({ id });
    link.name = name;
    link.url = url;
    return await this.linksRepository.save(link);
  }
}
