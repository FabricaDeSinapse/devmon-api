import { Prisma, PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import { gzip } from 'node-gzip';

// Config

const addImagesAsBase64 = false;

// Data

export const creatures: Prisma.CreatureUncheckedCreateInput[] = [
  {
    number: 1,
    name: 'Creature 1',
    image: addImagesAsBase64
      ? 'Monstro-Olhos-1'
      : 'https://i.imgur.com/PHfd1h2.png',
    evolveToNumber: 2,
  },
  {
    number: 2,
    name: 'Creature 2',
    image: addImagesAsBase64
      ? 'Monstro-Olhos-2'
      : 'https://i.imgur.com/EZ3zCBp.png',
    evolveToNumber: 3,
  },
  {
    number: 3,
    name: 'Creature 3',
    image: addImagesAsBase64
      ? 'Monstro-Olhos-3'
      : 'https://i.imgur.com/r4UjONq.png',
  },
  {
    number: 4,
    name: 'Creature 4',
    image: addImagesAsBase64
      ? 'Monstro-Peixe-1'
      : 'https://i.imgur.com/iWeXxA9.png',
    evolveToNumber: 5,
  },
  {
    number: 5,
    name: 'Creature 5',
    image: addImagesAsBase64
      ? 'Monstro-Peixe-2'
      : 'https://i.imgur.com/YYkSF5A.png',
    evolveToNumber: 6,
  },
  {
    number: 6,
    name: 'Creature 6',
    image: addImagesAsBase64
      ? 'Monstro-Peixe-3'
      : 'https://i.imgur.com/Jldgrr6.png',
  },
  {
    number: 7,
    name: 'Creature 7',
    image: addImagesAsBase64
      ? 'Monstro-Lagarto-1'
      : 'https://i.imgur.com/WEKXaw3.png',
    evolveToNumber: 8,
  },
  {
    number: 8,
    name: 'Creature 8',
    image: addImagesAsBase64
      ? 'Monstro-Lagarto-2'
      : 'https://i.imgur.com/SUBhlhe.png',
  },
  {
    number: 9,
    name: 'Creature 9',
    image: addImagesAsBase64
      ? 'Monstro-Planta-1'
      : 'https://i.imgur.com/4d8PVxQ.png',
    evolveToNumber: 10,
  },
  {
    number: 10,
    name: 'Creature 10',
    image: addImagesAsBase64
      ? 'Monstro-Planta-2'
      : 'https://i.imgur.com/YEuaYEZ.png',
  },
  {
    number: 11,
    name: 'Creature 11',
    image: addImagesAsBase64
      ? 'Monstro-Fogo-1'
      : 'https://i.imgur.com/pRGNm6T.png',
    evolveToNumber: 12,
  },
  {
    number: 12,
    name: 'Creature 12',
    image: addImagesAsBase64
      ? 'Monstro-Fogo-2'
      : 'https://i.imgur.com/1IOVD1l.png',
    evolveToNumber: null,
  },
  {
    number: 13,
    name: 'Creature 13',
    image: addImagesAsBase64
      ? 'Monstro-Lendário'
      : 'https://i.imgur.com/jyo3rpf.png',
    legendary: true,
    evolveToNumber: null,
  },
];

// Base 64 Functions

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

// Get Image

const getImage = async (obj: Prisma.CreatureUncheckedCreateInput) =>
  addImagesAsBase64
    ? compressToGzipAsBase64(await readFileAsBase64(`assets/${obj.image}.png`))
    : obj.image;

// Insert Data

// noinspection JSUnusedGlobalSymbols
export const creature = async (prisma: PrismaClient) => {
  // Insert records

  for (const obj of Object.values(creatures)) {
    await prisma.creature.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
        image: await getImage(obj),
        evolveToNumber: undefined,
      },
    });
  }

  // Add evolutions

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
