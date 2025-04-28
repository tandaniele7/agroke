import { fetchFieldData } from "@/app/actions";
// import ClientFieldView from "@/components/fields/client-field-view";

export default async function FieldPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const fieldId = (await params).id;
  const fieldData = await fetchFieldData(fieldId);

  if (!fieldData) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Caricamento Dati dei Campi...</p>
        </div>
      </div>
    );
  }

  return fieldId;
}
