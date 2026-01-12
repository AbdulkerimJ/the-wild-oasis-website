"use client";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

const ReservationList = ({ bookings }) => {
  const [optimisticBookings, setOptimisticBookings] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handleDelete(bookingId) {
    setOptimisticBookings(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
