import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PageModule } from './page/page.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './block/todo/todo.module';
import { TagModule } from './block/tag/tag.module';
import { TextModule } from './block/text/text.module';
import { BlockModule } from './block/block.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    //define the connection at the root Module
    TypeOrmModule.forRoot(typeOrmConfig),
    //define the ScheduleModule at the root Module
    ScheduleModule.forRoot(),
    PageModule,
    AuthModule,
    TodoModule,
    TagModule,
    TextModule,
    BlockModule,
  ],
})
export class AppModule {}
