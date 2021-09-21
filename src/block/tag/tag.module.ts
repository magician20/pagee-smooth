import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TagBlockRepository } from './entity/tag.repository';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagBlockRepository],),
    AuthModule,
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {

}
