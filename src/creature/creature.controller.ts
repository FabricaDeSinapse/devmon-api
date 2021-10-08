import { Controller, Get, Param, Query } from '@nestjs/common';
import { CreatureService } from './creature.service';

@Controller('creature')
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @Get()
  findAll(@Query('includeImages') includeImages: boolean) {
    return this.creatureService.findAll(includeImages);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.creatureService.findOne(id);
  }
}
