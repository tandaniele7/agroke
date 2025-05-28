"use server";

import { format } from "date-fns";
import { Plus } from "lucide-react";

import { fetchActivitiesFieldDiary } from "@/app/actions";
import ExportPDFButton from "@/components/ui/pdf-export-button";

export default async function FieldDiary() {
  const treatments = await fetchActivitiesFieldDiary();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-2 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
                Diario di Campo
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Monitora e gestisci i tuoi trattamenti agricoli
              </p>
            </div>
            <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="w-full sm:w-auto">
                <ExportPDFButton treatments={treatments} />
              </div>
            </div>
          </div>

          {/* Table with horizontal scroll on mobile */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Data
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Campo
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Prodotto
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Principio Attivo
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantità
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stato
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {treatments.map((treatment) => (
                    <tr key={treatment.activity_id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {format(new Date(treatment.activity_date), "dd/MM/yyyy")}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {treatment.field_name}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {treatment.product_name}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {treatment.active_ingredient}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {treatment.product_quantity}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                          ${
                            treatment.compliance_status === "compliant"
                              ? "bg-green-100 text-green-800"
                              : treatment.compliance_status === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {treatment.compliance_status === "compliant"
                            ? "conforme"
                            : treatment.compliance_status === "warning"
                              ? "attenzione"
                              : "non conforme"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
