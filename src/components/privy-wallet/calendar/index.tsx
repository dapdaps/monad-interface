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
            September
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
                            date.timestamp === dayjs("2025-09-19").startOf("day").valueOf() && (
                              <ActivityCard className="ml-[210px] w-[100px] !border-[0] !font-[700] !h-[45px] !bottom-[unset] top-[30px] items-center flex justify-center !text-[#A6A6DB]">
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
const startDate = dayjs("2025-09-01");
const endDate = dayjs("2025-09-21");
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
    timestamp: dayjs("2025-09-01").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[30px]">
        <img
          src="/images/game/calendar/nft-spiky-nads.png"
          alt=""
          className="w-[102px] h-[120px] object-center object-contain translate-x-[30px] translate-y-[-20px]"
        />
        <img
          src="/images/game/calendar/nft-mop.png"
          alt=""
          className="w-[134px] h-[143px] object-center object-contain translate-x-[0px] translate-y-[-10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-09-04").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[118px] flex justify-center ml-[0px]">
        <img
          src="/images/game/calendar/nft-mondies.png"
          alt=""
          className="w-[80px] h-[92px] object-center object-contain translate-x-[0px] translate-y-[10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-09-08").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[30px]">
        <img
          src="/images/game/calendar/nft-nns-startlist.png"
          alt=""
          className="w-[101px] h-[98px] object-center object-contain translate-x-[0px] translate-y-[10px]"
        />
        <img
          src="/images/game/calendar/nft-baldnads.png"
          alt=""
          className="w-[95px] h-[104px] object-center object-contain translate-x-[0px] translate-y-[15px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-09-11").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[118px] flex justify-center ml-[0px]">
        <img
          src="/images/game/calendar/nft-owls-monad.png"
          alt=""
          className="w-[133px] h-[113px] object-center object-contain translate-x-[0px] translate-y-[0px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-09-15").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[164px] flex justify-center ml-[-10px]">
        <img
          src="/images/game/calendar/nft-octonads.png"
          alt=""
          className="w-[98px] h-[94px] object-center object-contain translate-x-[0px] translate-y-[10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-09-18").startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[267px] flex justify-center ml-[0px]">
        <img
          src="/images/game/calendar/nft-the10k.png"
          alt=""
          className="w-[102px] h-[92px] object-center object-contain translate-x-[-5px] translate-y-[15px]"
        />
        <img
          src="/images/game/calendar/nft-monzilla.png"
          alt=""
          className="w-[78px] h-[87px] object-center object-contain translate-x-[-5px] translate-y-[15px]"
        />
        <img
          src="/images/game/calendar/nft-bober.png"
          alt=""
          className="w-[87px] h-[91px] object-center object-contain translate-x-[-5px] translate-y-[15px]"
        />
      </ActivityCard>
    )
  },
];
