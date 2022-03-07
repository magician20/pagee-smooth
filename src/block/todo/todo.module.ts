import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TodoBlockRepository } from './entity/todo.repository';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoBlockRepository],),
        AuthModule,
    ],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService,TodoBlockRepository]

})
export class TodoModule { }
