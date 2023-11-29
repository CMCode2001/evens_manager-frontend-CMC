import React from 'react';
import Like from './Like'; // Assurez-vous d'ajuster le chemin selon votre structure de fichiers
import animateur from "../../assets/img/animateur.jpg";
import artiste from "../../assets/img/artiste.jpg"

import PrimarySearchAppBar from './PrimarySearchAppBar';
import SidebarDashBord from './SidebarDashbord';
const ClientLike = () => {
  // Exemple de données
  const tabClient = [
    { clientName: 'CMC', clientProfileImage: {artiste}, rating: 4 },
    { clientName: 'DIAGNE', clientProfileImage: {animateur}, rating: 5 },
    // Ajoutez d'autres données de notation ici
  ];

  return (
    <div>
        <PrimarySearchAppBar/>
            <div className="dashboard-container">
                <SidebarDashBord />
                  <div className="content-container">

                    <h2 className="text-2xl font-semibold mb-4">Évaluations des vendeurs</h2>
                    {tabClient.map((data, index) => (
                      <Like
                        key={index}
                        clientName={data.clientName}
                        clientProfileImage={data.clientProfileImage}
                        rating={data.rating}
                      />
      ))}
      </div>
    </div>
    </div>
  );
};

export default ClientLike;
