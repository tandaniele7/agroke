export type Field = {
  id: string;
  fieldName: string;
  description: string;
  coordinates: number[][];
};
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
