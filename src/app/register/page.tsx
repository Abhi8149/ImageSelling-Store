"use client";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";
import { Loader } from "lucide-react";
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};



const registerpage = () => {
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [confirmpassword, setconfirmpassword] = useState<string>('')
  const [role, setRole] = useState('')
  const [isSubmitting, setisSubmitting] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    setisSubmitting(true)
    try {
      if (password !== confirmpassword) {
        console.log("Passwords do not match");
        return
      }
      const response = await axios.post('/api/auth/register', { email, password, role });
      console.log(response.data);

      if (response.data.success) {
        console.log("Registration successful");
        toast.success('Registration successful', { duration: 3000 });
        router.push('/login')
      }

      console.log('Failed to register the user')
      toast.error(response.data.message, { duration: 3000 });

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong please try again later', { duration: 3000 });
    }
    finally{
      setisSubmitting(false)}
  };
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-5 border-white">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to ImageBuyer shop
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please sign-up to continue
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" value={email} onChange={(e) => setemail(e.target.value)} required placeholder="projectmayhem@fc.com" type="email" />
          </div>
          <div className="space-y-4" >
            <Label htmlFor="password">Password</Label>
            <Input id="password" value={password} onChange={(e) => setpassword(e.target.value)} required placeholder="••••••••" type="password" />
          </div>
          <div className="space-y-4 mb-4" >
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} required placeholder="••••••••" type="password" />
          </div>
          <div className="space-y-4 mb-4" >
            <Label className="flex justify-center" htmlFor="role">Role</Label>
             <select className="w-full bg-red-500 p-2" onChange={(e) => setRole(e.target.value)} name="" id="">
              <option value="user">User</option>
               <option value="admin">Admin</option>
            </select>
          </div>




          {isSubmitting ? (
            <div className="flex justify-center items-center h-10">
              <Loader className="animate-spin text-white" />
            </div>
          ) : (
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
          )
          }


          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  )
}

export default registerpage
