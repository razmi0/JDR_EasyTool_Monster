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
      hoverRadius: 8,
      radius: 4,
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

export function RadarChart({ data, color }: { data: ChartData<"radar">; color: string }) {
  //labels =>
  const finalData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: color,
    })),
  };

  return (
    <>
      <ChartTitle>General Stats</ChartTitle>
      <Radar data={finalData} options={options} />
    </>
  );
}
