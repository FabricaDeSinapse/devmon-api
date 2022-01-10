export class Creature {
  id?: number;
  number: number;
  name: string;
  image: string;
  evolveFrom?: Creature;
  legendary?: boolean;
}
