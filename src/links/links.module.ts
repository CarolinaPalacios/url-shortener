import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksController } from './links.controller';
import { Link } from './link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  controllers: [LinksController],
  exports: [LinksService],
})
export class LinksModule {}
