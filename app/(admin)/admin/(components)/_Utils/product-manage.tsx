"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import Image from "next/image";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

export default function ProductManagePage() {
  const inputRef = useRef<ElementRef<"input">>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleProductCreate(formData: FormData) {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const description = formData.get("description") as string;
    const keywords = formData.get("keywords") as string;
    const data = {
      name,
      price: parseFloat(price),
      stockCount: parseInt(quantity),
      description,
      keywords,
      image: selectedImage,
    };

    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message);
      }
      toast.success("Product created successfully");
    } catch (error: any) {
      toast.error(error);
    }
  }
  return (
    <div>
      <form className="p-4" action={handleProductCreate}>
        <div className="flex items-center">
          {/* image */}
          <div className="flex-1 rounded-md overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected"
                width={400}
                height={400}
                className="object-cover"
              />
            )}
            {!selectedImage && (
              <div
                onClick={() => inputRef.current?.click()}
                className="bg-gray-300 text-gray-400 font-semibold w-auto h-[300px] cursor-pointer flex items-center justify-center"
              >
                <Camera size={32} className="mr-3" />
                <span>Click to select upload image</span>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-1 p-3">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input name="name" id="name" placeholder="Enter product name" />
            </div>
            <div className="mt-5">
              <Label htmlFor="keywords">
                Enter Keywords{" "}
                <span className="text-gray-500">(separated by comma.,)</span>
              </Label>
              <Input
                name="keywords"
                id="keywords"
                placeholder="Enter keywords"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex-1">
            <Label htmlFor="price">Price</Label>
            <Input name="price" id="price" placeholder="Enter price" />
          </div>
          <div className="flex-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input name="quantity" id="quantity" placeholder="Enter quantity" />
          </div>
        </div>
        <div className="mt-5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Describe your product here. This will be displayed to purchasers, so please include all the relevant information like product features and characteristics."
            name="description"
            id="description"
            rows={8}
          />
        </div>
        <div className="mt-5">
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
