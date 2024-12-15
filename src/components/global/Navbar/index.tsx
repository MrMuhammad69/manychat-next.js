'use client'
import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
import { usePaths } from '@/hooks/user-nav'
import React from 'react'
import Sheet from '../sheet'
import { Menu } from 'lucide-react'
import Items from '../sliderbar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import SubscriptionPlan from '../subscription-plan'
import UpgradeCard from '../sliderbar/upgrage'
import { LogoSmall } from '@/svgs/logo-small'
import CreateAutomation from '../create-automation'
import Search from '../search'
import Notifications from '../notifications'
import MainBreadCrumbs from '../main-bread-crumb'

type Props = {
    slug: string
}

const NavBar = ({slug}: Props) => {
    const {page} = usePaths()
    const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug 

  return currentPage && <div className='flex flex-col'>
    <div className='flex gap-x-3 lg:gap-x-5 justify-end'>
        <span className='lg:hidden flex items-center flex-1 gap-x-2'>
        <Sheet trigger={<Menu />} classname='lg:hidden'>
        <div className="flex flex-col 
      gap-y-5
       w-full 
       h-full 
       p-3 
       bg-[#0e0e0e] 
       bg-opacity-90 
       bg-clip-padding 
       backdrop-filter 
       backdrop--blur__safari 
       backdrop-blur-3xl">
        <div className='flex gap-x-2 items-center p-5 justify-center'>
          <LogoSmall />
          </div> 
          <div className='flex flex-col py-3'>
            <Items page={page} slug={slug} />
          </div>
          <div className='px-16'>
            <Separator orientation='horizontal' className='bg-[#333336]'  />
          </div>
          <div className='px-3 flex flex-col gap-y-5'>
            <div className='flex gap-x-2'>
              <ClerkAuthState />
              <p className='text-[#9B9Ca0]'>Profile</p>
            </div>
            <div className='flex gap-x-3'>
              <HelpDuoToneWhite />
              <p className='text-[#9B9Ca0]'>Help</p>
            </div>
          </div>
          <SubscriptionPlan type='FREE'>
            <div className='flex-1 flex flex-col justify-end'>
              <UpgradeCard />
            </div>
          </SubscriptionPlan>
      </div>
        </Sheet>
        </span>
        <Search />
        <CreateAutomation />
        <Notifications />
        

    </div>
    <MainBreadCrumbs page={page===slug?'home': page} slug={slug} />
  </div>
}

export default NavBar