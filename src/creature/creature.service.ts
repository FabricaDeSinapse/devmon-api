import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Creature } from './entities/creature.entity';

@Injectable()
export class CreatureService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeImages: boolean) {
    return this.prisma.creature.findMany({
      select: {
        id: true,
        number: true,
        name: true,
        image: includeImages,
        evolveTo: {
          select: {
            id: true,
            number: true,
            name: true,
          },
        },
        evolveFrom: {
          select: {
            id: true,
            number: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number): Promise<Creature> {
    return this.prisma.creature.findUnique({ where: { id } });
  }
}
