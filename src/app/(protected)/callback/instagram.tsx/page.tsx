import { onIntegrate } from '@/action/integrations'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {searchParams: {code: string}}

const Page = async ({searchParams: {code}}: Props) => {
    if(code){
        console.log(code)
        const user = await onIntegrate(code.split('#_')[0])

        //@ts-expect-error
        if(user?.status === 200) return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`)

    }
  return redirect('/sign-in')
}

export default Page