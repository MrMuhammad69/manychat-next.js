import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { ActiveAutomation } from '@/icons/active-automation'

type Props = {
    id: string
}

const ActivateAutomationButton = ({id}: Props) => {
    // WIP: Setup Optimist UI
  return (
    <Button className='text-white bg-gradient-to-br hover:opacity-80 rounded-full lg:px-10 font-medium from-[#3352CC]  to-[#1C2D70] ml-4'>
        <Loader state={false}>
            <ActiveAutomation />
            <p className='lg:inline hidden '></p>
        </Loader>
    </Button>
  )
}

export default ActivateAutomationButton