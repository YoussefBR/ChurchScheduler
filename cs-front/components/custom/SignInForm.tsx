'use client'; // Add this line at the top
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
//import { useRouter } from 'next/router'; // Import useRouter

export default function SignInForm() {
  // const router = useRouter(); // Initialize router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission

    const credentials = btoa(`${email}:${password}`); // Base64 encode credentials
    console.log("email " + email);
    console.log("passwiord " + password);
    try {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Comment out the Authorization header if not needed
      // myHeaders.append("Authorization", `Basic ${credentials}`);

      const raw = JSON.stringify({
        email, // shorthand for { email: email }
        password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        //redirect: "follow", // Ensure this is one of the accepted types
      };

      const response = await fetch('http://localhost:5192/api/auth/login', requestOptions);

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Login successful!");
        // Handle successful login (e.g., redirect or store token)
        //useRouter().push('/home'); // Redirect to dashboard
        window.location.href = "http://localhost:3000/home";
        console.log(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.title || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred while trying to log in.');
      console.error("Login error:", error); // Log any other errors
    }
  };

  return (
    <div className="h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleLogin}> {/* Added form element */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email} // Bind input value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password} // Bind input value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center bg-muted lg:flex">
        <Image
          src="/stphilo.webp"
          alt="Image"
          width="500"
          height="500"
          className="object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
