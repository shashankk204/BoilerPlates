"use client"
import { auth, signIn } from "@/auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default  function Home() {
  // console.log(data)
  // console.log('hello')
  const {data,status,update}=useSession();

  if(status==="loading") return<>loading...</>
  if(!data) redirect('/signup');
  console.log(data);
  return (
    <>
    hello
    </>
  );
}
