import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/typeorm.config';
import { PageModule } from './page/page.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './block/todo/todo.module';
import { TagModule } from './block/tag/tag.module';
import { TextModule } from './block/text/text.module';
import { BlockModule } from './block/block.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { defaultConfig } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[defaultConfig],
    }),
    //define the connection at the root Module
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useClass : DatabaseConfig,
    }),
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
