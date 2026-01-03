"use client";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({cabin, bookedDates, settings}) {
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const range = { from: null, to: null };

  const {minBookingLength, maxBookingLength} = settings;

  return (
    <div className="flex flex-col w-full">
      {/* Calendar wrapper */}
      <div className="flex justify-center overflow-x-auto px-2 sm:px-0 w-full">
        <div className="w-full max-w-[720px]">
          <DayPicker
            mode="range"
            numberOfMonths={2}
            fixedWeeks
            min={minBookingLength + 1}
            max={maxBookingLength}
            fromMonth={new Date()}
            fromDate={new Date()}
            toYear={new Date().getFullYear() + 5}
            captionLayout="dropdown"
            className="w-full px-5"
            classNames={{
              months: "grid grid-cols-1 sm:grid-cols-2 w-full gap-24 sm:gap-40",
              month: "w-full",
            }}
            styles={{
              root: { width: "100%" },
              months: { width: "100%" },
            }}
          />
        </div>
      </div>

      {/* Price section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-0 px-4 sm:px-8 bg-accent-500 text-primary-800 py-4 sm:h-[72px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night</span>
          </p>

          {numNights ? (
            <div className="flex gap-4 items-center">
              <p className="bg-accent-600 px-3 py-1 sm:py-2 text-xl sm:text-2xl">
                &times; {numNights}
              </p>
              <p>
                <span className="text-sm sm:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </div>
          ) : null}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold w-full sm:w-auto"
            onClick={() => resetRange && resetRange()}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
