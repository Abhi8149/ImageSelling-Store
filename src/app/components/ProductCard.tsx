"use client";

import { MyProduct } from "@/models/Product";
import Link from "next/link";
import { DirectionAwareHover } from "../components/ui/direction-aware-hover";

export default function ProductCard({ product }: { product: MyProduct[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {product.length > 0 ? (
        product.map((item) => {
          const lowestPrice = item.varients.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            item.varients[0]?.price || 0
          );

          // Construct the full image URL with transformations for square aspect ratio
          const imageUrl = `${process.env.NEXT_PUBLIC_URL_ENDPOINT}/${item.imageUrl}?tr=w-800,h-800,fo-center`;

          return (
            <Link href={`/products/${item._id}`} key={item._id?.toString()}>
              <div className="aspect-square relative group overflow-hidden rounded-lg">
                <DirectionAwareHover
                  imageUrl={imageUrl}
                  className="w-full h-full"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4  bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="font-bold text-xl text-white">
                      {item.name}
                    </h3>
                    <p className="font-normal text-sm text-gray-200">
                      Starting from ₹{lowestPrice}
                    </p>
                  </div>
                </DirectionAwareHover>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="text-center p-4 col-span-full">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}