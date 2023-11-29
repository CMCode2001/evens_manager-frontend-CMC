import React from 'react';
import "../../css/styleDashbord.css"
import SidebarDashBord from './SidebarDashbord';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import Block1 from "./Block1"


const ProfileDashbord = () => {
    return (
        <div>
        <PrimarySearchAppBar/>
            <div className="dashboard-container">
                <SidebarDashBord />
                    <div className="content-container">
                        <br/>
                        <h1 id="special1"> My Account </h1>
                        <br/>
                    <div id='topou-ma'>
                        <Block1 />
                    </div>
                
                </div>
            </div>
       
    </div>
    );
}

export default ProfileDashbord;
