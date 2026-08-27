import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';

type Props = {
  setShowInVideo: (isShow: boolean) => void;
  isShow: boolean;
};

const Drawer: React.FC<Props> = ({ isShow, setShowInVideo }) => {
  // No celular a barra de redes ficaria por cima do conteúdo, então ela
  // começa recolhida — o usuário abre pelo botão "+".
  const [show, setShow] = useState<boolean>(
    () => typeof window === 'undefined' || window.innerWidth >= 576,
  );
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
      <ToggleButton
        type="button"
        aria-label={CheckShow() ? 'Hide social links' : 'Show social links'}
        className="d-none d-sm-flex"
        show={CheckShow()}
        onClick={onClickShow}
      >
        <Chevron show={CheckShow()}>◀</Chevron>
      </ToggleButton>
      <MainButton
        className="d-flex d-sm-none"
        show={CheckShow()}
        onClick={onClickShow}
      >
        <TextBtn show={CheckShow()}>{CheckShow() ? '✕' : '+'}</TextBtn>
      </MainButton>
    </Fragment>
  );
};

/** Aba fixa na borda direita que mostra/esconde a barra de redes sociais. */
const ToggleButton = styled.button<{ show: boolean }>`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3000;
  width: 34px;
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  border-right: none;
  border-radius: ${arcadeRadius.md} 0 0 ${arcadeRadius.md};
  box-shadow: ${hardShadow(4)};
  cursor: pointer;
  transition: background 0.15s ease, width 0.15s ease;

  &:hover {
    background: ${arcadeColors.white};
    width: 38px;
  }
`;

const Chevron = styled.span<{ show: boolean }>`
  font-size: 16px;
  line-height: 1;
  color: ${arcadeColors.ink};
  display: inline-block;
  transform: rotate(${({ show }) => (show ? '180deg' : '0deg')});
  transition: transform ease-in 0.3s;
`;

const MainButton = styled.button<{ show: boolean }>`
  right: 10px;
  position: fixed;
  z-index: 3000;
  top: 93%;
  cursor: pointer;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${arcadeRadius.md};
  transform: translateY(-50%);
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  box-shadow: ${hardShadow(4)};
  color: ${arcadeColors.ink};
  font-family: ${arcadeFonts.display};
  font-size: 20px;
  text-align: center;
`;

const TextBtn = styled.span<{ show: boolean }>`
  display: inline-block;
  line-height: 1;
  transform: rotate(${({ show }) => (show ? '0deg' : '360deg')});
  transition: transform ease-in 0.3s;
`;

export default Drawer;
