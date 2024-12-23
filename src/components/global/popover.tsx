import React from 'react'
import { Popover,PopoverAnchor,PopoverContent,PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'

type Props = {
    trigger: JSX.Element
    children: React.ReactNode
    className?: string
}

const PopOver = ({children,trigger,className}: Props) => {
  return (
    <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className={cn('bg-[#1d1d1d] shadow-lg', className)} align='end' side='bottom'>
            {children}
        </PopoverContent>
    </Popover>
  )
}

export default PopOver