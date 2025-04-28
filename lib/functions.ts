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
  const allCoordinates = fields.flatMap(field => field.field_geometry);
  const sumLat = allCoordinates.reduce((sum: number, coord: number[]) => sum + coord[1], 0);
  const sumLng = allCoordinates.reduce((sum: number, coord: number[]) => sum + coord[0], 0);
  const count = allCoordinates.length;

  return {
    lat: sumLat / count,
    lng: sumLng / count
  };
}
