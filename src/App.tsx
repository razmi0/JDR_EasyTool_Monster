import creatures from "@Data";
import { RadarChart } from "./components/Charts";
import { Fragment, useState } from "react";
import { DataType, HeatAllDataType, OptionalAllDataType } from "./types";
import { beautifyK, empty, getGenericStats, noNumbers, show } from "./components/helpers";
import { ChartData } from "chart.js";

const LIMITER = 2;

const App = () => {
  const [openRadar, setOpenRadar] = useState(new Array(LIMITER).fill(false));
  const { data } = creatures;
  const {
    finalData,
    nullable,
    nbrsMap,
    allKeys,
    heatOnlyNbrs,
    heatNbrsObj,
    sortedHeat,
    finalChart,
  } = cleanData(data.slice(0, LIMITER));

  const handleClick = (i: number) => {
    setOpenRadar((prev) => {
      const newArr = [...prev];
      newArr[i] = !newArr[i];
      return newArr;
    });
  };

  show(finalData.length, "finalData.length");
  show(nullable.size, "nullable.size");
  show(nbrsMap.size, "nbrsMap.size");
  show(allKeys.size, "allKeys.size");
  show(heatOnlyNbrs.length, "heatOnlyNbrs.length");
  show(Object.keys(heatNbrsObj).length, "heatNbrsObj.length");
  show(sortedHeat.length, "sortedHeat.length");
  show(finalChart, "finalChart");

  return (
    <>
      <h1>Mythical Creatures</h1>
      <ul>
        {finalData.map((creature, i) => {
          const newData = Object.entries(creature);
          return (
            <li key={i} style={{ listStyle: "none", marginTop: "2rem", marginBottom: "2rem" }}>
              {newData.map(([key, value]) => {
                if (value === "") return <Fragment key={key}></Fragment>;

                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div style={{}}>
                      <span style={{ fontWeight: "bold", fontSize: " 18px" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      : {value}
                    </div>
                    {key === "name" && <button onClick={() => handleClick(i)}>Reveal</button>}
                    {key === "name" && openRadar[i] && (
                      <RadarChart data={finalChart[i] as ChartData<"radar">} />
                    )}
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;

const cleanData = (data: DataType[]) => {
  const t1 = performance.now();

  const map: Map<string, string> = new Map();
  let cleanedData: Record<string, string> = {};
  const strMap: Set<string> = new Set();
  const nbrsMap: Set<string> = new Set();

  const heatNbrsMap: Map<string, number> = new Map();
  const heatNbrsObj: HeatAllDataType = {} as HeatAllDataType;

  const finalData: Record<string, string>[] = [];
  const nullable: Map<string, string> = new Map();

  const allKeys: Set<string> = new Set();
  const allKeysEmpty: OptionalAllDataType = {};

  let labels = [];
  let chartData = [];
  const finalChart = [];

  for (let i = 0; i < data.length; i++) {
    //

    for (let [key, value] of Object.entries(data[i])) {
      key = beautifyK(key) as keyof OptionalAllDataType;

      //

      if (map.has(key)) {
        value += ", " + map.get(key);
        value = value.replace(/,\s,/g, "");
      }

      //FINAL DATA
      //--

      map.set(key, value);
      value = value.toLowerCase().trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);

      cleanedData[key] = value;

      //NULLABLE // ALL ENTRIES ARE EMPTY AT SOME POINT
      //--
      if (empty(value)) {
        nullable.set(key, value);
      }

      //ALL KEYS
      //--
      allKeys.add(key);

      //ONLY NUMBERS // 20 are only strings
      //ORDERED BY MOST OCCURRING OBJ & MAP
      const n = parseInt(value);
      if (noNumbers(value) === "" && !isNaN(n)) {
        nbrsMap.add(key);
        const current = heatNbrsMap.get(key);
        heatNbrsMap.set(key, current ? current + 1 : 1);
        heatNbrsObj[key] = current ? current + 1 : 1;

        // radarLabelsAndDataElements.push(getGenericStats(key, n));
        const [lbl, val] = getGenericStats(key, n);
        labels.push(...lbl);
        chartData.push(...val);
      }
    }

    // RESET FOR NEXT ITERATION
    //--
    finalData.push(cleanedData);
    finalChart.push({ labels, datasets: [{ data: chartData }] });
    map.clear();
    cleanedData = {};
    labels = [];
    chartData = [];
  }

  const heatOnlyNbrs = Array.from(heatNbrsMap, ([, value]) => value)
    .flat()
    .sort((a, b) => b - a);

  const sortedHeat = Object.entries(heatNbrsObj)
    .sort(([, a], [, b]) => b - a)
    .flat()
    .filter((_, i) => i % 2 === 0);

  allKeys.forEach((key) => {
    allKeysEmpty[key] = "";
  });

  // FUNCTION TIME EXECUTION
  console.log("cleanData took " + (performance.now() - t1) + " milliseconds.");

  return {
    finalData,
    nullable,
    nbrsMap,
    allKeys,
    heatOnlyNbrs,
    allKeysEmpty,
    strMap,
    heatNbrsObj,
    sortedHeat,
    finalChart,
  };
};

// SORTED BY MOST OCCURRING
// ['perception', 2288]
// ['hp', 2288]
// ['ac', 2288]
// ['fort', 2288]
// ['will', 2288]
// ['ref', 2287]
// ['constitution', 2280]
// ['wisdom', 2248]
// ['creaturelevel', 2199]
// ['dexterity', 2193]
// ['strength', 2125]
// ['charisma', 1809]
// ['athletics', 1622]
// ['stealth', 1426]
// ['intelligence', 1406]
// ['acrobatics', 1283]
// ['intimidation', 891]
// ['deception', 661]
// ['survival', 582]
// ['diplomacy', 442]
// ['religion', 388]
// ['society', 328]
// ['nature', 309]
// ['arcana', 278]
// ['occultism', 265]
// ['thievery', 218]
// ['crafting', 200]
// ['performance', 115]
// ['medicine', 97]
