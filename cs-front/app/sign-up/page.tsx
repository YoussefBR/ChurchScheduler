import { SignUpForm } from '@/components/custom/SignUpForm'
import React from 'react'

export default function SignUp() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-8 text-5xl font-semibold'>Sign Up Below</h1>
      <SignUpForm />
    </div>
  )
}
