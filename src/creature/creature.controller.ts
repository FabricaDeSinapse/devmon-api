import { Controller, Get, Param } from '@nestjs/common';
import { CreatureService } from './creature.service';

@Controller('creature')
export class CreatureController {
  constructor(private readonly creatureService: CreatureService) {}

  @Get()
  findAll() {
    return this.creatureService.findAll();
  }

  @Get(':number')
  findOne(@Param('number') number: number) {
    return this.creatureService.findOne(number);
  }
}
