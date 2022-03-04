import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { TextBlock } from './entity/text-block.entity';
import { TextService } from './text.service';

@Controller('text')
@UseGuards(AuthGuard())
export class TextController {
    constructor(private textService: TextService) { }

    @Post()
    @UsePipes(ValidationPipe)
    createText(
        @Body() createTextBlockDto: CreateTextBlockDto,
        @GetUser() user: User,
        //@Body('pageId', ParseIntPipe) pageId: number,
    ): Promise<TextBlock> {
        return this.textService.createText(createTextBlockDto, user);
    }

    @Get('/:id')
    getTextByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<TextBlock> {
        return this.textService.getTextByID(id, user);
    }

    @Patch('/:id')
    editText(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateTextBlockDto: UpdateTextBlockDto,
        //@Body('pageId', ParseIntPipe) pageId: number,
        @GetUser() user: User,
    ): Promise<TextBlock> {
        return this.textService.editText(id, updateTextBlockDto, user);
    }

    @Delete('/:id')
    deleteTextById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.textService.deleteTextByID(id, user);
    }

}
