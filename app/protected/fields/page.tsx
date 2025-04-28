import { fetchFields } from "@/app/actions";
import { Plus } from "lucide-react";
import Link from "next/link";
import FieldCard from "@/components/ui/field-card";
import { Suspense } from "react";
import { FieldCardSkeleton } from "@/components/ui/skeletons";

export default async function FieldsPage() {
  const fields = await fetchFields();

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

        <div className="grid grid-cols-1 gap-6">
          {fields.map((field, idx) => {
            console.log(field);
            return (
              <Suspense key={idx} fallback={<FieldCardSkeleton />}>
                <FieldCard key={idx} fieldInfo={field} />
              </Suspense>
            );
          })}
        </div>
      </div>
    </div>
  );
}
