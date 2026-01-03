"use client";
import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";
export const ReservationContext = createContext<
  | {
      range: DateRange | undefined;
      setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
      resetRange: () => void;
    }
  | undefined
>(undefined);

const initialState = undefined;
function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  function resetRange() {
    setRange(undefined);
  }
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
export { ReservationProvider, useReservation };
