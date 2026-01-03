import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_lib/types";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";


const Reservations = async ({cabin}: {cabin: Cabin}) => {
    const [ bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 border border-primary-800 min-h-[400px] sm:p-6 lg:p-8">
          <DateSelector bookedDates={bookedDates} cabin={cabin} settings={settings} />
          <ReservationForm cabin={cabin} />
        </div>
  );
};

export default Reservations;