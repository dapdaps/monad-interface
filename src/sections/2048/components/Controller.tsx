import { Direction } from "../App";
export default function Controller({ handleMove }: { handleMove: (direction: Direction) => void }) {
    return (
        <div className=" w-[147px] h-[147px] relative">
            <img src="/images/2048/direction.svg" className="w-full h-full absolute top-0 left-0" />
            <div className="relative z-10 w-full h-full">
                <div className="w-[50px] h-[50px]  absolute left-[50%] -translate-x-1/2 top-0 rounded-[10px] cursor-pointer" onClick={() => handleMove(Direction.UP)}></div>
                <div className="w-[50px] h-[50px]  absolute left-[50%] -translate-x-1/2 bottom-0 rounded-[10px] cursor-pointer" onClick={() => handleMove(Direction.DOWN)}></div>
                <div className="w-[50px] h-[50px]  absolute top-[50%] -translate-y-1/2 left-0 rounded-[10px] cursor-pointer" onClick={() => handleMove(Direction.LEFT)}></div>
                <div className="w-[50px] h-[50px]  absolute top-[50%] -translate-y-1/2 right-0 rounded-[10px] cursor-pointer" onClick={() => handleMove(Direction.RIGHT)}></div>
            </div>
        </div>
    )
}