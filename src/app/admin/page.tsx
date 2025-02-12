"use client";
import React from 'react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { useState } from 'react';
import { MyProduct } from '@/models/Product';
import { useForm } from 'react-hook-form'; 
import axios from 'axios';
import Fileupload from '../components/Fileupload';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
const IMAGE_VARIANTS = {
    SQUARE: { label: "Square (1:1)", aspectRatio: "1:1" },
    WIDE: { label: "Wide (16:9)", aspectRatio: "16:9" },
    PORTRAIT: { label: "Portrait (3:4)", aspectRatio: "3:4" },
};

const LICENSE_TYPES = [
    { value: "PERSONAL", label: "Personal" },
    { value: "COMMERCIAL", label: "Commercial" },
];
interface Variant {
    image_varient: typeof IMAGE_VARIANTS;
    license_type: typeof LICENSE_TYPES;
    price: number;
}

type ProductFormData=Omit<MyProduct,"_id">
const AdminDashboard = () => {
    const [variant, setvariant] = useState<Variant[]>([{
        image_varient: IMAGE_VARIANTS,
        license_type: LICENSE_TYPES,
        price: 0
    }]);
    const {register,handleSubmit,setValue,formState:{errors,isSubmitting}}=useForm<ProductFormData>()
    const addVarient = () => {
        const newVarient: Variant = {
            image_varient: IMAGE_VARIANTS,
            license_type: LICENSE_TYPES,
            price: 0
        }
        setvariant([...variant, newVarient])
        // setValue('varients', variant)
    }
   const handleUploadSuccess=(response:IKUploadResponse)=>{
    console.log('file uploaded')
    setValue('imageUrl',response.filePath)
   }

    const onsubmit=(data:ProductFormData)=>{
        console.log(data)
        try {
            const response=axios.post('/api/product',data)
            console.log(response)
            toast.success('Product creating succefully')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-black p-8">
            <h1 className="text-3xl font-bold mb-6 text-white flex justify-center">Admin Dashboard</h1>
            <form  onSubmit={handleSubmit(onsubmit)}className="space-y-6 max-w-4xl mx-auto bg-black-100 p-6 rounded-lg shadow">
                <div className="space-y-4">
                    <div>
                        <Label className='text-lg'>Product name</Label>
                        <input type="text" {...register("name", { required: true},)} className="w-full h-8 text-white bg-gray-800 rounded-md " />
                        <p className='text-red-500'>{errors.name && 'Name of the product required'}</p>
                    </div>

                    <div>
                        <Label className='text-lg'>Product Description</Label>
                        <textarea 
                        {...register("description", { required: true })}
                            className="w-full min-h-[100px] p-2 border rounded-md text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                          <p className='text-red-500'>{errors.description && 'Name of the product required'}</p>
                    </div>

                    <div>
                        <Label className='text-lg'>Product Image</Label>
                        {/* <input  {...register('imageUrl',{required:true})} type="file" className='bg-gray-900 text-white w-full h-12' /> */}
                        <span  className='bg-gray-900 text-white w-full h-12' ><Fileupload OnSuccess={handleUploadSuccess}/></span>
                        <p className='text-red-500'>{errors.imageUrl && 'Name of the product required'}</p>
                    </div>
                    <div className="mt-6">
                        <h2 className="mx-auto text-lg font-semibold mb-4 text-white">Image Variants</h2>
                        <div className="bg-gray-900 p-4 rounded-lg border">
                            {variant.map((varient, index) => (

                                <div key={index} className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label>Aspect Ratio</Label>
                                        <select className="w-full p-2 border rounded-md bg-gray-700" {...register(`varients.${index}.type`)}>
                                            {Object.entries(IMAGE_VARIANTS).map(([key, variant]) => (
                                                <option key={key} value={key}>
                                                    {variant.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label>License Type</Label>
                                        <select className="w-full p-2 border rounded-md bg-gray-700" {...register(`varients.${index}.licenses`)}>
                                            {LICENSE_TYPES.map((license) => (
                                                <option key={license.value} value={license.value}>
                                                    {license.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label>Price in rupees</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter price"
                                            className="w-full"
                                            {...register(`varients.${index}.price`)}
                                        />
                                        {}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        onClick={addVarient}
                    >
                        Add Variant
                    </button>
                </div>
                

                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Create Product
                </button>

            </form>
        </div>
    )
}

export default AdminDashboard
