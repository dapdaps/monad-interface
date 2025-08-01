import Starfield from "@/sections/home/Starfield";

const data = [
  {
    layer: 1,
    items: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
    ],
  },
  {
    layer: 2,
    items: [
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
    ],
  },
  {
    layer: 3,
    items: [
      { id: 13 },
      { id: 14 },
      { id: 15 },
    ],
  },
  {
    layer: 4,
    items: [
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
    ],
  },
  {
    layer: 5,
    items: [
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
    ],
  },
  {
    layer: 6,
    items: [
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
    ],
  },
  {
    layer: 7,
    items: [
      { id: 34 },
      { id: 35 },
    ],
  },
];

const SpaceInvadersView = () => {
  return (
    <div className="w-full h-screen bg-[#010101] relative">
      <Starfield className="!absolute !z-[0]" bgColor="#010101" />
      <div className="relative w-full h-full z-[1]">
        <div className="w-[1177px] mx-auto flex justify-center items-end">
          <div className="w-[195px] shrink-0 flex flex-col">
            
          </div>
          <div className="w-0 flex-1"></div>
          <div className="w-[105px] shrink-0 flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default SpaceInvadersView;
