import Sidebar from '@/components/custom/Sidebar'
import React from 'react'


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Sidebar isAbouna={true} />
      {children}
    </div>
  )
}
