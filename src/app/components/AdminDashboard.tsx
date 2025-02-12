import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react';

const IMAGE_VARIANTS = {
  SQUARE: { label: "Square (1:1)", aspectRatio: "1:1" },
  WIDE: { label: "Wide (16:9)", aspectRatio: "16:9" },
  PORTRAIT: { label: "Portrait (3:4)", aspectRatio: "3:4" },
};

const LICENSE_TYPES = [
  { value: "PERSONAL", label: "Personal" },
  { value: "COMMERCIAL", label: "Commercial" },
];
const AdminDashboard = () => {
const [variants, setVariants] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
    <form className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="space-y-4">
        <div>
          <Label>Product name</Label>
          <Input type="text" className="w-full" />
        </div>

        <div>
          <Label>Product Description</Label>
          <textarea 
            className="w-full min-h-[100px] p-2 border rounded-md" 
          />
        </div>

        <div>
          <Label>Product Image</Label>
          <input type="file" />
        </div>

        {/* Image Variants Card */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Image Variants</h2>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Aspect Ratio</Label>
                <select className="w-full p-2 border rounded-md">
                  {Object.entries(IMAGE_VARIANTS).map(([key, variant]) => (
                    <option key={key} value={key}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>License Type</Label>
                <select className="w-full p-2 border rounded-md">
                  {LICENSE_TYPES.map((license) => (
                    <option key={license.value} value={license.value}>
                      {license.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Price</Label>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="Enter price" 
                  className="w-full" 
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                // Add variant logic here
              }}
            >
              Add Variant
            </button>
          </div>
        </div>
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
