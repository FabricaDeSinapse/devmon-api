import { Controller, Get, Param, Query } from '@nestjs/common';
import { CreatureService } from './creature.service';

@Controller('creature')
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @Get()
  findAll(@Query('includeImages') includeImages = true) {
    return this.creatureService.findAll(includeImages);
  }

  @Get(':number')
  findOne(@Param('number') number: number) {
    return this.creatureService.findOne(number);
  }
}
