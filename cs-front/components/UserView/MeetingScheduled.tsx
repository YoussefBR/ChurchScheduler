'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GenericMeetingScheduledProps {
  onDismiss: () => void
}

export default function GenericMeetingScheduled({ onDismiss }: GenericMeetingScheduledProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  const handleDismiss = () => {
    // Redirect to the home page
    window.location.href = "http://localhost:3000/home";
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-green-500 p-6 text-white">
          <div className="flex justify-between items-start">
            <CheckCircle className="h-12 w-12" />
            <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-white hover:text-green-100">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold mt-4">Meeting Scheduled</h2>
          <p className="text-green-100">Your meeting has been successfully scheduled.</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-lg mb-4">
            Thank you for scheduling your meeting.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive an email confirmation with all the necessary information.
          </p>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <Button variant="outline" className="w-full" onClick={handleDismiss}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
