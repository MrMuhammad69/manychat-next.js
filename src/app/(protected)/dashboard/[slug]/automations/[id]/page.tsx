import { getAutomationsInfo } from '@/action/automations'
import AutomationBreadCrumbs from '@/components/global/automation-bread-crumbs'
import PostNode from '@/components/global/post-node'
import ThenNode from '@/components/global/then-node'
import Trigger from '@/components/global/trigger'
import { Warning } from '@/icons' 
import { prefetchUserAutomation } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: {id: string}

}

export async function generateMetadata({params}: Props) {
  const info = await getAutomationsInfo(params.id)
  return {
    //@ts-expect-error
    title: info?.data?.name,
  }
}
const page = async ({params}: Props) => {
  const query = new QueryClient()
  await prefetchUserAutomation(query,params.id)
  return (
    <HydrationBoundary state={dehydrate(query)}>
    <div className='flex flex-col items-center gap-y-20'>
        <AutomationBreadCrumbs id={params.id} />
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3'>
      <div className="flex gap-x-2">
        <Warning />
        When...
        </div>
        <Trigger id={params.id} />
        <ThenNode id={params.id} />
        <PostNode id={params.id} />
        </div>
    </div>
    </HydrationBoundary>
  )
}

export default page