import { Sheet as BigSheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    classname?: string
}

const Sheet = ({children,trigger,classname}: Props) => {
  return <BigSheet>
    <SheetTrigger className={classname}>
        {trigger}
    </SheetTrigger>
    <SheetContent side={'left'}>{children}</SheetContent>
  </BigSheet>
}

export default Sheet