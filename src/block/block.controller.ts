import { Controller, Body, Patch, Param, ParseIntPipe, UseGuards, ValidationPipe, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { BlockService } from './block.service';
import { TurnIntoBlockDto } from './dto/turn-into-block.dto';
import { Block } from './entity/block.entity';

@Controller('block')
@UseGuards(AuthGuard())
export class BlockController {
  constructor(private blockService: BlockService) { }

  @Patch(':id')
  turnInto(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body(ValidationPipe) turnIntoBlockDto: TurnIntoBlockDto):Promise<Block> {
    return this.blockService.turnInto(id, turnIntoBlockDto, user);
  }

}
