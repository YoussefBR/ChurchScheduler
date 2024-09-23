import { AbounaDashboard } from '@/components/AbounaView/AbounaDashboard'
import React from 'react'

let isAbouna = true

export default function page() {
  if (isAbouna) {
    return <AbounaDashboard />
  } else {
    return <div></div>
  }
}
