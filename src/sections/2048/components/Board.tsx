import FunPurpleButton from "./FunPurpleButton";

type Tile = {
    id: string;
    value: number;
    row: number;
    col: number;
    mergedFrom?: string[];
    isNew?: boolean;
};

type BoardProps = {
    containerRef: any;
    score: number;
    tiles: Tile[];
    gameOver: boolean;
    gameError: boolean;
    gameErrorText: string;
    resyncGame: any;
    initializeGame: () => void;
};

export default function Board({
    containerRef,
    tiles,
    score,
    gameOver,
    gameError,
    gameErrorText,
    resyncGame,
    initializeGame,
}: BoardProps) {
    // Calculate the position of a tile
    const getTilePosition = (row: number, col: number) => {
        return {
            top: `calc(${row * 25}% + 0.5rem)`,
            left: `calc(${col * 25}% + 0.5rem)`,
            width: "calc(25% - 1rem)",
            height: "calc(25% - 1rem)",
        };
    };

    // Get the background color for a tile based on its value
    const getTileColor = (value: number) => {
        switch (value) {
            case 2:
                return "bg-[#836EF9] text-white";
            case 4:
                return "bg-[#D26EF9] text-white";
            case 8:
                return "bg-[#FFBF49] text-white";
            case 16:
                return "bg-[#FF8949] text-white";
            case 32:
                return "bg-[#FF8282] text-white";
            case 64:
                return "bg-[#F3659E] text-white";
            case 128:
                return "bg-[#9827E3] text-white";
            case 256:
                return "bg-[#641DD5] text-white";
            case 512:
                return "bg-[#3460FF] text-white";
            case 1024:
                return "bg-[#00ACB8] text-white";
            case 2048:
                return "bg-[#7EE203] text-white";
            case 4096:
                return "bg-[#0020F3] text-white";
            case 8192:
                return "bg-[#CD9152] text-white";
            default:
                return "bg-[#D26EF9] text-white";
        }
    };

    // Get the font size for a tile based on its value
    const getTileFontSize = (value: number) => {
        if (value < 100) return "text-3xl";
        if (value < 1000) return "text-2xl";
        return "text-xl";
    };

    return (
        <>
            <div
                ref={containerRef}
                className="relative bg-black rounded-[10px] p-[10px] w-full max-w-md aspect-square"
            >
                {/* Grid background */}
                <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full w-full">
                    {Array(16)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={`cell-${index}`}
                                className="bg-[#836EF930] rounded-[10px]"
                            />
                        ))}
                </div>

                {/* Tiles */}
                {tiles.map((tile: Tile) => (
                    <div
                        key={tile.id}
                        className={`absolute font-Montserrat text-[32px] font-bold-[600] rounded-[10px] flex items-center justify-center ${getTileColor(
                            tile.value
                        )}`}
                        style={{
                            ...getTilePosition(tile.row, tile.col),
                            zIndex: 10,
                            transition: "all 150ms ease-in-out",
                            transform: tile.mergedFrom
                                ? "scale(1.1)"
                                : tile.isNew
                                    ? "scale(0.5)"
                                    : "scale(1)",
                            animation: tile.mergedFrom
                                ? "merge 200ms ease-in-out"
                                : tile.isNew
                                    ? "appear 200ms ease-in-out forwards"
                                    : "none",
                        }}
                    >
                        <span
                            className={`font-bold ${getTileFontSize(
                                tile.value
                            )}`}
                        >
                            {tile.value}
                        </span>
                    </div>
                ))}

                {/* Game over overlay */}
                {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg z-20">
                        <div className="p-6 bg-white rounded-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">
                                Game Over!
                            </h2>
                            <p className="mb-4">Your score: {score}</p>
                            <FunPurpleButton
                                text="Play Again"
                                onClick={initializeGame}
                            />
                        </div>
                    </div>
                )}

                {/* Game error overlay */}
                {/* {gameError && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg z-20">
                        <div className="p-6 bg-white rounded-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">
                                Oops! Game Error
                            </h2>
                            
                            <p className="mb-4">Your score: {score}</p>
                            <FunPurpleButton
                                text="Re-sync game"
                                onClick={resyncGame}
                            />
                        </div>
                    </div>
                )} */}
            </div>

            <style>{`
        @keyframes appear {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes merge {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        `}</style>
        </>
    );
}
