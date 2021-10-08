import * as Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import { gzip } from 'node-gzip';

export const creatures: Prisma.Creature[] = [
  {
    id: 1,
    number: 1,
    name: 'Creature 1',
    image: 'Monstro-Olhos-1',
    evolveToId: 2,
  },
  {
    id: 2,
    number: 2,
    name: 'Creature 2',
    image: 'Monstro-Olhos-2',
    evolveToId: 3,
  },
  {
    id: 3,
    number: 3,
    name: 'Creature 3',
    image: 'Monstro-Olhos-3',
    evolveToId: null,
  },
  {
    id: 4,
    number: 4,
    name: 'Creature 4',
    image: 'Monstro-Peixe-1',
    evolveToId: 5,
  },
  {
    id: 5,
    number: 5,
    name: 'Creature 5',
    image: 'Monstro-Peixe-2',
    evolveToId: 6,
  },
  {
    id: 6,
    number: 6,
    name: 'Creature 6',
    image: 'Monstro-Peixe-3',
    evolveToId: null,
  },
  {
    id: 7,
    number: 7,
    name: 'Creature 7',
    image: 'Monstro-Lagarto-1',
    evolveToId: 8,
  },
  {
    id: 8,
    number: 8,
    name: 'Creature 8',
    image: 'Monstro-Lagarto-2',
    evolveToId: null,
  },
  {
    id: 9,
    number: 9,
    name: 'Creature 9',
    image: 'Monstro-Planta-1',
    evolveToId: 10,
  },
  {
    id: 10,
    number: 10,
    name: 'Creature 10',
    image: 'Monstro-Planta-2',
    evolveToId: null,
  },
  {
    id: 11,
    number: 11,
    name: 'Creature 11',
    image: 'Monstro-Fogo-1',
    evolveToId: 12,
  },
  {
    id: 12,
    number: 12,
    name: 'Creature 12',
    image: 'Monstro-Fogo-2',
    evolveToId: null,
  },
  {
    id: 13,
    number: 13,
    name: 'Creature 13',
    image: 'Monstro-Lendário',
    evolveToId: null,
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
        evolveToId: undefined,
      },
    });
  }

  for (const obj of Object.values(creatures)) {
    if (!obj.evolveToId) {
      continue;
    }

    await prisma.creature.update({
      where: { number: obj.number },
      data: {
        evolveTo: {
          connect: {
            number: obj.evolveToId,
          },
        },
      },
    });
  }
};
