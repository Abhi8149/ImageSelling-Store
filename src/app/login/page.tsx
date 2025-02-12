"use client";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const loginpage = () => {
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [isSubmitting, setisSubmitting] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    setisSubmitting(true)
    console.log(email,password)
    try {
      const response=await signIn('credentials',{redirect:false,email,password})
      console.log(response)
      if(response?.error){
        toast.error(response.error)
      }
      if(response?.url){
        router.replace('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in logging in please try again later', { duration: 3000 });
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
          {isSubmitting ? (
            <div className="flex justify-center items-center h-10">
              <Loader2 className="animate-spin text-white" />
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
<div className="text-center mt-4 flex justify-center items-center">
  <p className="text-gray-300">
    Don't have an account?{" "}
    <Link 
      href="/register" 
      className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors"
    >
      Sign up
    </Link>
  </p>
</div>
          <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default loginpage
