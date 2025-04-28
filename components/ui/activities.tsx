"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "react-feather";
import {
  fetchFieldsNames,
  fetchProductNamesandTypes,
  fetchActivities,
  addActivity,
} from "@/app/actions";
import { activityType } from "@/lib/definitions";
import { useEffect, useState, useActionState } from "react";
import { Activity } from "@/lib/definitions";

export default function ActivityPage() {
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [fieldsNames, setFieldsNames] = useState<
    { fieldName: string; fieldId: string }[]
  >([]);
  const [productsNamesTypes, setProductsNames_Types] = useState<
    {
      productName: string;
      productType: string;
      productId: string;
    }[]
  >([]);
  const initialState = {
    isLoading: false,
    error: null,
  };
  const [state, formAction] = useActionState(addActivity, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFieldsNames(await fetchFieldsNames());
        setProductsNames_Types(await fetchProductNamesandTypes());
        setActivities(await fetchActivities());
      } catch (error) {
        console.error("Errore durante il caricamento dei dati:", error);
      }
    };

    fetchData();
  }, []);

  const renderActivityDetailsModal = () => {
    return (
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {activityType.find(
                        (t) => t.id === selectedActivity.activity_type
                      )?.icon || "🔧"}
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">
                      {
                        activityType.find(
                          (t) => t.id === selectedActivity.activity_type
                        )?.name
                      }
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Terreno</p>
                    <p className="font-medium">{selectedActivity.field_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">
                      {new Date(
                        selectedActivity.activity_date
                      ).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                  {selectedActivity.product_name && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Prodotto</p>
                        <p className="font-medium">
                          {selectedActivity.product_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantità</p>
                        <p className="font-medium">
                          {selectedActivity.product_quantity}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {selectedActivity.note && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Note</p>
                    <p className="p-3 bg-gray-50 rounded-lg mt-1">
                      {selectedActivity.note}
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                  <button className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">
                    Modifica
                  </button>
                  <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Stampa Scheda
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  const renderNewActivityModal = () => {
    return (
      <AnimatePresence>
        {showNewActivityModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Nuova Attività
                  </h2>
                  <button
                    onClick={() => setShowNewActivityModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {!state.isLoading && (
                <form action={formAction}>
                  <div className="p-6 space-y-6">
                    {/* Form content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo di Attività
                        </label>
                        <select
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          name="activityType"
                          required
                        >
                          <option value="" disabled selected>
                            Seleziona tipo...
                          </option>
                          {activityType.map((type, idx) => (
                            <option key={idx} value={type.id}>
                              {type.icon} {type.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Terreno
                        </label>
                        <select
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          name="fieldId"
                          required
                        >
                          <option value="" disabled selected>
                            Seleziona terreno...
                          </option>
                          {fieldsNames.map((field, idx) => (
                            <option key={idx} value={field.fieldId}>
                              {field.fieldName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data
                        </label>
                        <input
                          type="date"
                          required
                          name="activityDate"
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prodotto (se applicabile)
                        </label>
                        <select
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          name="productId"
                          required
                        >
                          <option value="" selected>
                            Nessun prodotto
                          </option>
                          {productsNamesTypes.map((product, idx) => (
                            <option key={idx} value={product.productId}>
                              {product.productName} ({product.productType})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantità
                        </label>
                        <div className="flex">
                          <input
                            name="productQuantity"
                            required
                            type="text"
                            className="block w-full border border-gray-300 rounded-l-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Es: 2.5"
                          />
                          <select
                            name="unit"
                            required
                            className="border border-l-0 border-gray-300 rounded-r-lg p-2.5 bg-gray-50"
                          >
                            <option value="kg/ha">kg/ha</option>
                            <option value="l/ha">l/ha</option>
                            <option value="q/ha">q/ha</option>
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Note
                        </label>
                        <textarea
                          name="note"
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          rows={4}
                          placeholder="Inserisci eventuali note sull'attività..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowNewActivityModal(false)}
                    >
                      Annulla
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Salva Attività
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-green-800">
              Registro Attività
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca attività..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                onClick={() => setShowNewActivityModal(true)}
              >
                <Plus size={18} />
                <span>Nuova Attività</span>
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          {/* <motion.div
        className="flex flex-wrap gap-3 bg-white rounded-xl shadow-md p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="flex items-center text-gray-700 mr-2">
          <Filter size={16} className="mr-1" /> Filtri:
        </span>
        {tipiAttivita.map((tipo, idx) => (
          <button
            key={idx}
            className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:bg-green-50 hover:border-green-300 flex items-center space-x-1"
          >
            <span>{tipo.icona}</span>
            <span>{tipo.nome}</span>
          </button>
        ))}
      </motion.div> */}

          {/* Activities Table */}
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Terreno
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Prodotto
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantità
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((att, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                    className="hover:bg-green-50 cursor-pointer"
                    onClick={() => setSelectedActivity(att)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(att.activity_date).toLocaleDateString(
                          "it-IT"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">
                          {activityType.find((t) => t.id === att.activity_type)
                            ?.icon || "🔧"}
                        </span>
                        <div className="text-sm font-medium text-gray-900">
                          {
                            activityType.find((t) => t.id === att.activity_type)
                              ?.name
                          }
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {att.field_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {att.product_name || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {att.product_quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button className="p-1 rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {activities.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Nessuna attività registrata
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
      {renderActivityDetailsModal()}
      {renderNewActivityModal()}
    </div>
  );
}
