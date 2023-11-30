import React from 'react';

const BlockCard2 = ({ imageSrc, title, description }) => {
  return (
    <div className="card">
      <img className="card-image" src={imageSrc} alt="Card" />
      <div className="card-content">
        <h1 className="card-title">{title}</h1>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default BlockCard2;
