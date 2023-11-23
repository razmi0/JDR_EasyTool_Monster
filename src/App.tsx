import { Fragment, useEffect, useState, useRef } from "react";
import creatures from "@Data";
import { cleanData, getAllRandomColors, getElementsAroundIndex, debounce } from "@Helpers";
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

console.log("START");

const LIMITER = 50;
const boolArr = new Array(LIMITER).fill(false);

const App = () => {
  console.time("App");
  const [scroll, setScroll] = useState(0);

  const [search, setSearch] = useState("");
  const [data] = useState(cleanData(creatures.data.slice(0, LIMITER)));
  const [colors] = useState(getAllRandomColors(LIMITER));
  const [openRadar, setOpenRadar] = useState(boolArr);
  const [openStats, setOpenStats] = useState(boolArr);
  const listRef = useRef<HTMLLIElement | null>(null);

  const handleOpenRadar = (i: number) => {
    setOpenRadar((prev) => {
      const newArr = [...prev];
      newArr[i] = !newArr[i];
      return newArr;
    });
  };

  const handleOpenStats = (i: number) => {
    setOpenStats((prev) => {
      const newArr = [...prev];
      newArr[i] = !newArr[i];
      return newArr;
    });
  };

  const debouncedSearch = debounce(setSearch, 100);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.currentTarget.value);
  };

  const finalData = data.finalData.filter((creature) =>
    creature.name.toLowerCase().includes(search)
  );

  const handleScroll = debounce(() => {
    setScroll(window.scrollY);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const viewIndex = Math.floor((scroll * 1.15) / window.innerHeight);
  const finalInViewElement = getElementsAroundIndex(finalData, viewIndex, 10);
  console.log(listRef.current);

  console.timeEnd("App");

  return (
    <>
      <SearchInput handleSearch={handleSearch} search={search} />
      <ul>
        {/* LOOP */}
        {finalInViewElement.map((creature, i) => {
          const newData = Object.entries(creature);
          const name = newData[0][1]; // value
          const rest = newData.slice(1);
          return (
            <ListElement key={i}>
              <span ref={listRef} id="ref" />
              <NameButtons
                name={name}
                color={colors[i]}
                handleOpenRadar={() => handleOpenRadar(i)}
                handleOpenStats={() => handleOpenStats(i)}
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
                        open={openStats[i]}
                        color={colors[i]}
                      />
                    );
                  })}
                </StatsContainer>
                <ChartContainer isOpen={openRadar[i]}>
                  <RadarChart data={data.finalChart[i] as ChartData<"radar">} color={colors[i]} />
                </ChartContainer>
              </StatsAndChart>
            </ListElement>
          );
        })}
      </ul>
      {/* <BouncingBalls /> */}
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
