import { ChartKeys, DataType, OptionalAllDataType } from "@/types";
import { ChartData } from "chart.js";
import { flushSync } from "react-dom";

const VIEW_LIMITER = 100 as const;
const FOLDED_VIEW_CONVERTER = 5 as const;
const SCREEN_HEIGHT = window.innerHeight;
const SCROLL_FACTOR = 5 as const; // intrinsicly linked to LisElement height
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

export const isDevEnv = () => {
  return import.meta.env.DEV;
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
  const a = 0.8;
  return `rgba(${r},${g},${b},${a})`;
};

export const cleanValue = (value: string) => {
  value = value.replace(/,\s,/g, "").replace(/\s,\s/g, "");
  value = value.toLowerCase().trim();
  value = value.charAt(0).toUpperCase() + value.slice(1);
  return value;
};

export const getAllRandomColors = (length: number) => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(getRandomColor());
  }
  return colors;
};

export const addColorstoCharts = (colors: string[], charts: ChartData<"radar">[]) => {
  charts.map((chart, i) => {
    chart.datasets[0].backgroundColor = colors[i];
  });
  return charts;
};

type F<T extends unknown[] = unknown[]> = (...args: T) => unknown | void;
export const debounce = <T extends unknown[]>(fn: F<T>, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const cleanData = (data: DataType[]) => {
  const map: Map<string, string> = new Map();
  let cleanedData: Record<string, string> = {};
  const finalData: Record<string, string>[] = [];
  const nameSet: Set<string> = new Set();
  let labels = [];
  let chartData = [];
  const finalChart = [];

  console.time("cleanData");

  for (let i = 0; i < data.length; i++) {
    if (data[i].name === "") continue;
    if (nameSet.has(data[i].name)) {
      continue;
    }
    nameSet.add(data[i].name);
    for (let [key, value] of Object.entries(data[i])) {
      key = beautifyK(key) as keyof OptionalAllDataType;
      if (map.has(key)) {
        value += ", " + map.get(key);
      }
      map.set(key, value);
      value = cleanValue(value);
      cleanedData[key] = value;
      const n = parseInt(value);
      if (noNumbers(value) === "" && !isNaN(n)) {
        const [lbl, val] = getGenericStats(key, n); // chart
        labels.push(...lbl); // chart
        chartData.push(...val); // chart
      }
    }
    finalData.push(cleanedData);
    finalChart.push({ labels, datasets: [{ data: chartData }] });
    map.clear();
    cleanedData = {};
    labels = [];
    chartData = [];
  }
  console.timeEnd("cleanData");

  return {
    finalData,
    finalChart,
  };
};

export function forwardView<T>(data: T[], viewIndex: number, span: number) {
  const endIndex = Math.min(data.length - 1, viewIndex + span);
  return data.slice(0, endIndex + 1);
}

export const resize = <T>(arr: T[], length: number, defaultValue = 0 as unknown as T): T[] => {
  if (arr.length === length) return arr;
  if (arr.length > length) arr.splice(0, length);
  if (arr.length < length) {
    while (arr.length < length) arr.push(defaultValue);
  }
  return arr;
};

type FinalDataType = {
  finalData: Record<string, string>[];
  finalChart: { labels: (string | number)[]; datasets: { data: (string | number)[] }[] }[];
  //  { labels: (string | number)[]; datasets: { data: (string | number)[] }[] }[] }
};
export const filterCreaturesBySearch = (
  data: FinalDataType,
  search: string,
  key: string
): FinalDataType => {
  if (search.length === 0) return data;
  const arr: number[] = [];
  const finalData = data.finalData.filter((creature, i) => {
    const isSearched = creature[key].toLowerCase().includes(search.toLowerCase());
    if (isSearched && !arr.includes(i)) {
      arr.push(i);
    }
    return isSearched;
  });

  const finalChart = data.finalChart.filter((_, i) => arr.includes(i));

  return { finalData, finalChart };
};

export const getInViewCreatures = (data: FinalDataType, scroll: number, unFolded: number) => {
  const finalViewLimiter = Math.max(20, VIEW_LIMITER - unFolded * FOLDED_VIEW_CONVERTER);
  const viewIndex = Math.floor((scroll * SCROLL_FACTOR) / SCREEN_HEIGHT);
  const clampedViewIndex = Math.max(0, Math.min(viewIndex, data.finalData.length - 1));
  const inViewCreatures = forwardView(data.finalData, clampedViewIndex, finalViewLimiter);
  const inViewCharts = forwardView(data.finalChart, clampedViewIndex, finalViewLimiter);
  return { inViewCharts, inViewCreatures };
};

export const expCsv = (data: Record<string, string>[]) => {
  console.log(data);
  const csvContent =
    Object.keys(data[0])
      .map((lbl) => lbl.charAt(0).toUpperCase() + lbl.slice(1))
      .join(",") +
    "\n" +
    data
      .map((e) =>
        Object.values(e)
          .map((val) => val.replace(/,/g, " "))
          .join(",")
      )
      .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "data.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const withViewTransition = <T>(fn: (args?: T) => void, args?: T) => {
  const isTransitionable = document.startViewTransition;
  if (!isTransitionable) {
    fn(args);
  } else {
    document.startViewTransition(() => {
      isDevEnv() && console.log("viewTransition happening");
      flushSync(() => {
        fn(args);
      });
    });
  }
};
//
