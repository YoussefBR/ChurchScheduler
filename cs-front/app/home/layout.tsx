import Sidebar from '@/components/custom/Sidebar'
import React from 'react'

const isAbouna = true

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Sidebar isAbouna={false} />
      {children}
    </div>
  )
}
