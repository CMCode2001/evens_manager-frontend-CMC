import { React, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Search from '../components/Search';
import ListPrestataire from '../components/ListPrestataire';
//const [searchResults, setSearchResults] = useState([]);

const handleSearch = (query) => {
  // Ici, vous pouvez effectuer la recherche en fonction de la query
  // et mettre à jour les résultats dans l'état local (searchResults).
  // Cela dépendra de la manière dont vous récupérez les résultats de la recherche.
  // Pour l'instant, nous allons simplement mettre à jour l'état local avec une chaîne statique.
  //setSearchResults([`Résultats de recherche pour : ${query}`]);
};

const Prestataires = () => {
    return (
        <div>
            <Navbar /> 
            <Search />
            <ListPrestataire />
            <Footer />           
        </div>
    );
};

export default Prestataires;