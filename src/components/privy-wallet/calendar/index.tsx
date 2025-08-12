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
      <div className="pt-[10px] pl-[20px]">
        <div className="text-[#BFFF60] text-[20px] rotate-[-24deg] inline-block">
          August
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[6px] pl-[49px] pr-[36px] pt-[20px]">
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
                        date.timestamp === dayjs("2025-08-30").utc().startOf("day").valueOf() && (
                          <ActivityCard className="ml-[-44px] w-[351px] !font-[700] !h-[45px] !bottom-[unset] top-[30px] items-center flex justify-center !text-[#A6A6DB]">
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
      timestamp: currentDate.utc().startOf("day").valueOf()
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
    timestamp: dayjs("2025-08-13").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center">
        <img
          src="/images/game/calendar/nft-la-mouch2.png"
          alt=""
          className="w-[97px] h-[95px] object-center object-contain mt-[-20px] ml-[10px]"
        />
        <img
          src="/images/game/calendar/nft-overnads2.png"
          alt=""
          className="w-[99px] h-[96px] object-center object-contain mt-[10px] ml-[-20px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-15").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[8px]">
        <img
          src="/images/game/calendar/nft-deadnads2.png"
          alt=""
          className="w-[108px] h-[108px] object-center object-contain ml-[20px] mt-[5px]"
        />
        <img
          src="/images/game/calendar/nft-blocknads2.png"
          alt=""
          className="w-[107px] h-[107px] object-center object-contain ml-[-30px] mt-[-35px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-18").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[177px] flex justify-center ml-[18px]">
        <img
          src="/images/game/calendar/nft-coronad2.png"
          alt=""
          className="w-[97px] h-[104px] object-center object-contain mt-[-10px]"
        />
        <img
          src="/images/game/calendar/nft-dripster2.png"
          alt=""
          className="w-[87px] h-[97px] object-center object-contain mt-[15px] ml-[-5px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-20").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center">
        <img
          src="/images/game/calendar/nft-monshape2.png"
          alt=""
          className="w-[92px] h-[93px] object-center object-contain mt-[-15px] ml-[10px]"
        />
        <img
          src="/images/game/calendar/nft-chogstar2.png"
          alt=""
          className="w-[97px] h-[97px] object-center object-contain mt-[10px] ml-[10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-22").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center ml-[8px]">
        <img
          src="/images/game/calendar/nft-llamao2.png"
          alt=""
          className="w-[76px] h-[91px] object-center object-contain mt-[5px] ml-[10px]"
        />
        <img
          src="/images/game/calendar/nft-molandaks2.png"
          alt=""
          className="w-[92px] h-[78px] object-center object-contain mt-[35px] ml-[10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-25").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[177px] flex justify-center ml-[18px]">
        <img
          src="/images/game/calendar/nft-chog2.png"
          alt=""
          className="w-[84px] h-[68px] object-center object-contain mt-[20px] ml-[-10px]"
        />
      </ActivityCard>
    )
  },
  {
    timestamp: dayjs("2025-08-27").utc().startOf("day").valueOf(),
    content: (
      <ActivityCard className="w-[202px] flex justify-center">
        <img
          src="/images/game/calendar/nft-moana2.png"
          alt=""
          className="w-[111px] h-[111px] object-center object-contain mt-[-25px] ml-[0px]"
        />
        <img
          src="/images/game/calendar/nft-realnads2.png"
          alt=""
          className="w-[79px] h-[79px] object-center object-contain mt-[30px] ml-[-10px]"
        />
      </ActivityCard>
    )
  },
];
