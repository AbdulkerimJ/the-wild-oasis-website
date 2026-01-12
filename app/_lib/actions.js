"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { th } from "date-fns/locale";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  const guestId = Number(session?.user?.guestId);
  if (!session || Number.isNaN(guestId)) {
    throw new Error("You must be signed in to update your profile.");
  }
  const nationalID = formData.get("nationalID")?.toString().trim();
  const nationalityValue = formData.get("nationality")?.toString();
  if (!nationalityValue) throw new Error("Please select a nationality.");
  const [nationality, countryFlag = ""] = nationalityValue.split("%");

  if (!nationalID || !/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid National ID format.");
  }

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
  redirect("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in to delete a reservation.");
  }
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You can only delete your own reservations.");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));
  // 1. Authenticate user
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in to delete a reservation.");
  }
  // 2. Authorization: Ensure the booking belongs to the logged-in guest
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You can only update your own reservations.");
  }

  // 3. Update booking details
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
  };

  // 4. Mutate the database
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");
  // 5. Revalidate and redirect
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
