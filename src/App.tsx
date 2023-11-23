import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import creatures from "@Data";
import {
  cleanData,
  getAllRandomColors,
  debounce,
  resize,
  filterCreaturesBySearch,
  getInViewElements,
} from "@Helpers";
import { ChartData } from "chart.js";
import {
  RadarChart,
  ListElement,
  NameButtons,
  StatsAndChart,
  ChartContainer,
  StatsContainer,
  Anchor,
  Stats,
  SearchInput,
} from "@Components";
import { useMap } from "@Hooks";

console.log("START");

const LIMITER = creatures.data.length; // LIMITER NEVER CHANGES => 3285 creatures

const App = () => {
  console.time("App");

  // STATES
  //--

  const [scroll, setScroll] = useState(0);
  const [search, setSearch] = useState("");

  const data = useMemo(() => cleanData(creatures.data.slice(0, LIMITER)), []);
  const colors = useMemo(() => getAllRandomColors(LIMITER), []);

  const listRef = useRef<HTMLLIElement[] | null>(null);
  const { map, toggle } = useMap(["openRadar", "openStats"], [LIMITER, LIMITER]);

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

  // FILTERING BY SEARCH
  const finalData = filterCreaturesBySearch(data, search, "name");
  // DEBOUNCING SEARCH
  const debouncedSearch = debounce(setSearch, 100);
  // UPDATING VIEW
  const inViewCreatures = getInViewElements(finalData, scroll);
  // UPDATING REFS IF NEEDED
  listRef.current = resize(listRef.current ?? [], inViewCreatures.length);

  console.timeEnd("App");

  return (
    <>
      <SearchInput handleSearch={handleSearch} search={search} />
      <ul>
        {/* LOOP */}
        {inViewCreatures.map((creature, i) => {
          const newData = Object.entries(creature);
          const name = newData[0][1]; // value
          const rest = newData.slice(1);
          return (
            <ListElement key={name}>
              <span ref={handleRefs(i)} id="ref" />
              <NameButtons
                name={name}
                color={colors[i]}
                handleOpenRadar={() => toggle(i, "openRadar")}
                handleOpenStats={() => toggle(i, "openStats")}
              >
                <>Reveal stats</>
                <>Reveal radar</>
              </NameButtons>
              <StatsAndChart>
                <StatsContainer>
                  {rest.map(([label, value]) => {
                    return value === "" || data.finalChart[i].labels.includes(label) ? (
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
                <ChartContainer isOpen={map.openRadar[i]}>
                  <RadarChart data={data.finalChart[i] as ChartData<"radar">} color={colors[i]} />
                </ChartContainer>
              </StatsAndChart>
            </ListElement>
          );
        })}
      </ul>
      <Anchor />
    </>
  );
};

export default App;

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
