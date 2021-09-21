import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockRepository } from './entity/block.repository';
import { TodoModule } from './todo/todo.module';
import { TextModule } from './text/text.module';

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
