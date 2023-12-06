import React from 'react';
import "../../css/styleDashbord.css"; // Assurez-vous d'avoir un fichier CSS séparé pour les styles

const MonSeparateur = () => {
  return (
    <div className="separator">
      <span className="line"></span>
      <div className="shadow"></div>
    </div>
  );
};

export default MonSeparateur;
