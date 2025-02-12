"use client";
import { MyProduct } from '@/models/Product';
import axios from 'axios';
import { IKImage } from 'imagekitio-next'
import { useParams } from 'next/navigation'
import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IMAGE_VARIANTS } from '@/models/Product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const page = () => {
  const [product, setProduct] = useState<MyProduct>({
    name: '',
    description: '',
    imageUrl: '',
    varients: []
  })
  const {data:session}=useSession()
  const router=useRouter()
  const params = useParams()
  const id = params.id;
  useEffect(() => {
    const getselectedproduct = async () => {
      console.log(id)
      const response = await axios.get(`/api/product/${id}`)
      console.log(response.data)
      if (response.data.success === true) {
        setProduct(response.data.message)
      }
      else {
        toast.error(response.data.error)
      }
    }
    getselectedproduct()
  }, [])
   const handlepurchase=async(variant: any)=>{
    if(!session){
        toast.error('Please login first to purchase')
        router.push('/login')
        return
    }
    if(!product._id){
      toast.error('Invalid product')
      return
    }
    
    try {
      const response=await axios.post('/api/orders/',{
        productId:product._id,
        varient:variant
      })
      console.log(response.data)

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: "INR",
        name: "ImageKit Shop",
        description: `${product.name} - ${variant.type} Version`,
        order_id: response.data.orderId,
        handler: function () {
          toast.success("Payment successful!");
          router.push("/orders");
        },
        prefill: {
          email: session.user.email,
        },
      };

      const rzp=new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      toast.error('Error processing purchase')
      console.log(error)
    }

   }
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-800">
                <IKImage
                  urlEndpoint={process.env.urlEndpoint}
                  path={product.imageUrl.toString()}
                  alt={product.name.toString()}
                  loading="eager"
                  priority={true}
                  transformation={[
                    {
                      height: "1200",
                      width: "1200",
                      cropMode: "maintain_ratio",
                      focus: "center",
                      quality: "90",
                    },
                  ]}
                  className="object-cover w-full h-full transition-all duration-500 hover:scale-110"
                />
              </div>
            </div>
    
            {/* Product Details Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-start space-y-8 p-4">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
    
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white tracking-tight border-b border-gray-800 pb-4">
                  Available Versions
                </h2>
                <div className="space-y-4">
                  {product.varients.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-white">
                            {IMAGE_VARIANTS[item.type].label}
                          </h3>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span>{IMAGE_VARIANTS[item.type].dimensions.width} x {IMAGE_VARIANTS[item.type].dimensions.height}px</span>
                            <svg width="4" height="4" viewBox="0 0 24 24" className="text-gray-600">
                              <circle cx="12" cy="12" r="4" fill="currentColor" />
                            </svg>
                            <span className="capitalize">{item.licenses.toLowerCase()} license</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className="text-2xl font-light text-white">₹{item.price}</span>
                          <button 
                            onClick={() => handlepurchase(item)}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg
                            hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default page
