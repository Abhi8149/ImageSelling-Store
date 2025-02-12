"use client"
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// import { Session } from "next-auth";
// import { Session } from "inspector/promises";
const authenticator = async () => {
  try {
    const response = await fetch("api/imagekit-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    return response.json(); 
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={5*60}>
        <div className="App">
          <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
            {children}
          </ImageKitProvider>
        </div>
        </SessionProvider>
      );
}