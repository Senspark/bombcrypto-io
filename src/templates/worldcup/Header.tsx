import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Navbar } from 'react-bootstrap';
import { arcadeBorder, arcadeColors, hardShadow } from 'src/theme/arcade';

const Header: React.FC<{
  id: string;
  show: boolean;
  content: React.ReactNode;
}> = ({ id, show, content }) => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [isInteracting, setIsInteracting] = useState(false);
  const [progress, setProgress] = useState(0);

  // barra de progresso de leitura, na base do header
  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      setLastInteractionTime(Date.now());
      setIsInteracting(true);
    };

    // Đăng ký các sự kiện tương tác của người dùng
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    // Xóa các sự kiện khi component unmount
    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.addEventListener('scroll', handleInteraction);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastInteractionTime;
      if (elapsedTime >= 4000) {
        // Hiển thị thông báo khi không có tương tác trong 3 giây
        setIsInteracting(false);
      }
    }, 4000);

    // Xóa timer khi component unmount hoặc khi có tương tác mới
    return () => clearTimeout(timer);
  }, [lastInteractionTime]);

  return (
    <Wrapper id={id} show={show || (!show && isInteracting)}>
      <Container>
        <CustomNavbar
          variant="dark"
          expand="lg"
          className={`
          justify-content-between  pt-xl-0`}
        >
          {content}
        </CustomNavbar>
      </Container>
      <ProgressBar style={{ transform: `scaleX(${progress})` }} />
    </Wrapper>
  );
};

/** Barra de energia na base do header: mostra quanto da página já foi rolado. */
const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    90deg,
    ${arcadeColors.yellow},
    ${arcadeColors.orange}
  );
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.1s linear;
`;

const CustomNavbar = styled(Navbar)`
  align-items: center;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
`;

const Wrapper = styled.header<{ show: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(
    180deg,
    ${arcadeColors.panel} 0%,
    ${arcadeColors.nightDeep} 100%
  );
  border-bottom: ${arcadeBorder.thick};
  box-shadow: ${hardShadow(0)}, 0 6px 0 rgba(255, 210, 63, 0.35);
  height: 84px;
  z-index: 1000;
  left: 50%;
  transform: translateX(-50%)
    ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-150%)')};
  transition: transform ease-in 0.4s;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 991px) {
    height: 72px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export default Header;
