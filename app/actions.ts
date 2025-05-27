"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Field,
  ActivityDash,
  Activity,
  Product,
  Notification,
  ActivityDBType,
  ActivityDashDBType,
  ActivityFieldDiary,
  ActivityFieldDiaryDBType,
} from "@/lib/definitions";
import { checkCompliance } from "@/lib/functions";

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
  const fieldName = formData.get("fieldName")?.toString();
  const fieldDescription = formData.get("fieldDescription")?.toString();
  const cropType = formData.get("cropType")?.toString();
  const lat = formData.getAll("lat").map((val) => parseFloat(val.toString()));
  const lng = formData.getAll("lng").map((val) => parseFloat(val.toString()));
  if (lat.length < 3 || lng.length < 3) {
    return encodedRedirect(
      "error",
      "/protected/fields/add-field",
      "At least three points are required to define the field geometry"
    );
  }

  if (lat.length !== lng.length) {
    return encodedRedirect(
      "error",
      "/protected/fields/add-field",
      "Lat and Lng arrays must have the same length"
    );
  }

  const fieldGeometry = lat.map((latitude, index) => [lng[index], latitude]);

  if (
    !fieldName ||
    !fieldDescription ||
    !cropType ||
    !fieldGeometry ||
    !Array.isArray(fieldGeometry)
  ) {
    return encodedRedirect(
      "error",
      "/protected/fields",
      "All fields are required and field geometry must be valid"
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

  const { error } = await supabase.from("field_data").insert([
    {
      id: user.id,
      crop_type: cropType,
      field_name: fieldName,
      field_description: fieldDescription,
      field_geometry: fieldGeometry,
    },
  ]);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/fields/add-field",
      // "Could not add field data"
      error.message
    );
  }

  return encodedRedirect(
    "success",
    "/protected/fields",
    "Field data added successfully"
  );
}
export async function addActivity(prevState: State, formData: FormData) {
  const activityType = formData.get("activityType")?.toString();
  const activityDate = formData.get("activityDate")?.toString();
  const fieldId = formData.get("fieldId")?.toString();
  const productId = formData.get("productId")?.toString();
  const productQuantity = formData.get("productQuantity")?.toString();
  const Unit = formData.get("unit")?.toString();
  const note_ = formData.get("note")?.toString();

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return encodedRedirect(
      "error",
      "/protected/activities",
      "Could not retrieve user information"
    );
  }

  if (
    !activityType ||
    !activityDate ||
    !fieldId ||
    !productId ||
    !productQuantity
  ) {
    return encodedRedirect(
      "error",
      "/protected/activities",
      "All fields are required"
    );
  }

  let transformedQuantity = parseFloat(productQuantity);
  if (Unit === "l/ha") {
    transformedQuantity = transformedQuantity * 1; // assuming 1L = 1kg for simplicity
  } else if (Unit === "q/ha") {
    transformedQuantity = transformedQuantity * 100; // 1q = 100kg
  }
  const productQuantityTransformed = transformedQuantity.toString();

  const { error } = await supabase.from("activities").insert([
    {
      id: user.id,
      activity_date: activityDate,
      activity_type: activityType,
      field_id: fieldId,
      product_id: productId,
      product_quantity: productQuantityTransformed,
      note: note_ ? note_ : "",
    },
  ]);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/activities",
      // "Could not add field data"
      error.message
    );
  }

  return encodedRedirect(
    "success",
    "/protected/activities",
    "Field data added successfully"
  );
}
export async function addProduct(prevState: State, formData: FormData) {
  const productType = formData.get("productType")?.toString();
  const productName = formData.get("productName")?.toString();
  const activeIngredient = formData.get("activeIngredient")?.toString();
  const preharvestInterval = formData.get("preharvestInterval")?.toString();
  const advisedQuantity = formData.get("advisedQuantity")?.toString();
  const Unit = formData.get("unit")?.toString();

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return encodedRedirect(
      "error",
      "/protected/products",
      "Could not retrieve user information"
    );
  }

  if (
    !productType ||
    !productName ||
    !activeIngredient ||
    !preharvestInterval ||
    !advisedQuantity
  ) {
    return encodedRedirect(
      "error",
      "/protected/products",
      "All fields are required"
    );
  }

  let transformedQuantity = parseFloat(advisedQuantity);
  if (Unit === "l/ha") {
    transformedQuantity = transformedQuantity * 1; // assuming 1L = 1kg for simplicity
  } else if (Unit === "q/ha") {
    transformedQuantity = transformedQuantity * 100; // 1q = 100kg
  }
  const advisedQuantityTransformed = transformedQuantity.toString();

  const { error } = await supabase.from("products").insert([
    {
      id: user.id,
      product_name: productName,
      product_type: productType,
      active_ingredient: activeIngredient,
      preharvest_interval: preharvestInterval,
      advised_dose: advisedQuantityTransformed,
    },
  ]);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/products",
      // "Could not add field data"
      error.message
    );
  }

  return encodedRedirect(
    "success",
    "/protected/products",
    "Product added successfully"
  );
}

