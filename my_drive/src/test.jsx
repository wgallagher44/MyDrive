import React, { useState } from 'react';

const DropZone = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHighlighted(true);
   
  };

  const handleDragLeave = () => {
    setIsHighlighted(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsHighlighted(false);

   
    const files = e.dataTransfer.files;
    console.log(files);
  };

  const dropZoneStyle = {
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isHighlighted ? 'lightblue' : 'white',
  };

  return (
    <div
      style={dropZoneStyle}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      id = "temp"
    >
     
    </div>
  );
};

export default DropZone;