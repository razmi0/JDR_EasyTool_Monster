export const IFrame = ({ name }: { name: string }) => {
  return (
    <div style={{ minHeight: "300px", height: "300px" }}>
      <iframe
        src={`https://2e.aonprd.com/Creatures.aspx?q=${name.toLowerCase()}&sort=name-asc&display=table&columns=creature_family+source+rarity+size+alignment+trait+level+hp+ac+fortitude+reflex+will+perception+sense+speed`}
        title={name}
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
};
