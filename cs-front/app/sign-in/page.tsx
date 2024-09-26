'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SignInForm from '@/components/custom/SignInForm'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Temp values
let isAuthenticated = false

export default function SignIn() {
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/home'
    }
  }, [])

  return <SignInForm />
}
