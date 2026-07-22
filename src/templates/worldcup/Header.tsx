import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Navbar } from 'react-bootstrap';
import bg from 'src/assests/imgHeader_2024/top bar.png';

const Header: React.FC<{
  id: string;
  show: boolean;
  content: React.ReactNode;
}> = ({ id, show, content }) => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [isInteracting, setIsInteracting] = useState(false);
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
    </Wrapper>
  );
};

const CustomNavbar = styled(Navbar)`
  align-items: flex-start;
`;

const Wrapper = styled.header<{ show: boolean }>`
  font-family: passion, sans-serif;

  position: fixed;
  background: url(${bg}) left no-repeat;
  background-size: 100% 100%;
  height: 80px;
  transition: all 0.4s linear;
  z-index: 1000;
  left: 50%;
  transform: translateX(-50%)
    ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-150%)')};
  transition: transform ease-in 0.5s;
  padding-left: 30px;
  padding-right: 30px;
  //@media (max-width: 1400px) {
  // background-size: 100% 100%;
  // }
  @media (max-width: 1300px) {
    width: 100%;
    background-size: 100% 100%;
  }
`;

export default Header;
