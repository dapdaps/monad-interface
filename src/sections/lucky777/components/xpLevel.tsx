import Modal from "@/components/modal";
import { IconClose } from "./rules";

export default function XpLevel({ open, onClose, level }: { open: boolean, onClose: () => void, level: number }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            className=""
            closeIcon={<IconClose />}
            innerClassName="font-Montserrat"
        >
            <div className="relative p-[30px] pt-0">
                <img src="/images/lucky777/modal-bg.png" alt="LUCKY 777" className="absolute z-1 top-0 left-0 w-full h-full" />
                <div className="flex flex-col items-center w-[475px] pb-[30px] px-[20px] max-w-full z-10 relative text-[12px]">
                    <div className="text-center mt-[-16px]">
                        <img src="/images/lucky777/xp/level-title.svg" alt="LUCKY 777" className="w-[183px] mx-auto" />
                    </div>


                    <div className="h-[500px] overflow-auto text-[14px] font-[Montserrat] leading-[120%]">
                        <div className="w-full mt-[20px] text-white">
                            <div className="mb-[20px] text-[14px] leading-[20px]">
                                For plays where users don’t win WLs or MON, their icons on the machine will be used to fill up the XP tank. Multipliers applied to XP won.
                            </div>
                            <div className="flex flex-col gap-[14px] text-[14px] leading-[20px] text-white">
                                <div className="flex items-center gap-[12px]">
                                    <span className="inline-block px-[12px] py-[2px] font-[900] bg-[url('/images/lucky777/xp/xp-bg.png')] bg-no-repeat bg-center bg-contain">1 XP</span>
                                    <span className="italic">Molandak / Moyaki / Chog</span>
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <span className="inline-block px-[12px] py-[2px] font-[900] bg-[url('/images/lucky777/xp/xp-bg.png')] bg-no-repeat bg-center bg-contain">2 XP</span>
                                    <span className="italic">NFT project logo / NFT Global Prize icon / Monad</span>
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <span className="inline-block px-[12px] py-[2px] font-[900] bg-[url('/images/lucky777/xp/xp-bg.png')] bg-no-repeat bg-center bg-contain">5 XP</span>
                                    <span className="italic">NADSA logo</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-[30px] text-white">
                            <div className="text-[18px] leading-[20px] font-HackerNoonV2">Level system:</div>

                            <div className="mt-[20px] w-[320px] mx-auto relative">
                                {
                                    Array.from({ length: 8 }).map((_, index) => (
                                        <div key={index} className="flex relative items-center justify-between pl-[50px] pr-[10px]  gap-[12px] h-[62px] w-[320px] bg-[#31305A] rounded-[10px] border-1 border-[#26274B] mb-[10px]">
                                            <div className="w-[199px] h-[30px] flex items-center justify-end pr-[50px] italic font-[900] bg-[url('/images/lucky777/xp/level-xp-bg.png')] bg-no-repeat bg-center bg-contain absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[14px] ml-[-10px]">
                                                {50 * (index + 1)} xp</div>
                                            <img src={`/images/lucky777/xp/level-${index + 1}.png`} alt="level" className="h-[50px] relative z-10" />
                                            <img src={`/images/lucky777/xp/prize-${index + 1}.png`} alt="level" className="h-[50px] relative z-10" />
                                            <div className="w-[32px] h-[32px] bg-[#55538D] rounded-full absolute left-[10px] top-1/2 -translate-y-1/2"></div>
                                        </div>
                                    ))
                                }

                                <div className="absolute w-[12px] h-[504px] bg-[#55538D] left-[20px] top-[31px]"></div>
                                {
                                    Array.from({ length: 7 }).map((_, index) => (
                                        index <= level - 2 && (
                                            <div key={index} className="absolute w-[6px] h-[62px] border-2 border-[#2F3163] bg-[#BFFF60] rounded-full left-[23px]" style={{ top: `${index * 72 + 32}px` }}></div>
                                        )

                                    ))
                                }

                                {
                                    Array.from({ length: 8 }).map((_, index) => (
                                        index <= level - 1 && (
                                            <div key={index} className="absolute w-[22px] h-[22px] border-2 border-[#2F3163] bg-[#BFFF60] rounded-full left-[15px]" style={{ top: `${index * 72 + 20}px` }}></div>
                                        )))
                                }
                            </div>
                        </div>

                        <div className="w-full mt-[12px] text-white pl-[60px]">
                            <div className="font-[900] leading-[90%]">
                                Next Level
                            </div>
                            <ul className="list-disc mt-[6px] pl-[12px]">
                                <li>
                                    Odd numbers: 500 XP - get 1 MON
                                </li>
                                <li>
                                    Even numbers: 500 XP - get 10 free spins
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}