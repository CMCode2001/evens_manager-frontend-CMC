// src/pages/Likes.js
import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';

import "../../css/styleDashbord.css"
import PrimarySearchAppBar from './PrimarySearchAppBar';


const Like = () => {
    
    const tabClient = ({ clientName, clientProfileImage, rating }) => {
      return (
        <div>
            
        <PrimarySearchAppBar />
        <div className="flex items-center space-x-4 p-4 border-b border-gray-300">
          {/* Photo de profil arrondie */}
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={clientProfileImage}
            alt={`Profil de ${clientName}`}
          />
    
          <div className="flex-grow">
            {/* Nom du client */}
            <p className="text-lg font-semibold">{clientName}</p>
    
            {/* Notation avec des étoiles */}
            <div className="flex items-center">
              {renderStars(rating)}
            </div>
          </div>
        </div>
        </div>
      );
    };
    
    // Fonction utilitaire pour rendre les étoiles en fonction de la note
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <svg
            key={i}
            className={`w-6 h-6 fill-current ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            viewBox="0 0 24 24"
          >
            <StarIcon/>
          </svg>
        );
      }
      return stars;
    };
    
    tabClient.propTypes = {
      clientName: PropTypes.string.isRequired,
      clientProfileImage: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    };
    
   
    
}

export default Like;
