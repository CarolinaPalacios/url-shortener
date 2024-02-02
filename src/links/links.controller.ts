import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/udpate-link.dto';
import { GetLinkDto } from './dto/get-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  async getAllLinks(): Promise<Link[]> {
    return await this.linksService.getAllLinks();
  }

  @Post()
  async createLink(@Body() createLinkDto: CreateLinkDto) {
    return await this.linksService.createLink(createLinkDto);
  }

  @Delete('/:id')
  async deleteLink(@Param() getLinkDto: GetLinkDto) {
    await this.linksService.deleteLink(getLinkDto);
  }

  @Patch('/:id')
  async updateLink(
    @Param() getLinkDto: GetLinkDto,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return await this.linksService.updateLink(getLinkDto, updateLinkDto);
  }
}
