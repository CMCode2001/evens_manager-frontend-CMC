import React from 'react';
import BlockCard2 from './BlockCard2';
import bilan from "../../assets/img/besTakk/bilan.png"
import solde from "../../assets/img/besTakk/money-bag.png"
import contact from "../../assets/img/besTakk/customer-service.png"
import MonSeparateur from "./MonSeparateur"


const MainContentDashbord = () => {
    return (
        
            <>
                        
                    <div className="content-container">
                        <div id='topoulen-ma' >
                            <BlockCard2
                                imageSrc={bilan}
                                title="Prestations"
                                description="5 réussis"
                            />
                            <br/>

                            <BlockCard2
                                imageSrc={solde}
                                title="Tarif Actuel"
                                description="54.600 Fcfa"
                            />
                            <br/>
                            
                            <BlockCard2
                                imageSrc={contact}
                                title="Contact "
                                description="8 en attentes"
                            />
                        </div>
                        <MonSeparateur/>
                        
                    </div>
               
            </>
            
        
        

       
    );
}

export default MainContentDashbord;
