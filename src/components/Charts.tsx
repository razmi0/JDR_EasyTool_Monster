import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { ChartTitle } from "./Containers";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// export const data: ChartData<"radar"> = {
//   labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [2, 9, 3, 5, 2, 3],
//       backgroundColor: "rgba(255, 99, 132, 0.2)",
//       borderColor: "rgba(255, 99, 132, 1)",
//       borderWidth: 1,
//     },
//   ],
// };

const options: ChartOptions<"radar"> = {
  normalized: true,
  spanGaps: true,
  interaction: {
    mode: "nearest",
  },
  elements: {
    point: {
      hitRadius: 30,
      hoverRadius: 4,
      radius: 2,
    },
  },
  responsive: true,
  animations: {
    radius: {
      duration: 200,
      easing: "linear",
    },
  },
  scales: {
    r: {
      grid: {
        circular: true,
        color: "#ffffff2c",
      },
      ticks: {
        display: false,
      },
      pointLabels: {
        display: true,
        callback: (label) => {
          return label.charAt(0).toUpperCase() + label.slice(1);
        },
      },
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },

    tooltip: {
      displayColors: false,
      backgroundColor: "#ffffff80",
      bodyColor: "#242424",
      padding: 10,
      bodyFont: {
        size: 14,
        weight: "bold",
      },
      callbacks: {
        label: (context) => {
          const { label, raw } = context;
          return `${label.toUpperCase()} : ${raw}`;
        },
        title: () => {
          return "";
        },
      },
    },
  },
};

const group1 = ["perception", "ac", "fort", "will", "ref", "stealth", "acrobatics"];
const group2 = ["constitution", "wisdom", "dexterity", "strength", "charisma", "intelligence"];
export function RadarChart({ data, color }: { data: ChartData<"radar">; color: string }) {
  const groupIndexes = data.labels?.reduce(
    (acc: number[][], label, i) => {
      if (group1.includes(label as string)) {
        acc[0].push(i);
      } else if (group2.includes(label as string)) {
        acc[1].push(i);
      }
      return acc;
    },
    [[], []] as number[][]
  ) as number[][];

  const groupLabels1 = groupIndexes[0].map((i) => data.labels?.[i]);
  const groupLabels2 = groupIndexes[1].map((i) => data.labels?.[i]);
  const groupData1 = groupIndexes[0].map((i) => data.datasets?.[0].data?.[i]);
  const groupData2 = groupIndexes[1].map((i) => data.datasets?.[0].data?.[i]);
  //labels =>
  const finalData1 = {
    labels: groupLabels1,
    datasets: [
      {
        data: groupData1,
        backgroundColor: color,
      },
    ],
  };

  const finalData2 = {
    labels: groupLabels2,
    datasets: [
      {
        data: groupData2,
        backgroundColor: color,
      },
    ],
  };

  return (
    <>
      <ChartTitle>General Stats</ChartTitle>
      <div style={{ display: "flex", maxHeight: "200px" }}>
        <Radar data={finalData1} options={options} />
        <Radar data={finalData2} options={options} />
      </div>
    </>
  );
}
