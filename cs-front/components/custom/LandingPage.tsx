"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0b0b]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-white text-xl font-bold">Meet Abouna</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-white hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Image
                src="/spsd.png"
                alt="St. Philopater & St. Demiana Coptic Orthodox Church Logo"
                width={400}
                height={400}
                className="rounded-full"
              />
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Meet Abouna
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Connect with your spiritual guide and community through our
                  scheduling platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  className="bg-background text-black"
                  onClick={() => {
                    window.location.href = "/sign-in";
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-background text-black hover:bg-slate-500"
                  onClick={() => {
                    window.location.href = "/sign-up";
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
