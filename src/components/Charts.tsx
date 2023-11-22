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
import { getRandomColor } from "./helpers";

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
  maintainAspectRatio: false,
};

export function RadarChart({ data }: { data: ChartData<"radar"> }) {
  //labels =>
  const finalData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: getRandomColor(),
    })),
  };

  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        position: "absolute",
        right: "0px",
        marginRight: "3%",
        transform: "translateY(200px)",
      }}
    >
      <Radar data={finalData} options={options} />
    </div>
  );
}
