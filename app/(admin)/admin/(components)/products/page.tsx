import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ProductViewPage from "../_Utils/products-view";
import ProductManagePage from "../_Utils/product-manage";

const ProductsPage = () => {
  return (
    <div>
      <Tabs defaultValue="view" className="mb-4">
        <TabsList className="w-full flex bg-gray-500 text-zinc-200">
          <TabsTrigger value="view" className="flex-1">
            View
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex-1">
            Manage
          </TabsTrigger>
        </TabsList>
        <TabsContent className="bg-gray-200 min-h-[720px]" value="view">
          <ProductViewPage />
        </TabsContent>
        <TabsContent className="bg-gray-200 min-h-[720px]" value="manage">
          <ProductManagePage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsPage;
