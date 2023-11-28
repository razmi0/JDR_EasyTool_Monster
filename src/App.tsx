import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import creatures from "@Data";
import {
  cleanData,
  getAllRandomColors,
  debounce,
  resize,
  filterCreaturesBySearch,
  getInViewCreatures,
} from "@Helpers";
import { ChartData } from "chart.js";
import {
  RadarChart,
  ListElement,
  VisibilityManager,
  ChartContainer,
  StatsContainer,
  Anchor,
  Stats,
  SearchInput,
  Title,
} from "@Components";
import { useMap } from "@Hooks";
import { expCsv } from "./helpers/helpers";
import { IFrame } from "./components/IFrame";

console.log("START");

const LIMITER = 2194 as const; // LIMITER NEVER CHANGES => 2194 creatures

const App = () => {
  // STATES
  //--

  const [scroll, setScroll] = useState(0);
  const [search, setSearch] = useState("");

  const data = useMemo(() => cleanData(creatures.data.slice(0, LIMITER)), [LIMITER]);
  const colors = useMemo(() => getAllRandomColors(LIMITER), [LIMITER]);

  const listRef = useRef<HTMLLIElement[] | null>(null);
  const { map, toggle } = useMap(
    ["openRadar", "openStats", "seeCreature", "openIFrame"],
    [LIMITER, LIMITER, LIMITER, LIMITER]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HANDLERS
  //--

  const handleRefs = (i: number) => (el: HTMLLIElement | null) => {
    if (!listRef.current) listRef.current = [];
    if (!el) return;
    listRef.current[i] = el;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.currentTarget.value);
  };

  const handleScroll = debounce(() => {
    setScroll(window.scrollY);
  }, 100);

  // FILTERING
  //--
  const debouncedSearch = debounce(setSearch, 300);

  const filteredData = filterCreaturesBySearch(data, search, "name");
  const unFoldedCount = filteredData.finalData.filter((_, i) => map.seeCreature[i]).length;
  const { inViewCharts, inViewCreatures } = getInViewCreatures(filteredData, scroll, unFoldedCount);
  listRef.current = resize(listRef.current ?? [], inViewCreatures.length);

  return (
    <>
      <button
        style={{ position: "absolute", margin: "3rem" }}
        onClick={() => expCsv(filteredData.finalData)}
      >
        Export as CSV
      </button>
      <Anchor />

      <Title as={"h1"}>Mythical Creatures</Title>
      <SearchInput handleSearch={handleSearch} searchedSize={filteredData.finalData.length} />
      <ul style={{ all: "unset" }}>
        {/* LOOP */}
        {inViewCreatures.map((creature, i) => {
          const newData = Object.entries(creature);
          const name = newData[0][1]; // value
          const rest = newData.slice(1);
          return (
            <ListElement
              key={name}
              ref={handleRefs(i)}
              id={`ref_${i}_${name.toLowerCase().replace(/\s/g, "")}`}
            >
              <VisibilityManager
                name={name}
                color={colors[i]}
                reveal={map.seeCreature[i]}
                handleOpenStats={() => toggle(i, "openStats")}
                handleOpenRadar={() => toggle(i, "openRadar")}
                handleOpenIFrame={() => toggle(i, "openIFrame")}
                handleSeeCreature={() => toggle(i, "seeCreature")}
              >
                {map.openStats[i] ? <>Hide stats</> : <>See stats</>}
                {map.openRadar[i] ? <>Hide radar</> : <>Reveal radar</>}
                {map.openIFrame[i] ? <>Hide iframe</> : <>See iframe</>}
                {map.seeCreature[i] ? <>Hide creature</> : <>See creature</>}
              </VisibilityManager>
              {map.seeCreature[i] && (
                <>
                  <StatsContainer>
                    {rest.map(([label, value]) => {
                      return value === "" || inViewCharts[i].labels.includes(label) ? (
                        <Fragment key={label} />
                      ) : (
                        <Stats
                          label={label}
                          value={value}
                          key={label}
                          open={map.openStats[i]}
                          color={colors[i]}
                        />
                      );
                    })}
                  </StatsContainer>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginTop: "20px",
                      gap: "20px",
                    }}
                  >
                    <ChartContainer isOpen={map.openRadar[i]}>
                      <RadarChart data={inViewCharts[i] as ChartData<"radar">} color={colors[i]} />
                    </ChartContainer>
                    {map.openIFrame[i] && (
                      <>
                        <IFrame name={name} />
                      </>
                    )}
                  </div>
                </>
              )}
            </ListElement>
          );
        })}
      </ul>
    </>
  );
};

export default App;

// SORTED BY MOST OCCURRING
// ['perception', 2288] // OOOOOOO
// ['hp', 2288]
// ['ac', 2288] // OOOOOOO
// ['fort', 2288] // OOOOOOO
// ['will', 2288] // OOOOOOO
// ['ref', 2287] // OOOOOOO
// ['constitution', 2280] // ooooooo
// ['wisdom', 2248] // ooooooo
// ['creaturelevel', 2199]
// ['dexterity', 2193] // ooooo
// ['strength', 2125] // oooooo
// ['charisma', 1809] // ooooo
// ['athletics', 1622]
// ['stealth', 1426] // OOOOOO
// ['intelligence', 1406] // ooooo
// ['acrobatics', 1283] // OOOOO
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
