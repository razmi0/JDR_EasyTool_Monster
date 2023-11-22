import { ChartKeys } from "@/types";

export const show = <T>(data: T, label: string) => {
  console.log(label, data);
};

export const beautifyK = (str: string) => {
  const beauty = str.trim().replace(/[\s\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+/g, "");
  return noNumbers(beauty.toLowerCase());
};

export const empty = (str: string) => {
  return str.trim().length === 0;
};

export const noNumbers = (str: string) => {
  return str.replace(/[0-9]/g, "").trim();
};

const genericLabels: ChartKeys[] & string[] = [
  "perception",
  "ac",
  "fort",
  "will",
  "ref",
  "constitution",
  "wisdom",
  "dexterity",
  "strength",
  "charisma",
  "athletics",
  "stealth",
  "intelligence",
  "acrobatics",
];
export const getGenericStats = (key: string | ChartKeys, value: number) => {
  const labels: ChartKeys[] & string[] = [];
  const data: number[] = [];
  if (genericLabels.includes(key) && value > 0) {
    labels.push(key);
    data.push(value);
  }
  return [labels, data];
};

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;
  const a = 1;
  return `rgba(${r},${g},${b},${a})`;
};
