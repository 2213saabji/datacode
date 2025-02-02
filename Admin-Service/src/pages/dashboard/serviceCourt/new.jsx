/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React from 'react';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

const App = () => {
  const handleClick = () => {
    window.open(
      'https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=ebd500a689f99d6c5d58a1c12975ea69a5a27ee4da4effd2511c8d9106357df5',
      '_blank'
    );
  };

  const cardStyle = {
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    width: '300px',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '8px',
  };

  const titleStyle = {
    margin: '0 0 8px 0',
    fontSize: '1.5em',
    color: '#333',
  };

  const descriptionStyle = {
    margin: '0',
    color: '#555',
  };

  return (
    <>
    <Button
    component={RouterLink}
    to="/dashboard"
    variant="outlined"
    color="primary"
    style={{ textDecoration: 'none', width: '150px', padding: '3px 5px',margin:'9px' }}
  >
    Back
  </Button>
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        width: '50vh',
        backgroundColor: '#f4f4f4',
        borderRadius: '25px',
      }}
    >
     
      <div
        style={cardStyle}
        onClick={handleClick}
        onMouseEnter={(e) => (e.currentTarget.style = cardHoverStyle)}
        onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMr9YJNiP4ujwSlpFdlV65jNsi4OOMKjrRkw&s" // Replace with your image URL
          alt="Card"
          style={imageStyle}
        />
        <h2 style={titleStyle}>Court Service</h2>
        <p style={descriptionStyle}> See All Tupe Case Status.</p>
      </div>
    </div>
    </>
  );
};

export default App;
