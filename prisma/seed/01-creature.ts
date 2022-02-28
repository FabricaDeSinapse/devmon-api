import { Prisma, PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import { gzip } from 'node-gzip';

// Config

const addImagesAsBase64 = false;

// Data

export const creatures: Prisma.CreatureUncheckedCreateInput[] = [
  {
    number: 1,
    name: 'Java',
    image: addImagesAsBase64 ? '#1 Java' : 'https://i.imgur.com/PHfd1h2.png',
    evolveToNumber: 2,
  },
  {
    number: 2,
    name: 'Kotlin',
    image: addImagesAsBase64 ? '#2 Kotlin' : 'https://i.imgur.com/EZ3zCBp.png',
    evolveToNumber: 3,
  },
  {
    number: 3,
    name: 'Android',
    image: addImagesAsBase64 ? '#3 Android' : 'https://i.imgur.com/r4UjONq.png',
  },
  {
    number: 4,
    name: 'C',
    image: addImagesAsBase64 ? '#4 C' : 'https://i.imgur.com/iWeXxA9.png',
    evolveToNumber: 5,
  },
  {
    number: 5,
    name: 'C++',
    image: addImagesAsBase64 ? '#5 C++' : 'https://i.imgur.com/YYkSF5A.png',
    evolveToNumber: 6,
  },
  {
    number: 6,
    name: 'C#',
    image: addImagesAsBase64 ? '#6 C#' : 'https://i.imgur.com/Jldgrr6.png',
  },
  {
    number: 7,
    name: 'JavaScript',
    image: addImagesAsBase64
      ? '#7 JavaScript'
      : 'https://i.imgur.com/WEKXaw3.png',
    evolveToNumber: 8,
  },
  {
    number: 8,
    name: 'TypeScript',
    image: addImagesAsBase64
      ? '#8 TypeScript'
      : 'https://i.imgur.com/SUBhlhe.png',
  },
  {
    number: 9,
    name: 'Express',
    image: addImagesAsBase64 ? '#9 Express' : 'https://i.imgur.com/pRGNm6T.png',
    evolveToNumber: 10,
  },
  {
    number: 10,
    name: 'NestJS',
    image: addImagesAsBase64 ? '#10 NestJS' : 'https://i.imgur.com/1IOVD1l.png',
  },
  {
    number: 11,
    name: 'SQL',
    image: addImagesAsBase64 ? '#11 SQL' : 'https://i.imgur.com/4d8PVxQ.png',
    evolveToNumber: 12,
  },
  {
    number: 12,
    name: 'NoSQL',
    image: addImagesAsBase64 ? '#12 NoSQL' : 'https://i.imgur.com/YEuaYEZ.png',
    evolveToNumber: null,
  },
  {
    number: 13,
    name: 'Unity',
    image: addImagesAsBase64 ? '#13 Unity' : 'https://i.imgur.com/jyo3rpf.png',
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
      where: { number: obj.number },
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
