import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import React from 'react'
import Loader from '../loader'
import { CreditCardIcon, Loader2 } from 'lucide-react'

type Props = {}

const PaymentButton = (props: Props) => {
  const {isProcessing,onSubscribe} = useSubscription()
  return (
    <Button disabled={isProcessing} onClick={onSubscribe} className='bg-gradient-to-br text-white rounded-full from-[#9685DB] via-[#9434E6] to-[#CC3BD4]'>
        {isProcessing ? <Loader2 className='animate-spin' /> : <CreditCardIcon />} 
        Upgrade
    </Button>
  )
}

export default PaymentButton