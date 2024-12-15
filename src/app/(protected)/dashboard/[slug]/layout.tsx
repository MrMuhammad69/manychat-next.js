import React from 'react'
import SideBar from '@/components/global/sliderbar'
import NavBar from '@/components/global/Navbar'
type Props = {
    children: React.ReactNode
    params: {slug: string}
}

const layout = ({children, params}: Props) => {


    // Query client (using react Query)
  return (
    <div className='p-3'>
        {/* siderBar */}
        <SideBar slug={params.slug} />
        {/* NavBar */}
        <div
          className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
        >
          <NavBar slug={params.slug.toString()} />
          {children}
        </div>
        </div>
  )
}

export default layout