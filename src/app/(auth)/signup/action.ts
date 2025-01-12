"use server";
import { signIn } from "@/auth";
import { prisma } from "@/utils/db";
import bcrypt from "bcrypt";
import { AuthError, CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function SignUp(e: FormData) {
  const email = e.get("email") as string;
  const password = e.get("password") as string;
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }


  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) return { error: "User Aleady exists" };


  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const data = await prisma.user.create({ data: { email, password: hashedPassword } });
    
    await signIn("credentials", {email,password,redirectTo:"/"});
    
  } catch (error) {
    if(isRedirectError(error)) throw error
    return { success: false, error: error};
  }

}
