import clsx from "clsx";
import { useState, useEffect, useRef, RefObject } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import dayjs from "dayjs";
import Popover, { PopoverPlacement } from "@/components/popover";

export type DatePickerMode = "date" | "week" | "month" | "all";

export interface DatePickerProps {
  selected?: Date | DateRange | undefined;
  onSelect?: (selected: Date | DateRange | undefined) => void;
  mode?: DatePickerMode;
  defaultMode?: DatePickerMode;
  onModeChange?: (mode: DatePickerMode) => void;
  onClose?: () => void;
  popoverRef?: RefObject<{ onClose: () => void }>;
}

// Get the start and end dates of the week containing the given date (Monday to Sunday)
const getWeekRange = (date: Date): DateRange => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to start from Monday
  const startOfWeek = new Date(date);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return { from: startOfWeek, to: endOfWeek };
};

// Month names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DatePicker = ({ selected, onSelect, mode, defaultMode = "all", onModeChange, onClose, popoverRef }: DatePickerProps) => {
  const [datePickerMode, setDatePickerMode] = useState<DatePickerMode>(mode || defaultMode);
  const [monthViewDate, setMonthViewDate] = useState<Date>(new Date());
  const prevModeRef = useRef<DatePickerMode>(mode || defaultMode);

  // Close popover using ref or onClose callback
  const handleClose = () => {
    if (popoverRef?.current?.onClose) {
      popoverRef.current.onClose();
    } else if (onClose) {
      onClose();
    }
  };

  // Sync internal mode with external mode prop
  useEffect(() => {
    if (mode !== undefined && mode !== datePickerMode) {
      // Clear selection when mode changes externally
      if (prevModeRef.current !== mode) {
        onSelect?.(undefined);
      }
      prevModeRef.current = mode;
      setDatePickerMode(mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, datePickerMode]);

  const handleModeChange = (newMode: DatePickerMode) => {
    // Clear selection when switching modes
    if (newMode !== datePickerMode && onSelect) {
      onSelect(undefined);
    }
    prevModeRef.current = newMode;
    setDatePickerMode(newMode);
    onModeChange?.(newMode);
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!onSelect) return;
    
    if (!date) {
      onSelect(undefined);
      return;
    }

    if (datePickerMode === "date") {
      onSelect(date);
      // Close panel after selecting a date
      handleClose();
    } else if (datePickerMode === "week") {
      const weekRange = getWeekRange(date);
      onSelect(weekRange);
      // Close panel after selecting a week
      handleClose();
    } else if (datePickerMode === "all") {
      // Handle range mode - this should not be called in All mode as it uses range DayPicker
      // But keep it for safety
      if (!selected || !("from" in selected) || !selected.from) {
        onSelect({ from: date, to: undefined });
        // Don't close, wait for end date selection
      } else if (selected && "from" in selected && selected.from && !selected.to) {
        const range = date < selected.from 
          ? { from: date, to: selected.from }
          : { from: selected.from, to: date };
        onSelect(range);
        // Close panel after completing range selection (both from and to are set)
        handleClose();
      } else {
        onSelect({ from: date, to: undefined });
        // Don't close, wait for end date selection
      }
    }
  };

  // Handle month selection
  const handleMonthSelect = (month: number) => {
    if (!onSelect) return;
    
    const year = monthViewDate.getFullYear();
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
    onSelect({ from: startOfMonth, to: endOfMonth });
    // Close panel after selecting a month
    handleClose();
  };

  return (
    <div
      className={clsx(
        "w-[336px] rounded-[4px] border border-[#34304B] p-[7px] text-white",
        "bg-[#252532]",
        "shadow-[0_0_10px_0_rgba(0,0,0,0.25)]",
      )}
      style={{ fontStyle: "normal" }}
    >
      {/* Segmented control */}
      <div className="flex items-center gap-[4px] mb-[8px] p-[4px] bg-[#191627] rounded-[4px]">
        {(["date", "week", "month", "all"] as DatePickerMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => {
              handleModeChange(mode);
              if (mode === "month") {
                setMonthViewDate(new Date());
              }
            }}
            className={clsx(
              "flex-1 h-[28px] rounded-[4px] text-white font-Oxanium text-[12px] font-[400] leading-[100%] transition-all",
              datePickerMode === mode
                ? "bg-[#836EF9] text-white"
                : "text-[rgba(255,255,255,0.5)] hover:text-white"
            )}
          >
            {mode === "date" ? "Date" : mode === "week" ? "Week" : mode === "month" ? "Month" : "All"}
          </button>
        ))}
      </div>

      {/* Date picker content */}
      {datePickerMode === "month" ? (
        <div>
          {/* Year navigation */}
          <div className="flex items-center justify-between mb-[12px] px-[8px]">
            <button
              type="button"
              onClick={() => {
                const newDate = new Date(monthViewDate);
                newDate.setFullYear(newDate.getFullYear() - 1);
                setMonthViewDate(newDate);
              }}
              className="text-white hover:text-[#836EF9] transition-colors"
            >
              &lt;&lt;
            </button>
            <div className="text-white font-Oxanium text-[14px] font-[400]">
              {monthViewDate.getFullYear()}
            </div>
            <button
              type="button"
              onClick={() => {
                const newDate = new Date(monthViewDate);
                newDate.setFullYear(newDate.getFullYear() + 1);
                setMonthViewDate(newDate);
              }}
              className="text-white hover:text-[#836EF9] transition-colors"
            >
              &gt;&gt;
            </button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-[8px]">
            {monthNames.map((month, index) => {
              const monthNumber = index + 1;
              const isSelected = 
                selected && 
                "from" in selected && 
                selected.from &&
                selected.to &&
                dayjs(selected.from).month() === index &&
                dayjs(selected.from).year() === monthViewDate.getFullYear();
              
              return (
                <button
                  key={monthNumber}
                  type="button"
                  onClick={() => handleMonthSelect(monthNumber)}
                  className={clsx(
                    "h-[48px] rounded-[4px] text-white font-Oxanium text-[12px] font-[400] leading-[100%] transition-all",
                    isSelected
                      ? "bg-[#836EF9] text-white"
                      : "bg-[#191627] text-[rgba(255,255,255,0.7)] hover:bg-[#2a1f3d] hover:text-white"
                  )}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      ) : datePickerMode === "date" ? (
        <DayPicker
          animate
          className="nadsa-calendar"
          mode="single"
          selected={selected instanceof Date ? selected : undefined}
          onSelect={(date: Date | undefined) => {
            handleDateSelect(date);
          }}
          showOutsideDays
          fixedWeeks
          weekStartsOn={1}
        />
      ) : (
        <DayPicker
          animate
          className="nadsa-calendar"
          mode="range"
          selected={selected && "from" in selected ? selected : undefined}
          onSelect={(range: DateRange | undefined) => {
            if (!onSelect) return;
            
            if (datePickerMode === "week") {
              // In week mode, onDayClick handles the selection
              // Only handle clearing here
              if (range === undefined) {
                onSelect(undefined);
              } else if (range && !range.from && !range.to) {
                onSelect(undefined);
              }
            } else {
              // Range mode (All mode): use the default range selection logic
              onSelect(range);
              // Close panel only after completing range selection (both from and to are set and different)
              if (range && range.from && range.to) {
                // Check if from and to are different dates (not the same day)
                const fromDate = new Date(range.from);
                const toDate = new Date(range.to);
                fromDate.setHours(0, 0, 0, 0);
                toDate.setHours(0, 0, 0, 0);
                
                // Only close if from and to are different dates
                if (fromDate.getTime() !== toDate.getTime()) {
                  handleClose();
                }
              }
            }
          }}
          onDayClick={(date: Date) => {
            if (!onSelect) return;
            
            // For week mode, handle day click directly to ensure it works on every click
            if (datePickerMode === "week") {
              const weekRange = getWeekRange(date);
              onSelect(weekRange);
              // Close panel after selecting a week
              handleClose();
            }
          }}
          showOutsideDays
          fixedWeeks
          weekStartsOn={1}
        />
      )}
    </div>
  );
};

// Format the displayed date text
export const formatDatePickerText = (
  selected: Date | DateRange | undefined,
  mode: DatePickerMode = "all"
): string => {
  if (!selected) return "Select Date";
  
  if (mode === "date" && selected instanceof Date) {
    return dayjs(selected).format("YYYY/MM/DD");
  }
  
  if ("from" in selected && selected.from) {
    if (selected.to) {
      return `${dayjs(selected.from).format("YYYY/MM/DD")} - ${dayjs(selected.to).format("YYYY/MM/DD")}`;
    }
    return dayjs(selected.from).format("YYYY/MM/DD");
  }
  
  return "Select Date";
};

// DatePicker with Popover wrapper
export interface DatePickerPopoverProps {
  selected?: Date | DateRange | undefined;
  onSelect?: (selected: Date | DateRange | undefined) => void;
  defaultMode?: DatePickerMode;
  placement?: PopoverPlacement;
  triggerClassName?: string;
}

export const DatePickerPopover = ({
  selected,
  onSelect,
  defaultMode = "date",
  placement = PopoverPlacement.BottomRight,
  triggerClassName,
}: DatePickerPopoverProps) => {
  const [internalSelected, setInternalSelected] = useState<Date | DateRange | undefined>(selected);
  const [internalMode, setInternalMode] = useState<DatePickerMode>(defaultMode);
  const popoverRef = useRef<any>(null);

  // Sync with external props
  useEffect(() => {
    if (selected !== undefined) {
      setInternalSelected(selected);
    }
  }, [selected]);

  const handleSelect = (value: Date | DateRange | undefined) => {
    setInternalSelected(value);
    onSelect?.(value);
  };

  const handleModeChange = (newMode: DatePickerMode) => {
    setInternalMode(newMode);
  };

  return (
    <Popover
      ref={popoverRef}
      placement={placement}
      content={(
        <DatePicker
          selected={internalSelected}
          onSelect={handleSelect}
          mode={internalMode}
          onModeChange={handleModeChange}
          popoverRef={popoverRef}
        />
      )}
    >
      <div className={clsx(
        "cursor-pointer h-[28px] min-w-[125px] text-white text-[14px] leading-[100%] font-[400] border border-[#34304B] bg-[#191627] backdrop-blur-[15px] shrink-0 flex items-center justify-between px-[10px]",
        triggerClassName
      )}>
        <div className="">
          {formatDatePickerText(internalSelected, internalMode)}
        </div>
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.10116 6.17081C3.49398 6.78933 4.39665 6.78933 4.78946 6.17081L7.73289 1.53611C8.15571 0.870343 7.67742 0 6.88874 0H1.00188C0.213202 0 -0.265085 0.870343 0.157732 1.53611L3.10116 6.17081Z" fill="#727D97" />
        </svg>
      </div>
    </Popover>
  );
};

