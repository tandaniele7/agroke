"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export interface State {
  isLoading: boolean;
  error: string | null;
}

export async function addFieldData(prevState: State, formData: FormData) {
  const nome = formData.get("fieldName")?.toString();
  const lat = formData.getAll("lat").map((val) => parseFloat(val.toString()));
  const lng = formData.getAll("lng").map((val) => parseFloat(val.toString()));

  if (lat.length < 3 || lng.length < 3) {
    return encodedRedirect(
      "error",
      "/protected/fields",
      "At least three points are required to calculate the area"
    );
  }

  const calculatePolygonArea = (lat: number[], lng: number[]): number => {
    let area = 0;
    const numPoints = lat.length;

    for (let i = 0; i < numPoints; i++) {
      const j = (i + 1) % numPoints;
      area += lat[i] * lng[j] - lng[i] * lat[j];
    }

    return Math.abs(area / 2);
  };

  const area = calculatePolygonArea(lat, lng).toString();

  if (
    !nome ||
    !area ||
    !lat ||
    !lng ||
    !Array.isArray(lat) ||
    !Array.isArray(lng)
  ) {
    return encodedRedirect(
      "error",
      "/protected/fields",
      "All fields are required and lat/lng must be arrays"
    );
  }

  if (lat.length !== lng.length) {
    return encodedRedirect(
      "error",
      "/protected/fields",
      "Lat and Lng arrays must have the same length"
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return encodedRedirect(
      "error",
      "/protected/fields",
      "Could not retrieve user information"
    );
  }

  const { error } = await supabase.from("campi").insert([
    {
      nome,
      area,
      coordinate: {
        lat: lat,
        lng: lng,
      },
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/fields",
      "Could not add field data"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/fields",
    "Field data added successfully"
  );
}
