import React from 'react';

const Controls = ({ onClick, currentImage, count }) => {
  return (
    <div className="controls">
      <button
        disabled={currentImage < 1}
        onClick={e => onClick(currentImage - 1)}
      >
        &lt;
      </button>
      <div className="control_count">
        Image {currentImage + 1} of {count}
      </div>
      {currentImage < count ? (
        <button onClick={e => onClick(currentImage + 1)}>&gt;</button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Controls;
