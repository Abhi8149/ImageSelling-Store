import { dbconnect } from "@/lib/dbconnect";
import User from "@/models/Usermodel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions={
    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
            email: { label: "email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials:any):Promise<any> {
            console.log(credentials?.email,credentials?.password)
            if(!credentials?.email || !credentials?.password){
                throw new Error('Missing Email or Password');
            }
            await dbconnect();
            try {
                const user = await User.findOne({email:credentials.email})
                console.log(user)
                if(!user){
                    throw new Error('User not found');
                }
                const isValid=await bcrypt.compare(credentials.password,user.password)

                if(!isValid){
                    throw new Error('Invalid password');
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role
                }
            } catch (error) {
                console.log(error)
                throw error
            }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }:any) {
            if(user){
                token.id=user.id
                token.role=user.role
                token.email=user.email
            }
            return token
        },
        async session({ session, token}:any) {
           if(session.user){
                session.user.role=token.role
                session.user.id=token.id
                session.user.email=token.email     
           }
           return session;
        }
    },
    pages: {
        signIn:'/login',
        error:'/login'
    },
    session:{
        strategy:'jwt',
        maxAge:30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET ,
}

export default NextAuth(authOptions)
