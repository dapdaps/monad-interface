import clsx from "clsx";
import dayjs from "dayjs";
import React, { useMemo } from "react";

const Calendar = (props: any) => {
  const { className } = props;

  const augustWeekDates = useMemo(() => {
    const weeks: Array<Array<typeof augustDates[0]>> = [];

    augustDates.forEach((date, index) => {
      if (index === 0) {
        weeks[0] = [date];

        if (date.day.day === EWeek.Sun) {
          weeks[weeks.length] = [];
        }
        return;
      }

      weeks[weeks.length - 1].push(date);

      if (date.day.day === EWeek.Sun) {
        weeks[weeks.length] = [];
      }
    });

    return weeks;
  }, [augustDates]);

  return (
    <div className={clsx("relative w-full font-[Montserrat] text-[14px] text-white font-[700] leading-[120%]", className)}>
      <img
        src="/images/game/calendar/all-in-title.png"
        alt=""
        className="absolute left-1/2 -translate-x-1/2 top-[-70px] z-[1] shrink-0 object-center object-contain w-[220px] h-[99px]"
      />
      <div className="text-[16px] font-[500] text-center px-[40px] pt-[30px]">
        The last chance to position yourself before Monad mainnet. It’s time to ALL IN.<br />
        Grind in Lucky777 and Space Invaders to secured WL spots of your favourite collections.
      </div>
      <div className="px-[17px]">
        <div className="bg-black/50 rounded-[12px] mt-[27px] relative pt-[23px]">
          <div className="text-[#BFFF60] text-[20px] rotate-[-24deg] absolute left-[0px] top-[10px]">
            August
          </div>
          <div className="grid grid-cols-7 gap-[6px] pl-[32px] pr-[19px]">
            {
              Object.values(Weeks).sort((a, b) => a.sort - b.sort).map((week) => (
                <div key={week.day} className="flex justify-center items-center uppercase rounded-[4px] bg-[rgba(61,64,90,0.63)] h-[32px] flex-shrink-0 text-[#979ABE] text-[16px] font-medium">
                  {week.label}
                </div>
              ))
            }
          </div>
          <div className="text-white text-[16px] mt-[8px]">
            {
              augustWeekDates.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className={clsx(
                    "grid grid-cols-7 gap-[6px] pl-[49px] pr-[36px]",
                    weekIndex > 0 ? "pt-[30px]" : "pt-[20px]"
                  )}
                >
                  {
                    [...new Array(7 - week.length).fill(0)].map((_, dateIndex) => (
                      <div
                        key={`${weekIndex}-${dateIndex}`}
                        className=""
                      >
                      </div>
                    ))
                  }
                  {
                    week.map((date) => {
                      const activity = activities.find((activity) => activity.timestamp === date.timestamp);
                      const isActivity = !!activity;

                      return (
                        <div
                          key={date.timestamp}
                          className={clsx(
                            "flex justify-center items-center pb-[124px] relative",
                            isActivity ? "text-[32px]" : "text-[16px]"
                          )}
                        >
                          <div className="">{date.date}</div>
                          {
                            isActivity && (
                              <>
                                <img
                                  src="/images/game/calendar/all-in-circle.png"
                                  alt=""
                                  className="absolute z-[1] top-[-20px] left-[10px] w-[70px] h-[55px] object-center object-contain"
                                />
                                {activity.content}
                              </>
                            )
                          }
                          {
                            date.timestamp === dayjs("2025-08-30").startOf("day").valueOf() && (
                              <ActivityCard className="ml-[-28px] w-[351px] !font-[700] !h-[45px] !bottom-[unset] top-[30px] items-center flex justify-center !text-[#A6A6DB]">
                                TBD...
                              </ActivityCard>
                            )
                          }
                        </div>
                      );
                    })
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

const enum EWeek {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 0,
}

interface IWeek {
  day: EWeek;
  label: string;
  sort: number;
}

const Weeks: Record<EWeek, IWeek> = {
  [EWeek.Mon]: {
    day: EWeek.Mon,
    label: "Mon",
    sort: 1,
  },
  [EWeek.Tue]: {
    day: EWeek.Tue,
    label: "Tue",
    sort: 2,
  },
  [EWeek.Wed]: {
    day: EWeek.Wed,
    label: "Wed",
    sort: 3,
  },
  [EWeek.Thu]: {
    day: EWeek.Thu,
    label: "Thu",
    sort: 4,
  },
  [EWeek.Fri]: {
    day: EWeek.Fri,
    label: "Fri",
    sort: 5,
  },
  [EWeek.Sat]: {
    day: EWeek.Sat,
    label: "Sat",
    sort: 6,
  },
  [EWeek.Sun]: {
    day: EWeek.Sun,
    label: "Sun",
    sort: 7,
  },
};

// Date array for August
const startDate = dayjs("2025-08-11");
const endDate = dayjs("2025-08-31");
const generateAugustDates = () => {
  const dates = [];

  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    const dayOfWeek = currentDate.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const weekIndex = dayOfWeek;

    dates.push({
      date: currentDate.format("DD"),
      day: Weeks[weekIndex as EWeek],
      timestamp: currentDate.startOf("day").valueOf()
    });

    currentDate = currentDate.add(1, "day");
  }

  return dates;
};

const augustDates = generateAugustDates();

interface IActivity {
  timestamp: number;
  content: any;
}

const ActivityCard = (props: any) => {
  const { className, children } = props;

  return (
    <div className={clsx(
      "absolute bottom-0 h-[112px] flex-shrink-0 rounded-[10px] border border-dashed border-[#836EF9] bg-[rgba(0,0,0,0.19)] text-white font-[Montserrat] text-[14px] font-[400] leading-[119%] tracking-[-0.28px]",
      className
    )}>
      {children}
    </div>
  );
};

const activities: IActivity[] = [
  {
    timestamp: dayjs("2025-08-13").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[-10px]">
        <img
          src="/images/game/calendar/nft-la-mouch3.png"
          alt=""
          className="w-[97px] h-[95px] object-center object-contain translate-x-[30px] translate-y-[-20px]"
        />
        <img
          src="/images/game/calendar/nft-overnads3.png"
          alt=""
          className="w-[137px] h-[137px] object-center object-contain translate-x-[0px] translate-y-[-10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-15").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[18px]">
        <img
          src="/images/game/calendar/nft-deadnads3.png"
          alt=""
          className="w-[108px] h-[110px] object-center object-contain translate-x-[40px] translate-y-[5px]"
        />
        <img
          src="/images/game/calendar/nft-blocknads3.png"
          alt=""
          className="w-[161px] h-[161px] object-center object-contain translate-x-[-10px] translate-y-[-60px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-18").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[164px] flex justify-center ml-[0px]">
        <img
          src="/images/game/calendar/nft-coronad3.png"
          alt=""
          className="w-[101px] h-[108px] object-center object-contain translate-x-[0px] translate-y-[-10px]"
        />
        <img
          src="/images/game/calendar/nft-dripster3.png"
          alt=""
          className="w-[99px] h-[101px] object-center object-contain translate-x-[-20px] translate-y-[15px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-20").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[-10px]">
        <img
          src="/images/game/calendar/nft-monshape3.png"
          alt=""
          className="w-[95px] h-[94px] object-center object-contain translate-x-[0px] translate-y-[-10px]"
        />
        <img
          src="/images/game/calendar/nft-chogstar3.png"
          alt=""
          className="w-[107px] h-[101px] object-center object-contain translate-x-[0px] translate-y-[5px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-22").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[18px]">
        <img
          src="/images/game/calendar/nft-llamao3.png"
          alt=""
          className="w-[120px] h-[124px] object-center object-contain translate-x-[0px] translate-y-[-10px]"
        />
        <img
          src="/images/game/calendar/nft-molandaks3.png"
          alt=""
          className="w-[103px] h-[87px] object-center object-contain translate-x-[-10px] translate-y-[35px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-25").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[164px] flex justify-center ml-[0px]">
        <img
          src="/images/game/calendar/nft-chog3.png"
          alt=""
          className="w-[105px] h-[99px] object-center object-contain translate-x-[-5px] translate-y-[-15px]"
        />
         <img
          src="/images/game/calendar/nft-skrumpeys4.png"
          alt=""
          className="w-[97px] h-[81px] object-center object-contain translate-x-[-10px] translate-y-[30px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-27").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[-10px]">
        <img
          src="/images/game/calendar/nft-moana3.png"
          alt=""
          className="w-[143px] h-[143px] object-center object-contain translate-x-[0px] translate-y-[-45px]"
        />
        <img
          src="/images/game/calendar/nft-realnads3.png"
          alt=""
          className="w-[86px] h-[80px] object-center object-contain translate-x-[-15px] translate-y-[25px]"
        />
      </ActivityCard>
    )
  },
];
