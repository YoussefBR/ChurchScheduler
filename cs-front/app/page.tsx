'use client'

// import { useEffect } from 'react'
// import Image from 'next/image'

import LandingPage from '@/components/custom/LandingPage'

export default function Home() {
  return <LandingPage />
}

// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import Image from "next/image";

// import { SignInForm } from "@/components/custom/SignInForm";

// // Temp values
// let isAuthenticated = true;
// let isAbouna = true;

// export default function LandingPage() {
//   const router = useRouter();

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push("/home");
//     }
//   }, [router]);

//   return <SignInForm></SignInForm>;
// }
