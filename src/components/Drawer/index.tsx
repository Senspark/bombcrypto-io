import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import arrow from '../../assests/updateHome/Ô button/arrow.png';

type Props = {
  setShowInVideo: (isShow: boolean) => void;
  isShow: boolean;
};

const Drawer: React.FC<Props> = ({ isShow, setShowInVideo }) => {
  const [show, setShow] = useState<boolean>(true);
  const [isForceShow, setForceShow] = useState<boolean>(false);

  const onClickShow = () => {
    if (isShow) {
      setShow(!show);
    } else {
      if (show && isForceShow) {
        setForceShow(false);
        setShow(false);
      } else {
        setShow(true);
        setForceShow(true);
      }
    }
  };

  useEffect(() => {
    setShowInVideo((isShow && show) || (show && isForceShow));
  }, [isShow, show, isForceShow]);

  const CheckShow = () => {
    if ((isShow && show) || (show && isForceShow)) {
      return true;
    }
    return false;
  };

  return (
    <Fragment>
      <ImgArrow
        className="d-none d-sm-block"
        show={CheckShow()}
        src={arrow}
        onClick={onClickShow}
      />
      <MainButton
        className="d-block d-sm-none"
        show={CheckShow()}
        onClick={onClickShow}
      >
        <TextBtn show={CheckShow()}>{CheckShow() ? 'X' : '+'}</TextBtn>
      </MainButton>
    </Fragment>
  );
};

const ImgArrow = styled.img<{ show: boolean }>`
  right: 10px;
  position: fixed;
  z-index: 3000;
  top: 50%;
  transform: translateY(-50%)
    ${({ show }) => (show ? 'rotate(0deg)' : 'rotate(180deg)')};
  cursor: pointer;
  transition: transform ease-in 0.5s;
`;

const MainButton = styled.div<{ show: boolean }>`
  display: flex;
  right: 10px;
  position: fixed;
  z-index: 3000;
  top: 93%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 67, 155, 0.48);
  color: white;
  font-size: 30px;
  border: none;
  font-weight: bold;
  text-align: center;
`;

const TextBtn = styled.span<{ show: boolean }>`
  display: inline-block;
  transform: translateY(-5%)
    ${({ show }) => (show ? 'rotate(0deg)' : 'rotate(360deg)')};
  transition: transform ease-in 0.3s;
`;

export default Drawer;
