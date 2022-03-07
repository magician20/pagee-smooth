import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockRepository } from './entity/block.repository';
import { TodoModule } from './todo/todo.module';
import { TextModule } from './text/text.module';
import { TextBlockRepository } from './text/entity/text.repository';
import { TodoBlockRepository } from './todo/entity/todo.repository';
import { Text } from './text/entity/text.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockRepository,],),
    AuthModule,
    TodoModule,
    TextModule,
  ],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
