import AbounaSidebar from '@/components/AbounaView/AbounaSidebar'
import React from 'react'

const isAbouna = true

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {isAbouna && <AbounaSidebar />}
      {children}
    </div>
  )
}
