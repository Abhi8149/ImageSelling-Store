"use client";
import { div } from "framer-motion/client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { MyProduct } from "@/models/Product";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Home() {
  const [products, setproducts] = useState<MyProduct[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product')
        console.log(response.data.message)
        setproducts(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  },[])
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-8">
        <h1 className="text-3xl font-bold mb-8">ImageKit Shop</h1>
        <ProductCard product={products} />
      </main>

    </div>
  );
}
