import React from 'react'
import SideBar from '@/components/global/sliderbar'
import NavBar from '@/components/global/Navbar'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchUserAutomations, PrefetchUserProfile } from '@/react-query/prefetch'
type Props = {
    children: React.ReactNode
    params: {slug: string}
}

const layout = async ({children, params}: Props) => {
  const query = new QueryClient()
  await PrefetchUserProfile(query)
  await prefetchUserAutomations(query)

  return ( 
    <HydrationBoundary state={dehydrate(query)}>
    <div className='p-3'>
        {/* siderBar */}
        <SideBar slug={params.slug} />
        {/* NavBar */}
        <div
          className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
        >
          <NavBar slug={params.slug.toString()} />
          {children}
        </div>
        </div>
        </HydrationBoundary>
  )
}

export default layout