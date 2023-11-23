import { ChartKeys, DataType, OptionalAllDataType } from "@/types";
import { ChartData } from "chart.js";

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
  let labels = [];
  let chartData = [];
  const finalChart = [];

  for (let i = 0; i < data.length; i++) {
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

  return {
    finalData,
    finalChart,
  };
};

export function getElementsAroundIndex<T>(finalData: T[], viewIndex: number, around: number) {
  const startIndex = Math.max(0, viewIndex - around);
  const endIndex = Math.min(finalData.length - 1, viewIndex + around);

  return finalData.slice(startIndex, endIndex + 1);
}
