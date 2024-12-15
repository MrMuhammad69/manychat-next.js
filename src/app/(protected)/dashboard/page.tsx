import { onBoardUser } from '@/action/user'
import { redirect } from 'next/navigation'

type Props = {}

const Page =  async (props: Props) => {
    const user = await onBoardUser()
    console.log(user)
    if(user?.status ===200 || user?.status === 201) return redirect(`dashboard/${user.data?.firstname}${user.data?.lastname}`)
    return redirect('/sign-in')
}

export default Page