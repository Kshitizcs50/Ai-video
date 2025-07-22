import React from 'react'
import Header from './_components/Header'


function Dashboardlayout({children}) {
  return (
    <div>
        <div>
           <Header/> 
           {children}
        </div>
    </div>
  )
}

export default Dashboardlayout