"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function ProductViewPage() {
  const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/admin/product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <Fragment>
      {products.length === 0 && (
        <div className="p-5">
          <Skeleton className="h-14 mt-2 bg-gray-400" />
          <Skeleton className="h-14 mt-2 bg-gray-400" />
          <Skeleton className="h-14 mt-2 bg-gray-400" />
          <Skeleton className="h-14 mt-2 bg-gray-400" />
          <Skeleton className="h-14 mt-2 bg-gray-400" />
        </div>
      )}
      {products.length && (
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">$ {product.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button className="h-7" variant={"secondary"}>
                      Edit
                    </Button>
                    <Separator orientation="vertical" />
                    <Button className="h-7" variant={"destructive"}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Fragment>
  );
}
