import { UserDashboard } from '@/components/UserView/UserDashboard'
import { AbounaDashboard } from '@/components/AbounaView/AbounaDashboard'
import React from 'react'

let isAbouna = false

export default function page() {
  if (isAbouna) {
    return <AbounaDashboard />
  } else {
    return <UserDashboard />
  }
}
