'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export default function DarkNeutralAbounaSignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 mx-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Abouna Sign Up</h2>
        <p className="text-gray-300 text-center mb-8">Join our community of Abounas</p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">Name</Label>
            <div className="relative">
              <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                id="name" 
                placeholder="Abouna John Doe" 
                required 
                className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <div className="relative">
              <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="abouna@example.com" 
                required 
                className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200">Username</Label>
            <div className="relative">
              <Icons.atSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                id="username" 
                placeholder="abounajohn" 
                required 
                className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <div className="relative">
              <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                id="password" 
                type="password" 
                required 
                className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <Button 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105"
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}