import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { ActiveAutomation } from '@/icons/active-automation'
import { useQueryAutomation } from '@/hooks/use-query-automation'
import { useMutationData } from '@/hooks/use-mutation-data'
import { activateAutomation } from '@/action/automations'

type Props = {
    id: string
}

const ActivateAutomationButton = ({id}: Props) => {
  
    const {data} = useQueryAutomation(id)
    const {mutate, isPending} = useMutationData(['activate'], (data:{state: boolean})=> activateAutomation(id,data.state), 'automation-info')
    
  return (
    //@ts-expect-error
    <Button onClick={()=> mutate({state: !data?.data?.active})} className='text-white bg-gradient-to-br hover:opacity-80 rounded-full lg:px-10 font-medium from-[#3352CC]  to-[#1C2D70] ml-4'>
        <Loader state={isPending}>
            <ActiveAutomation />
            {/* @ts-expect-error */}
            <p className='lg:inline hidden'>{data?.data?.active ? 'Disable': 'Activate' }</p>
        </Loader>
    </Button>
  )
}

export default ActivateAutomationButton