import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TextBlockRepository, } from './entity/text.repository';
import { TextController } from './text.controller';
import { TextService } from './text.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TextBlockRepository],),
        AuthModule,
    ],
    controllers: [TextController],
    providers: [TextService],
    exports: [TextService,]
})
export class TextModule {}
