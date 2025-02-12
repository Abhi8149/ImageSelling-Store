"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IOrder } from '@/models/Orders'
import { Loader2, Download, Calendar, Image as ImageIcon} from "lucide-react";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";
import axios from "axios";
import { IconLicense } from "@tabler/icons-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/user/')
        console.log(response.data)
        setOrders(response.data.order);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchOrders();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-black">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-white">My Orders</h1>
        <div className="space-y-6">
          {orders.map((order) => {
            const variantDimensions = IMAGE_VARIANTS[
              order.varient.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
            ].dimensions;

            const product = order.productId as any;

            return (
              <div
                key={order._id?.toString()}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Preview Image */}
                    <div
                      className="relative rounded-xl overflow-hidden bg-gray-900 ring-1 ring-gray-700 shadow-xl group"
                      style={{
                        width: "300px",
                        aspectRatio: `${variantDimensions.width} / ${variantDimensions.height}`,
                      }}
                    >
                      <IKImage
                        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                        path={product.imageUrl}
                        alt={`Order ${order._id?.toString().slice(-6)}`}
                        transformation={[
                          {
                            quality: "60",
                            width: variantDimensions.width.toString(),
                            height: variantDimensions.height.toString(),
                            cropMode: "extract",
                            focus: "center",
                          },
                        ]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-2xl font-bold text-white">
                            Order #{order._id?.toString().slice(-6)}
                          </h2>
                          <span
                            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                              order.status === "COMPLETED"
                                ? "bg-green-500/20 text-green-400"
                                : order.status === "CANCELLED"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                            <span>
                              {variantDimensions.width} x {variantDimensions.height}px
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconLicense className="w-5 h-5 text-gray-400" />
                            <span className="capitalize">{order.varient.licenses} License</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-6">
                        <p className="text-3xl font-light text-white">
                          ₹{order.amount.toFixed(2)}
                        </p>
                        {order.status === "PENDING" && (
                          <a
                            href={`${process.env.NEXT_PUBLIC_URL_ENDPOINT}/tr:q-100,w-${variantDimensions.width},h-${variantDimensions.height},cm-extract,fo-center/${product.imageUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg
                              hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300
                              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            download={`image-${order._id?.toString().slice(-6)}.jpg`}
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download High Quality
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-400">Start exploring our collection and make your first purchase!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
