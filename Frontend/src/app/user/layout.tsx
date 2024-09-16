'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SideBar from '@/components/SideBar/SideBar'
import { useAuth } from '@/components/Context/AuthContext'
import Loader from '@/components/Loader/Loader'

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated()) {
    return <Loader />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 p-0 overflow-y-auto h-full">
        {children}
      </div>
    </div>
  )
}

export default UserLayout