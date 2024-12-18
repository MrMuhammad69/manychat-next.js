'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { usePaths } from '@/hooks/user-nav'
import { LogoSmall } from '@/svgs/logo-small'
import React from 'react'
import Items from './items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import SubscriptionPlan from '../subscription-plan'
import UpgradeCard from './upgrage'

type Props = {
  slug: string
}

const Sidebar = ({ slug }: Props) => {
  const { page } = usePaths()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 rounded-md bg-[#171717] shadow-md text-white"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 lg:inline-block
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300
          w-[250px] 
          border-[1px]
          radial
          border-[#545454] 
          bg-gradient-to-b from-[#768BDD] 
          via-[#171717] 
          to-[#768BDD]
          m-3 rounded-3xl overflow-hidden`}
      >
        <div
          className="flex flex-col 
          gap-y-5
          w-full 
          h-full 
          p-3 
          bg-[#0e0e0e] 
          bg-opacity-90 
          bg-clip-padding 
          backdrop-filter 
          backdrop--blur__safari 
          backdrop-blur-3xl"
        >
          <div className="flex gap-x-2 items-center p-5 justify-center">
            <LogoSmall />
          </div>
          <div className="flex flex-col py-3">
            <Items
              page={page}
              slug={slug}
            />
          </div>
          <div className="px-16">
            <Separator
              orientation="horizontal"
              className="bg-[#333336]"
            />
          </div>
          <div className="px-3 flex flex-col gap-y-5">
            <div className="flex gap-x-2">
              <ClerkAuthState />
              <p className="text-[#9B9CA0]">Profile</p>
            </div>
            <div className="flex gap-x-3">
              <HelpDuoToneWhite />
              <p className="text-[#9B9CA0]">Help</p>
            </div>
          </div>
          <SubscriptionPlan type="FREE">
            <div className="flex-1 flex flex-col justify-end">
              <UpgradeCard />
            </div>
          </SubscriptionPlan>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}

export default Sidebar
