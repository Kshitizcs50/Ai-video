'use client';
//import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
//import Image from "next/image";

export default function Home() {
  return (
    <div >
  
      kkjk
      <SignedIn><UserButton/></SignedIn>
       <UserButton/>
       <UserButton/>
    </div>
  );
}