export async function fetchStats(): Promise<{
  NumFields: number;
  NumActivities: number;
  NumProducts: number;
  NumAlerts: number;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return {
      NumFields: -2,
      NumActivities: -2,
      NumProducts: -2,
      NumAlerts: -2,
    };
  }

  const { count: NumFields, error: fieldsError } = await supabase
    .from("field_data")
    .select("*", { count: "exact", head: true })
    .eq("id", user.id);

  const { count: NumActivities, error: activitiesError } = await supabase
    .from("activities")
    .select("*", { count: "exact", head: true })
    .eq("id", user.id);

  const { count: NumProducts, error: productsError } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("id", user.id);

  const { count: NumAlerts, error: alertsError } = await supabase
    .from("alerts")
    .select("*", { count: "exact", head: true })
    .eq("id", user.id);

  const Stats: {
    NumFields: number;
    NumActivities: number;
    NumProducts: number;
    NumAlerts: number;
  } = {
    NumFields: NumFields || 0,
    NumActivities: NumActivities || 0,
    NumProducts: NumProducts || 0,
    NumAlerts: NumAlerts || 0,
  };

  if (fieldsError) {
    console.error("Error fetching fields count:", fieldsError.message);
    Stats.NumFields = -1;
  }
  if (activitiesError) {
    console.error("Error fetching activities count:", activitiesError.message);
    Stats.NumActivities = -1;
  }
  if (productsError) {
    console.error("Error fetching products count:", productsError.message);
    Stats.NumProducts = -1;
  }
  if (alertsError) {
    console.error("Error fetching alerts count:", alertsError.message);
    Stats.NumAlerts = -1;
  }

  return Stats;
}

export async function fetchFields(): Promise<Field[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }

  const { data: fields, error } = await supabase
    .from("field_data")
    .select(
      `field_id, crop_type, field_name, field_description, field_geometry`
    )
    .eq("id", user?.id || "");

  if (error) {
    console.error("Error fetching fields:", error.message);
    return [];
  }
  if (!fields || fields.length === 0) {
    console.log("No fields found for the user");
    return [];
  }

  const Fields: Field[] = fields.map((field) => ({
    id: field.field_id,
    cropType: field.crop_type,
    fieldName: field.field_name,
    description: field.field_description,
    coordinates: field.field_geometry,
  }));
  return Fields;
}

export async function fetchFieldsNames(): Promise<
  { fieldName: string; fieldId: string }[]
> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }

  const { data: fields, error } = await supabase
    .from("field_data")
    .select(`field_name, field_id`)
    .eq("id", user?.id || "");

  if (error) {
    console.error("Error fetching fields:", error.message);
    return [];
  }
  if (!fields || fields.length === 0) {
    console.log("No fields found for the user");
    return [];
  }
  const Fields: { fieldName: string; fieldId: string }[] = fields.map(
    (field) => ({
      fieldName: field.field_name,
      fieldId: field.field_id,
    })
  );

  return Fields;
}

export async function fetchActivities(): Promise<Activity[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }

  const { data: activities, error } = await supabase
    .from("activities")
    .select(
      `activity_id, activity_type, field_id, field_data(field_name), activity_date, products(product_name), product_quantity, note`
    )
    .eq("id", user?.id || "");

  if (error) {
    console.error("Error fetching activities:", error.message);
    return [];
  }
  if (!activities || activities.length === 0) {
    console.log("No activity found for the user");
    return [];
  }
  const activities_ = activities as unknown as ActivityDBType;

  const Activities: Activity[] = activities_?.map((activity) => ({
    activity_id: activity.activity_id,
    activity_type: activity.activity_type,
    field_id: activity.field_id,
    field_name: activity.field_data.field_name,
    activity_date: activity.activity_date,
    product_name: activity.products.product_name,
    product_quantity: activity.product_quantity,
    note: activity.note,
  }));

  return Activities;
}

