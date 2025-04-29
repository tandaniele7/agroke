export type Field = {
  id: string;
  cropType: string;
  fieldName: string;
  description: string;
  coordinates: number[][];
};

export interface FieclCardComponent {
  fieldInfo: Field;
}
export interface MapComponentProps {
  initialFields: Field[];
}
export type ActivityDash = {
  activityDate: string; // ISO date string
  activityType: string;
  fieldName: string;
};

export interface Activity {
  activity_id: string;
  activity_type: string;
  field_id: number;
  field_name: string;
  activity_date: string;
  product_name: string;
  product_quantity: number;
  note: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  active_ingredient: string;
  product_type: string;
  preharvest_interval: number;
  advised_dose: string;
}

export const activityType = [
  { id: "treatment", name: "Trattamento fitosanitario", icon: "🌿" },
  { id: "fertilization", name: "Concimazione", icon: "🧪" },
  { id: "seeding", name: "Semina", icon: "🌱" },
  { id: "harvesting", name: "Raccolta", icon: "🌾" },
  { id: "irrigation", name: "Irrigazione", icon: "💧" },
  { id: "pruning", name: "Potatura", icon: "✂️" },
  { id: "other", name: "Altra operazione", icon: "🔧" },
];

export interface WeatherDataDashboard {
  temperature: number;
  humidity: number;
  rainfall: number;
  wind: number;
  provice: string;
}

export interface Notification {
  content: string;
  type: "warning" | "severe";
  date: string;
}

export type Treatment = {
  id?: string;
  crop_id: string;
  date: string;
  product_name: string;
  active_ingredient: string;
  quantity: string;
  target_pest: string;
  weather_conditions: string;
  notes: string;
  created_at?: string;
};

export type Crop = {
  id: string;
  name: string; 
  area: number;
  sowing_date: string;
  flowering_date: string | null;
  harvest_date: string | null;
};

export interface NewActivityInterface {
  fields: { fieldName: string; fieldId: string }[];
  products: {
    productName: string;
    productType: string;
    productId: string;
  }[];
}

export interface TableRowInterface {
  index: number;
  activity: Activity;
}