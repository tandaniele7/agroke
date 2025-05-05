"use client";

import { ProductCardInterface } from "@/lib/definitions";
import { ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { deleteProduct } from "@/app/actions";

export default function ProductCard(data: ProductCardInterface) {
  const product = data.product;
  const idx = data.index;

  const initialState = { isLoading: false, error: null };
  const [state, formAction] = useActionState(deleteProduct, initialState);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm(`Sei sicuro di voler eliminare ${product.product_name}? Questa azione non può essere annullata.`)) {
      const submitButton = document.getElementById(product.product_id) as HTMLButtonElement;
      submitButton?.click();
    }
  };

  return (
    <div
      key={idx}
      className="bg-white rounded-xl shadow-md p-5  hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {product.product_name}
          </h3>
          <p className="text-sm text-gray-600">{product.product_type}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.product_type === "funcidice"
              ? "bg-blue-100 text-blue-800"
              : product.product_type === "insecticide"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {product.product_type}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700 mb-4">
        {product.active_ingredient && (
          <div className="flex justify-between">
            <span>Principio attivo:</span>
            <span className="font-medium">{product.active_ingredient}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Tempo di carenza:</span>
          <span className="font-medium">
            {product.preharvest_interval} giorni
          </span>
        </div>
        <div className="flex justify-between">
          <span>Dose consigliata:</span>
          <span className="font-medium">{product.advised_dose}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
          Dettagli <ArrowRight size={16} className="ml-1" />
        </button>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100">
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
          {!state.isLoading && (
            <form action={formAction}>
              <input type="hidden" name="productId" value={product.product_id} />
              <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100" onClick={handleDelete}>
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
              <button id={product.product_id} className="hidden" type="submit" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
