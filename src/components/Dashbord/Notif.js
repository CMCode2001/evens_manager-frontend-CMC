import React from 'react'
import SidebarDashbord from './SidebarDashbord';
// import MainContentDashBord from './MainContentDashBord';
import PrimarySearchAppBar from './PrimarySearchAppBar';

const Notif = () =>  {
  return (
        
            <div>
                <PrimarySearchAppBar/>
                   <div className="dashboard-container">
                        <SidebarDashbord />
                    <div className="content-container">
                    <br/>
                        <h1 id="special1"> Mes Notifications </h1>
                    <br/>

                        
                    </div>
                </div>
            </div>
       
  )
}

export default Notif;