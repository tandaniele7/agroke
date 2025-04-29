"use client";

import { Activity, activityType, TableRowInterface } from "@/lib/definitions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Add view prop to interface
interface TableRowProps extends TableRowInterface {
  view: "desktop" | "mobile";
}

export default function TableRow({ index, activity, view }: TableRowProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

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

  if (view === "desktop") {
    return (
      <>
        <tr
          key={index}
          className="hover:bg-green-50 cursor-pointer"
          onClick={() => setSelectedActivity(activity)}
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {new Date(activity.activity_date).toLocaleDateString("it-IT")}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {activityType.find((t) => t.id === activity.activity_type)
                  ?.icon || "🔧"}
              </span>
              <div className="text-sm font-medium text-gray-900">
                {activityType.find((t) => t.id === activity.activity_type)
                  ?.name}
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{activity.field_name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {activity.product_name || "-"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {activity.product_quantity}
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
        </tr>
        {renderActivityDetailsModal()}
      </>
    );
  }

  // Mobile view is now handled in the main table component
  return null;
}
