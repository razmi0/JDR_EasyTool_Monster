import { Creature, HeatAllDataType, OptionalAllDataType } from "@/types";
import { beautifyK, cleanValue, empty, noNumbers } from "@Helpers";

export const dataStudy = (data: Creature[]) => {
  const nullables = new Map<string, string>();
  const allKeys = new Set<string>();
  const set = new Set<string>();
  const map = new Map<string, number>();
  const obj: HeatAllDataType = {} as HeatAllDataType;
  const resultMap: Map<string, string> = new Map();

  const dataStudyVars = [];

  for (let i = 0; i < data.length; i++) {
    for (let [key, value] of Object.entries(data[i])) {
      key = beautifyK(key) as keyof OptionalAllDataType;
      if (resultMap.has(key)) {
        value += ", " + resultMap.get(key);
      }
      resultMap.set(key, value);
      value = cleanValue(value);
      addToNullables(nullables, value, key);
      addToAllKeys(allKeys, key);
      dataStudyVars.push(studyNbrs(set, map, obj, key, value));
    }
  }
  console.log("dataStudyVars", dataStudyVars);

  const heatMap = dataStudyVars[0].heatMap;
  const heatObj = dataStudyVars[0].heatObj;
  const nbrsSet = dataStudyVars[0].nbrsSet;

  const heatOnlyNbrs = sortHeatValues(heatMap);
  const sortedHeat = sortObj(heatObj);
  const allKeysEmpty = buildEmptyCompleteCreature(allKeys);

  return {
    nullables,
    allKeys,
    set,
    map,
    obj,
    resultMap,
    heatMap,
    heatObj,
    nbrsSet,
    heatOnlyNbrs,
    sortedHeat,
    allKeysEmpty,
  };
};

const sortObj = (obj: HeatAllDataType) => {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .flat()
    .filter((_, i) => i % 2 === 0);
};

const sortHeatValues = (heatMap: Map<string, number>) => {
  return Array.from(heatMap, ([, value]) => value)
    .flat()
    .sort((a, b) => b - a);
};

const buildEmptyCompleteCreature = (allKeys: Set<string>) => {
  const allKeysEmpty: OptionalAllDataType = {} as OptionalAllDataType;
  allKeys.forEach((key) => {
    allKeysEmpty[key] = "";
  });
  return allKeysEmpty;
};

const addToNullables = (nullables: Map<string, string>, value: string, key: string) => {
  if (empty(value)) {
    nullables.set(key, value);
  }
  return nullables;
};

const addToAllKeys = (allKeys: Set<string>, key: string) => {
  allKeys.add(key);
  return allKeys;
};

const studyNbrs = (
  nbrsSet: Set<string>,
  heatMap: Map<string, number>,
  heatObj: HeatAllDataType,
  key: string,
  value: string
) => {
  const n = parseInt(value);
  if (noNumbers(value) === "" && !isNaN(n)) {
    nbrsSet.add(key);
    const current = heatMap.get(key);
    heatMap.set(key, current ? current + 1 : 1);
    heatObj[key] = current ? current + 1 : 1;
  }
  return { nbrsSet, heatMap, heatObj };
};