export async function fetchActivitiesFieldDiary(): Promise<ActivityFieldDiary[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }

  const { data: activities, error } = await supabase
    .from("activities")
    .select(
      `activity_id, activity_type, field_id, field_data(field_name), activity_date, products(product_name, active_ingredient) ,product_quantity, note`
    )
    .eq("id", user?.id || "");

  if (error) {
    console.error("Error fetching activities from Field Diary:", error.message);
    return [];
  }
  if (!activities || activities.length === 0) {
    console.log("No activity found for the user");
    return [];
  }
  const activities_ = activities as unknown as ActivityFieldDiaryDBType;

  const Activities: ActivityFieldDiary[] = activities_?.map((activity) => ({
    activity_id: activity.activity_id,
    activity_type: activity.activity_type,
    field_id: activity.field_id,
    field_name: activity.field_data.field_name,
    activity_date: activity.activity_date,
    product_name: activity.products.product_name,
    product_quantity: activity.product_quantity,
    active_ingredient: activity.products.active_ingredient,
    compliance_status: checkCompliance(activity.activity_date),
    note: activity.note,
  }));

  return Activities;
}

export async function fetchActivitiesDash(): Promise<ActivityDash[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }
  const { data: activities, error } = await supabase
    .from("activities")
    .select(`activity_date, activity_type, field_data(field_id, field_name)`)
    .eq("id", user?.id || "")
    .order("activity_date", { ascending: false })
    .limit(4);

  if (activities) {
    for (const activity of activities) {
      if (
        Array.isArray(activity.field_data) &&
        activity.field_data.length > 0
      ) {
        activity.field_data = activity.field_data.filter(
          (field) => field.field_id === field.field_id
        );
      }
    }
  }

  if (error) {
    console.error("Error fetching activities:", error.message);
    return [];
  }
  const activities_ = activities as unknown as ActivityDashDBType
  const Activities: ActivityDash[] = activities_.map((activity) => ({
    activityDate: activity.activity_date,
    activityType: activity.activity_type,
    fieldName: activity.field_data.field_name || "Unknown Field",
  }));

  return Activities;
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `product_id, product_name, active_ingredient, product_type, preharvest_interval, advised_dose`
    )
    .eq("id", user?.id || "");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  if (!products || products.length === 0) {
    console.log("No products found for the user in fetchProducts");
    return [];
  }
  const Products: Product[] = products.map((product) => ({
    product_id: product.product_id,
    product_name: product.product_name,
    active_ingredient: product.active_ingredient,
    product_type: product.product_type,
    preharvest_interval: product.preharvest_interval,
    advised_dose: product.advised_dose,
  }));

  return Products;
}

export async function fetchProductNamesandTypes(): Promise<
  {
    productName: string;
    productType: string;
    productId: string;
  }[]
> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return [];
  }

  const { data: products, error } = await supabase
    .from("products")
    .select(`product_name, product_type, product_id`)
    .eq("id", user.id);

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  if (!products || products.length === 0) {
    console.log("No products found for the user in fetchProductNamesandTypes");
    return [];
  }
  const Products: {
    productName: string;
    productType: string;
    productId: string;
  }[] = products.map((product) => ({
    productId: product.product_id,
    productName: product.product_name,
    productType: product.product_type,
  }));

  return Products;
}

export async function fetchNotifications(): Promise<Notification[]> {
  // to be done
  return [];
}

export async function fetchFieldData(fieldId: string): Promise<Field | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return null;
  }

  const { data: fieldData, error } = await supabase
    .from("field_data")
    .select(
      `field_id, field_name, crop_type, field_description, field_geometry`
    )
    .eq("id", user?.id || "")
    .eq("field_id", fieldId)
    .single();

  if (error) {
    console.error("Error fetching field data:", error.message);
    return null;
  }

  if (!fieldData) {
    console.log("No field data found for the user");
    return null;
  }

  const Field: Field = {
    id: fieldData.field_id,
    cropType: fieldData.crop_type,
    fieldName: fieldData.field_name,
    description: fieldData.field_description,
    coordinates: fieldData.field_geometry,
  };

  return Field;
}

export async function deleteField(prevState: State, formData: FormData) {
  const fieldId = formData.get("fieldId")?.toString();
  console.log(fieldId);
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

  const { error } = await supabase
    .from("field_data")
    .delete()
    .eq("field_id", fieldId);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/fields",
      "Could not delete field data"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/fields",
    "Field data deleted successfully"
  );
}

export async function deleteProduct(prevState: State, formData: FormData) {
  const ProductId = formData.get("productId")?.toString();

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return encodedRedirect(
      "error",
      "/protected/products",
      "Could not retrieve user information"
    );
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("product_id", ProductId);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/products",
      "Could not delete product data"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/products",
    "Product data deleted successfully"
  );
}

export async function deleteActivity(prevState: State, formData: FormData) {
  const ActivityId = formData.get("activityId")?.toString();

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(userError?.message || "User not found");
    return encodedRedirect(
      "error",
      "/protected/activities",
      "Could not retrieve user information"
    );
  }

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("activity_id", ActivityId);

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/protected/activities",
      "Could not delete activity data"
    );
  }

  return encodedRedirect(
    "success",
    "/protected/activities",
    "Activity data deleted successfully"
  );
}
