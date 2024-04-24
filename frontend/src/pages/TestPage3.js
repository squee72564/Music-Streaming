// TestPage3.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const TestPage3 = () => {
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== '/accounts/logout/') {
      window.location.href = '/accounts/logout/';
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>This is Test Page 3</h1>
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'purple',
          borderRadius: '50%',
          margin: '20px auto',
          cursor: 'pointer',
        }}
      ></div>
            <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'green',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          color: 'white',
          fontSize: '16px',
        }}
        onClick={handleClick}
      >
        Click Me
      </button>
    </div>
  );
};

export default TestPage3;
