import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Creature } from './entities/creature.entity';

@Injectable()
export class CreatureService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    const select: Prisma.CreatureSelect = {
      number: true,
      name: true,
      image: true,
    };

    // Include `evolveTo` until third evolution
    select.evolveTo = {
      select: {
        ...select,
        evolveTo: { select: { ...select } },
      },
    };

    return this.prisma.creature.findMany({ select });
  }

  findOne(number: number): Promise<Creature> {
    return this.prisma.creature.findUnique({ where: { number } });
  }
}
