import * as Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import { gzip } from 'node-gzip';

export const creatures: Prisma.Creature[] = [
  {
    number: 1,
    name: 'Creature 1',
    image: 'Monstro-Olhos-1',
    evolveToNumber: 2,
  },
  {
    number: 2,
    name: 'Creature 2',
    image: 'Monstro-Olhos-2',
    evolveToNumber: 3,
  },
  {
    number: 3,
    name: 'Creature 3',
    image: 'Monstro-Olhos-3',
    evolveToNumber: null,
  },
  {
    number: 4,
    name: 'Creature 4',
    image: 'Monstro-Peixe-1',
    evolveToNumber: 5,
  },
  {
    number: 5,
    name: 'Creature 5',
    image: 'Monstro-Peixe-2',
    evolveToNumber: 6,
  },
  {
    number: 6,
    name: 'Creature 6',
    image: 'Monstro-Peixe-3',
    evolveToNumber: null,
  },
  {
    number: 7,
    name: 'Creature 7',
    image: 'Monstro-Lagarto-1',
    evolveToNumber: 8,
  },
  {
    number: 8,
    name: 'Creature 8',
    image: 'Monstro-Lagarto-2',
    evolveToNumber: null,
  },
  {
    number: 9,
    name: 'Creature 9',
    image: 'Monstro-Planta-1',
    evolveToNumber: 10,
  },
  {
    number: 10,
    name: 'Creature 10',
    image: 'Monstro-Planta-2',
    evolveToNumber: null,
  },
  {
    number: 11,
    name: 'Creature 11',
    image: 'Monstro-Fogo-1',
    evolveToNumber: 12,
  },
  {
    number: 12,
    name: 'Creature 12',
    image: 'Monstro-Fogo-2',
    evolveToNumber: null,
  },
  {
    number: 13,
    name: 'Creature 13',
    image: 'Monstro-Lendário',
    evolveToNumber: null,
  },
];

const readFileAsBase64 = async (filePath: string): Promise<string> => {
  const data = await fs.readFile(filePath, 'binary');
  return convertToBase64(data);
};

const convertToBase64 = (data: string): string => {
  const buffer = Buffer.from(data);
  return buffer.toString('base64');
};

const compressToGzipAsBase64 = async (data: string): Promise<string> => {
  return convertToBase64(await gzip(data));
};

// noinspection JSUnusedGlobalSymbols
export const creature = async (prisma: PrismaClient) => {
  for (const obj of Object.values(creatures)) {
    await prisma.creature.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
        image: await compressToGzipAsBase64(
          await readFileAsBase64(`assets/${obj.image}.png`),
        ),
        evolveToNumber: undefined,
      },
    });
  }

  for (const obj of Object.values(creatures)) {
    if (!obj.evolveToNumber) {
      continue;
    }

    await prisma.creature.update({
      where: { number: obj.number },
      data: {
        evolveTo: {
          connect: {
            number: obj.evolveToNumber,
          },
        },
      },
    });
  }
};
