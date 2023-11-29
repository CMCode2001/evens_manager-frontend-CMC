import React from 'react'
import PrimarySearchAppBar from './PrimarySearchAppBar'
import SidebarDashBord from './SidebarDashbord'
import MainContentDashbord from './MainContentDashBord'

function HomeDashBord () {
  return (
    <div> 
        <PrimarySearchAppBar/>
            <div className="dashboard-container">
                <SidebarDashBord />
        <div className="content-container">
        <br/>
            <h1 id="special1"> HomeDashBord </h1>
        <br/>

            <MainContentDashbord /> 
        </div>
    </div>
</div>

  )
}

export default HomeDashBord