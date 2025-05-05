"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "react-feather";
import { addProduct } from "@/app/actions";
import { productType } from "@/lib/definitions";
import { useState, useActionState } from "react";

export default function NewProduct() {

  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const initialState = {
    isLoading: false,
    error: null,
  };
  const [state, formAction] = useActionState(addProduct, initialState);
  const renderNewActivityModal = () => {
    return (
      <AnimatePresence>
        {showNewProductModal && (
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
                    Nuovo Prodotto
                  </h2>
                  <button
                    onClick={() => setShowNewProductModal(false)}
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
                          Tipo di Prodotto
                        </label>
                        <select
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          name="productType"
                          required
                          defaultValue="Seleziona tipo..."
                        >
                          <option value="Seleziona tipo..." disabled>
                            Seleziona tipo...
                          </option>
                          {productType.map((type, idx) => (
                            <option key={idx} value={type.id}>
                              {type.icon} {type.name}
                            </option>
                          ))}
                        </select>
                      </div>



                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome del Prodotto
                        </label>
                        <input
                          type="text"
                          required
                          name="productName"
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Es. Rame 20 WG"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Principio Attivo
                        </label>
                        <input
                          type="text"
                          required
                          name="activeIngredient"
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Es. Rame solfato 20%"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tempo di Carenza (giorni)
                        </label>
                        <input
                          type="text"
                          required
                          name="preharvestInterval"
                          className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Es. 20"
                        />
                      </div>

                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosaggio Consigliato
                        </label>
                        <div className="flex">
                          <input
                            name="advisedQuantity"
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
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowNewProductModal(false)}
                    >
                      Annulla
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Salva Prodotto
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
    <div>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        onClick={() => setShowNewProductModal(true)}
      >
        <Plus size={18} />
        <span>Nuovo Prodotto</span>
      </button>
      {renderNewActivityModal()}
    </div>
  );
}
