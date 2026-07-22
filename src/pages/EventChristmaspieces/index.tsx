import React from 'react';
import background from 'src/assests/event/christmaspieces/christmaspieces_bg.png';

const EventChristmaspieces = () => {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${background})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <iframe
        scrolling="auto"
        frameBorder="0"
        style={{
          border: 0,
          width: 1200,
          height: 720,
          margin: '0 auto',
        }}
        // allowTransparency={true}
        src="https://im-a-puzzle.com/share/fe76aeaf70a0737?embed=true&showAds=false&showNav=false&showSolve=false"
      />
    </div>
  );
};

export default EventChristmaspieces;
