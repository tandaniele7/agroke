import { createClient } from "@/utils/supabase/server";

export async function averagePosition(): Promise<{
  lat: number;
  lng: number;
} | null> {
  // This function calculates the average latitude and longitude among
  // all the points that have been stored to build the polygon

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return null;
  }

  const { data: fields, error } = await supabase
    .from("field_data")
    .select(`field_geometry`)
    .eq("id", user?.id || "");

  if (error) {
    console.error("Error fetching fields:", error.message);
    return null;
  }
  if (!fields || fields.length === 0) {
    console.log("No fields found for the user");
    return null;
  }
  const allCoordinates = fields.flatMap((field) => field.field_geometry);
  const sumLat = allCoordinates.reduce(
    (sum: number, coord: number[]) => sum + coord[1],
    0
  );
  const sumLng = allCoordinates.reduce(
    (sum: number, coord: number[]) => sum + coord[0],
    0
  );
  const count = allCoordinates.length;

  return {
    lat: sumLat / count,
    lng: sumLng / count,
  };
}

export function checkCompliance(treatment_date: string) {
  // Add your compliance checking logic here
  // This is just an example - implement your actual rules
  const treatmentDate = new Date(treatment_date);
  const today = new Date();
  const daysDifference = Math.floor(
    (today.getTime() - treatmentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDifference > 30) return "non_compliant";
  if (daysDifference > 20) return "warning";
  return "compliant";
}
