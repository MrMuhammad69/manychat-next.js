import AutomationBreadCrumbs from '@/components/global/automation-bread-crumbs'
import Trigger from '@/components/global/trigger'
import { Warning } from '@/icons'
import React from 'react'

type Props = {
    params: {id: string}

}
// WIP: Set some metadata stuff boy.
const page = ({params}: Props) => {

    //WIP: prefect user automation data bases on props 
  return (
    <div className='flex flex-col items-center gap-y-20'>
        <AutomationBreadCrumbs id={params.id} />
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3'>
      <div className="flex gap-x-2">
        <Warning />
        When...
        </div>
        <Trigger id={params.id} />
        </div>
    </div>
  )
}

export default page