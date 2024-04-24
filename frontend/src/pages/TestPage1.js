// TestPage1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/music/test-react-page/2');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>This is Test Page 1</h1>
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'blue',
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

export default TestPage1;
