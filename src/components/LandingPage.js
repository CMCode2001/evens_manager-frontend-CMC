import React from 'react'
import SidebarDashbord from './Dashbord/SidebarDashbord';
import MainContentDashBord from './Dashbord/MainContentDashBord';
import PrimarySearchAppBar from './Dashbord/PrimarySearchAppBar';
function LandingPage () {
  return (
        
            <div>
                <PrimarySearchAppBar/>
                   <div className="dashboard-container">
                        <SidebarDashbord />
                    <div className="content-container">
                        <MainContentDashBord /> 
                    </div>
                </div>
            </div>
       
  )
}

export default LandingPage;