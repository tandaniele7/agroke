import { fetchFields } from "@/app/actions";
import { Plus } from "lucide-react";
import Link from "next/link";
import FieldCard from "@/components/ui/field-card";
import { Suspense } from "react";
import { FieldCardSkeleton } from "@/components/ui/skeletons";

// Separate component for the field list to handle loading state
async function FieldList() {
  const fields = await fetchFields();
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {fields.map((field, idx) => (
        <FieldCard key={field.id || idx} fieldInfo={field} />
      ))}
    </div>
  );
}

export default function FieldsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">I Tuoi Terreni</h1>
          <Link href="/protected/fields/add-field">
            <button className="bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              <span>Aggiungi Nuovo Terreno</span>
            </button>
          </Link>
        </div>

        <Suspense 
          fallback={
            <div className="grid grid-cols-1 gap-6">
              {[...Array(3)].map((_, idx) => (
                <FieldCardSkeleton key={idx} />
              ))}
            </div>
          }
        >
          <FieldList />
        </Suspense>
      </div>
    </div>
  );
}
