import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { useEffect } from "react";

const Verifier = (props: any) => {
  const { className } = props;

  const {
    verifierData,
    onVerifierClose,
    currentGameData,
    getChainGameId,
    getChainGameDetails,
  } = useSpaceInvadersContext();

  useEffect(() => {
    if (!currentGameData?.game_id) {
      return;
    }
    getChainGameId?.(currentGameData.game_id).then((res) => {
      getChainGameDetails?.(res.chainGameId).then((res) => {
        console.log("res: %o", res);
      });
    });
  }, [currentGameData]);

  return (
    <div className="font-[Montserrat] text-[14px] font-[600] text-white leading-[150%] px-[26px]">
      <div className="font-[DelaGothicOne] text-[20px] font-[400] leading-[100%]">
        Space Invaders Hash Verifier
      </div>
      <TitleCard title="Row Tile Counts" className="!mt-[29px]">
        {
          verifierData?.rows?.map((layer) => layer.tiles)?.join(",")
        }
      </TitleCard>
      <TitleCard title="Seed">
        {verifierData?.seed}
      </TitleCard>
      <TitleCard title="Hash">
        {verifierData?.seed_hash}
      </TitleCard>
      <div className="mt-[12px] flex flex-col gap-[10px] items-stretch pl-[10px]">
        {
          verifierData?.rows?.map((layer, layerIndex) => (
            <div key={layerIndex} className="flex items-center justify-between gap-[20px]">
              <div className="flex-0 w-[30px] flex items-center">
                {(verifierData?.rows?.length || 0) - (layerIndex + 1)}
              </div>
              <div className="flex-1 flex items-center justify-center gap-[12px]">
                {
                  [...new Array(layer.tiles).fill(0)].map((_, itemIndex) => (
                    <div
                      key={`${layerIndex}-${itemIndex}`}
                      className={clsx(
                        "flex-0 w-[36px] h-[36px] rounded-[6px]",
                        layer.deathTileIndex === itemIndex ? "bg-[#F13636]" : "bg-black/30"
                      )}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Verifier;

const TitleCard = (props: any) => {
  const { className, title, children } = props;

  return (
    <div className={clsx("mt-[20px]", className)}>
      <div className="">{title}</div>
      <div className="p-[11px_12px_9px_15px] bg-black/30 rounded-[6px] break-all mt-[8px]">
        {children}
      </div>
    </div>
  );
};
