import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from './entity/page.repository';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { AuthModule } from '../auth/auth.module'
import { TodoModule } from 'src/block/todo/todo.module';
import { TagModule } from 'src/block/tag/tag.module';
import { TodoBlockRepository } from 'src/block/todo/entity/todo.repository';
import { TagBlockRepository } from 'src/block/tag/entity/tag.repository';
import { TextBlockRepository } from 'src/block/text/entity/text.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PageRepository,TextBlockRepository,TodoBlockRepository,TagBlockRepository],),
    AuthModule,
    TodoModule,
    TagModule,
  ],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {

}
