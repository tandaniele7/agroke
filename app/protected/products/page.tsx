import { Suspense } from "react";
import { Search } from "react-feather";
import NewProduct from "@/components/ui/new-product";
import ProductCard from "@/components/ui/product-card";
import { ProductCardsSkeleton } from "@/components/ui/skeletons";
import { fetchProducts } from "@/app/actions";

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-green-800">
              Prodotti e Magazzino
            </h2>
            <div className="flex space-x-4">
              <div className="hidden relative">
                <input
                  type="text"
                  placeholder="Cerca prodotto..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <NewProduct />
            </div>
          </div>

          <Suspense fallback={<ProductCardsSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProductList() {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product, idx) => (
        <ProductCard key={idx} product={product} index={idx} />
      ))}
    </div>
  );
}
