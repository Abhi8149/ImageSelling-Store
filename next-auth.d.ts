import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role: string;
            email:string;
        };
    }

    interface User {
        role:string
    }
}