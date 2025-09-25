import Card from "../components/card";
import Mouse from "../components/mouse";

const TrendingTokens = (props: any) => {
  const { } = props;

  return (
    <>
      <div className="flex flex-col items-center mt-[clamp(calc(var(--pc-1512)*-0.03),_-3vw,_1px)]">
        <div className="text-[18px] text-white font-[400] uppercase">
          Spotlight apps
        </div>
        <img
          src="/images/mainnet/discover/icon-down.svg"
          alt=""
          className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[16px] rotate-[180deg]"
        />
      </div>
      <Card
        title="Trending tokens"
        className="mx-auto"
        contentClassName="h-[clamp(1px,_17.26vw,_calc(var(--pc-1512)*0.1726))] flex justify-center"
        backdropClassName="!block [clip-path:polygon(0.9%_15%,99%_15%,99%_92.8%,96.7%_97.8%,78%_93.5%,76.5%_89.2%,70%_88.5%,60%_88%,50%_87.6%,35%_88%,23.4%_88.5%,21%_93%,2.7%_96.4%,2.7%_82%,0.9%_74.9%)]"
        onExploreAll={() => { }}
      >
        <div className="absolute top-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] w-full flex justify-center gap-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))]">

        </div>
      </Card>
      <div className="flex flex-col items-center translate-y-[clamp(calc(var(--pc-1512)*-0.0397),_-3.97vw,_1px)]">
        <Mouse />
        <img
          src="/images/mainnet/discover/icon-down.svg"
          alt=""
          className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[20px]"
        />
        <div className="mt-[16px] text-[18px] text-white font-[400] uppercase">
          EXPLORE ALL APPS
        </div>
      </div>
    </>
  );
};

export default TrendingTokens;
