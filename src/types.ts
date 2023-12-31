export type ChartKeys = (
  | "perception"
  | "ac"
  | "fort"
  | "will"
  | "ref"
  | "constitution"
  | "wisdom"
  | "dexterity"
  | "strength"
  | "charisma"
  | "athletics"
  | "stealth"
  | "intelligence"
  | "acrobatics"
) &
  string;

export type AllDataType = {
  ac: string;
  acrobatics: string;
  alignment: string;
  arcana: string;
  athletics: string;
  attack: string;
  charisma: string;
  constitution: string;
  crafting: string;
  creaturelevel: string;
  deception: string;
  dexterity: string;
  diplomacy: string;
  fort: string;
  hp: string;
  immunities: string;
  intelligence: string;
  intimidation: string;
  language: string;
  medicine: string;
  name: string;
  nature: string;
  occultism: string;
  perception: string;
  performance: string;
  rarity: string;
  reaction: string;
  ref: string;
  religion: string;
  resistances: string;
  senses: string;
  size: string;
  society: string;
  source: string;
  speed: string;
  spells: string;
  stealth: string;
  strength: string;
  survival: string;
  thievery: string;
  trait: string;
  weaknesses: string;
  will: string;
  wisdom: string;
} & Record<ChartKeys, string>;

export type HeatAllDataType = {
  ac: number;
  acrobatics: number;
  alignment: number;
  arcana: number;
  athletics: number;
  attack: number;
  charisma: number;
  constitution: number;
  crafting: number;
  creaturelevel: number;
  deception: number;
  dexterity: number;
  diplomacy: number;
  fort: number;
  hp: number;
  immunities: number;
  intelligence: number;
  intimidation: number;
  language: number;
  medicine: number;
  name: number;
  nature: number;
  occultism: number;
  perception: number;
  performance: number;
  rarity: number;
  reaction: number;
  ref: number;
  religion: number;
  resistances: number;
  senses: number;
  size: number;
  society: number;
  source: number;
  speed: number;
  spells: number;
  stealth: number;
  strength: number;
  survival: number;
  thievery: number;
  trait: number;
  weaknesses: number;
  will: number;
  wisdom: number;
} & Record<string, number>;

export type OptionalAllDataType = Partial<AllDataType> & Record<string, string>;

export type DataType = Creature;

export interface Creature {
  name: string;
  "Creature Level": string;
  Source: string;
  Perception: string;
  Senses: string;
  Rarity: string;
  Alignment: string;
  Size: string;
  Trait1: string;
  Trait2: string;
  Trait3: string;
  Trait4: string;
  Trait5: string;
  Trait6: string;
  Trait7: string;
  Language1: string;
  Language2: string;
  Language3: string;
  Language4: string;
  Language5: string;
  Language6: string;
  Language7: string;
  Language8: string;
  Language9: string;
  Language10: string;
  Language11: string;
  Language12: string;
  Language13: string;
  Language14: string;
  Language15: string;
  Strength: string;
  Dexterity: string;
  Constitution: string;
  Intelligence: string;
  Wisdom: string;
  Charisma: string;
  Acrobatics: string;
  Arcana: string;
  Athletics: string;
  Crafting: string;
  Deception: string;
  Diplomacy: string;
  Intimidation: string;
  Medicine: string;
  Nature: string;
  Occultism: string;
  Performance: string;
  Religion: string;
  Society: string;
  Stealth: string;
  Survival: string;
  Thievery: string;
  HP: string;
  AC: string;
  Fort: string;
  Ref: string;
  Will: string;
  Immunities: string;
  Resistances: string;
  Weaknesses: string;
  Speed: string;
  Attack1: string;
  Attack2: string;
  Attack3: string;
  Attack4: string;
  Attack5: string;
  Attack6: string;
  Attack7: string;
  Spells1: string;
  Spells2: string;
  Spells3: string;
  Reaction1: string;
  Reaction2: string;
  Reaction3: string;
}
