import React, { useCallback } from 'react';

import inputShort from 'src/assests/images/inputShort.png';
import inputLong from 'src/assests/images/inputLong.png';
import buttonInfor from 'src/assests/images/buttonInfor.png';

type Props = {
  title: string;
  img: any;
  account: any;
  token: string;
};

function clipboard(token: string) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(token).then(
    function () {
      /* Alert the copied text */
      alert(`Copied Token Contract Address`);
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    },
  );
}

const InformationList: React.FC<Props> = ({ account, token, title, img }) => {
  const click = useCallback(() => {
    window.open(`https://bscscan.com/token/${token}`);
  }, [token]);

  const clickCopy = useCallback(() => {
    clipboard(token);
  }, [token]);

  return (
    <div className="row justify-content-center justify-content-lg-around align-items-center mt-3 mb-5">
      <div className="col-md-12 col-lg-1 text-center text-md-center">
        <img src={img} alt="layer" className="layer h-auto " />
      </div>
      <div className="col-lg-3 col-md-12 position-relative py-2 py-lg-0">
        <h4
          className="text-white fw-bolder text-center text-uppercase mt-lg-0 mt-md-1"
          onClick={click}
        >
          {title}
        </h4>
        <div className="text-center" onClick={click}>
          <img src={inputShort} alt="layer" className="h-auto img-short" />
        </div>
        <div
          className="position-absolute text-center text fw-bolder"
          onClick={click}
        >
          {account}
        </div>
      </div>
      <div className="col-12 col-lg-6 col-md-10 textInput position-relative">
        <div className="position-relative" onClick={click}>
          <img
            src={inputLong}
            alt="input"
            className="inputLong w-100 h-auto position-absolute"
          />
        </div>
        <div
          className="position-absolute text-center text fw-bolder mt-2 cursor-pointer"
          onClick={click}
        >
          {token}
        </div>
        <span className="cursor-pointer" onClick={clickCopy}>
          <img
            src={buttonInfor}
            alt="button"
            className="position-absolute button "
          />
        </span>
      </div>
    </div>
  );
};

export default InformationList;
