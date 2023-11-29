import "../../css/styleDashbord.css"
import React from 'react';
import MyEvents from "../MyEvents";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SidebarDashBord from "./SidebarDashbord";

const ServicePrestation = () => {
    return (
        <div>
            <PrimarySearchAppBar/>
                <div className="dashboard-container">
                    <SidebarDashBord />
                        <div className="content-container">
                            <br/>
                            <h1 id="special1"> Mes Prestations </h1>
                            <br/>
                        <MyEvents />
                    </div>
                </div>
           
        </div>
    );
}

export default ServicePrestation;
