'use client'

import { useState } from 'react'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)


  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const newAbouna = JSON.stringify({
      AbounaId: "", // Must be a unique identifier
      FirstName: formData.get("firstName"),
      LastName: formData.get("lastName"),
      Username: formData.get("username"),
      Password: formData.get("password"),
      PasswordSalt: "",
      Email: formData.get("email"),
      Availability: ""
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: newAbouna
    };

    try {
      const response = await fetch("http://localhost:5192/api/abouna/create", requestOptions);

      if (!response.ok) {
        const errorResponse = await response.json(); // Get detailed error response
        throw new Error('Failed to create Abouna: ' + JSON.stringify(errorResponse.errors));
      }

      const data = await response.json();
      alert('Abouna created successfully!');
      window.location.href = "http://localhost:3000";
      console.log(data);
    } catch (error) {
      console.error(error);
      //setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 mx-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Abouna Sign Up</h2>
        <p className="text-gray-300 text-center mb-8">Join our community of Abounas</p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-gray-200 block">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                required
                className="w-full pl-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-gray-200 block">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                required
                className="w-full pl-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-200 block">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="abouna@example.com"
              required
              className="w-full pl-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-gray-200 block">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="abounajohn"
              required
              className="w-full pl-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-gray-200 block">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full pl-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 rounded-md"
            />
          </div>
          <button
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}