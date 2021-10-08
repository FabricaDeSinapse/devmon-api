import { Module } from '@nestjs/common';
import { CreatureService } from './creature.service';
import { CreatureController } from './creature.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CreatureController],
  providers: [CreatureService],
})
export class CreatureModule {}
