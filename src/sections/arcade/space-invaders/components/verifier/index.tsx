import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";

const Verifier = (props: any) => {
  const { className } = props;

  const {
    verifierData,
    onVerifierClose,
  } = useSpaceInvadersContext();

  return (
    <div className="font-[Montserrat] text-[14px] font-[600] text-white leading-[150%] px-[26px]">
      <div className="font-[DelaGothicOne] text-[20px] font-[400] leading-[100%]">
        Space Invaders Hash Verifier
      </div>
      <TitleCard title="Row Tile Counts" className="!mt-[29px]">
        {
          verifierData?.map((layer: any) => layer.items.length)?.join(",")
        }
      </TitleCard>
      <TitleCard title="Seed">
        0x018f43dfacd0e4b859ffc2b1708fd4d59ef96555f95ddb98fb6bdb7b3a6ac6f9
      </TitleCard>
      <TitleCard title="Hash">
        0x6489ff9d32a90c717a19cef3ee2608df6fe802aa7026a3d2030bd549dc6e430d
      </TitleCard>
      <div className="mt-[12px] flex flex-col gap-[10px] items-stretch pl-[10px]">
        {
          verifierData?.map((layer: any, layerIndex: number) => (
            <div key={layerIndex} className="flex items-center justify-between gap-[20px]">
              <div className="flex-0 w-[30px] flex items-center">
                {layer.layer}
              </div>
              <div className="flex-1 flex items-center justify-center gap-[12px]">
                {
                  layer.items.map((item: any, itemIndex: number) => (
                    <div
                      key={`${layerIndex}-${itemIndex}`}
                      className={clsx(
                        "flex-0 w-[36px] h-[36px] rounded-[6px]",
                        item.isGhost ? "bg-[#F13636]" : "bg-black/30"
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
