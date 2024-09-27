
import { UserDashboard } from '@/components/UserView/UserDashboard'

import { AbounaDashboard } from '@/components/AbounaView/AbounaDashboard'

import React from 'react'
import { TestCalendar } from '@/components/AbounaView/TestCalendar'

let isAbouna = true

export default function page() {
  if (isAbouna) {
    // return <AbounaDashboard />
    return <TestCalendar />
  } else {
    return <UserDashboard />
  }
}
