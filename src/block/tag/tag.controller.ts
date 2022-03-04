import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { CreateTagBlockDto as CreateTagBlockDto } from './dto/create-tag-block.dto';
import { GetTagsFilterDto as GetTagsFilterDto } from './dto/get-filter-tag.dto';
import { UpdateTagBlockDto } from './dto/update-tag-block.dto';
import { TagBlock as TagBlock } from './entity/tag-block.entity';
import { TagService as TagService } from './tag.service';

@Controller('tag')
@UseGuards(AuthGuard())
export class TagController {

    constructor(private TagService: TagService) { }

    @Get()
    getAllTag(
        @Query(ValidationPipe) filterDto: GetTagsFilterDto,
        @GetUser() user: User,
    ): Promise<TagBlock[]> {
        //get all Todos
        return this.TagService.getAllTag(filterDto, user);
    }

    @Get('/:id')
    getTagByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<TagBlock> {
        return this.TagService.getTagByID(id, user);
    }

    @Post()
    createTag(
        @Body(ValidationPipe) createTagBlockDto: CreateTagBlockDto,
        @GetUser() user: User,
    ): Promise<TagBlock> {
        return this.TagService.createTag(createTagBlockDto, user);
    }

    @Patch('/:id')
    editTag(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateTagBlockDto: UpdateTagBlockDto,
        @GetUser() user: User,
    ): Promise<TagBlock> {
        return this.TagService.editTag(id, updateTagBlockDto, user);
    }

    @Delete('/:id')
    deleteTagById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.TagService.deleteTagByID(id, user);
    }


}
