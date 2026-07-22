import React from 'react';
import { isSafariBrowser } from 'src/utils/helpers';
import playToEarn from 'src/assests/images/play_to_earn.jpg';

const PlayToEarn: React.FC<{ id: string }> = ({ id }) => {
  const isSafari = isSafariBrowser();
  return (
    <section id={id}>
      {isSafari ? (
        <img className="w-100 img-fluid" src={playToEarn} alt="play to earn" />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `<video class="w-100 img-fluid" autoplay loop muted playsinline>
                        <source  id="myVideo" src="/play-to-earn.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>`,
          }}
        />
      )}
    </section>
  );
};

export default PlayToEarn;
