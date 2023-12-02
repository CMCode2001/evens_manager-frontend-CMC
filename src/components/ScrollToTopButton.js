import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ajoutez un écouteur d'événements pour suivre le défilement de la page
    const handleScroll = () => {
      const yOffset = window.pageYOffset;

      // Affichez le bouton lorsque le défilement est supérieur à une certaine valeur (par exemple 100 pixels)
      setIsVisible(yOffset > 100);
    };

    // Ajoutez l'écouteur d'événements au montage du composant
    window.addEventListener('scroll', handleScroll);

    // Nettoyez l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Remonte la page lorsqu'on clique sur le bouton
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Link to="/" className="btn btn-md-square btn-primary rounded-circle back-to-top" onClick={scrollToTop}>
          <i className="fa fa-arrow-up"></i>
        </Link>
      )}
    </>
  );
};

export default ScrollToTopButton;
