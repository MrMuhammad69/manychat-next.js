import DoubleGradientCard from "@/components/global/double-gradient-card"
import { DASHBOARD_CARDS } from "@/constants/dashboard"

type Props = {

}

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-10 ">
      <div className="flex gap-5 lg:flex-row flex-col ">
        {
          DASHBOARD_CARDS.map((card)=> <DoubleGradientCard key={card.id} {...card} />)
        }
      </div>
    </div>
  )
}

export default page