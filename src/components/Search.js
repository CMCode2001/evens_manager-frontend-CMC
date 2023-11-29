import { React, useState } from 'react';
import "../css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import '../css/style2.css';

const Search = (props) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleSearch = () => {
      props.onSearch(query);
    };
  
    return (
        <div>
            <center>
                <div className="display">
                    <Form.Label className='search-label' htmlFor="inputPassword5">Recherche</Form.Label>
                    <Form.Control
                        type="text"
                        className='search'
                        placeholder="Recherche de prestataire"
                        value={query}
                        onChange={handleChange}
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        <FaSearch className='icon-search'/> 
                    </button> 
                </div>   
            </center>
        </div>
      );
};

export default Search;