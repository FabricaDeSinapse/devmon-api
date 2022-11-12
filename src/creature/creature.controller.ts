import { Controller, Get, Param } from '@nestjs/common';
import { CreatureService } from './creature.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('creature')
@ApiTags('creature')
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista de criaturas',
  })
  findAll() {
    return this.creatureService.findAll();
  }

  @Get(':number')
  @ApiOperation({
    summary: 'Buscar uma criatura pelo número',
  })
  @ApiParam({ name: 'number', example: 1 })
  findOne(@Param('number') number: number) {
    return this.creatureService.findOne(number);
  }
}
