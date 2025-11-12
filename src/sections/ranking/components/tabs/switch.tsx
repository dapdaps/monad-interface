import clsx from "clsx";

const TabsSwitch = (props: any) => {
  const { tabs, currentTab, setCurrentTab } = props;

  return (
    <div className="w-full h-[50px] border-t border-b border-[#836EF9] grid grid-cols-2 gap-x-[15px]">
      {
        tabs.map((tab: any) => (
          <button
            type="button"
            key={tab.value}
            className={clsx(
              "relative group w-full h-full flex items-center justify-center uppercase font-Oxanium font-[400] leading-[100%] text-[18px] bg-center hover:text-white duration-150 py-[6px]",
              currentTab === tab.value ? "text-white" : "text-[rgba(255,255,255,0.5)]"
            )}
            onClick={() => setCurrentTab(tab.value)}
          >
            <div
              className={clsx(
                "absolute z-[1] w-full h-full left-0 top-0 pointer-events-none group-hover:opacity-100 duration-150 bg-[radial-gradient(50%_66%_at_47.77%_50%,_#553BE4_0%,_#221662_100%)]",
                currentTab === tab.value ? "opacity-100" : "opacity-0"
              )}
            />
            <div
              className={clsx(
                "relative z-[2] w-full h-full flex items-center justify-center group-hover:bg-[unset] duration-150",
                currentTab === tab.value ? "bg-[unset]" : "bg-[rgba(131,110,249,0.25)]"
              )}
            >
              {tab.title}
            </div>
          </button>
        ))
      }
    </div>
  )
}

export default TabsSwitch;
