"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";
import { auth } from "./auth";
import { supabase } from "./supabase";

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
