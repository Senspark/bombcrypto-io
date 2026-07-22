import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions,
} from 'react-floating-button-menu';

import { social } from 'src/data/social';

const Wrapper = styled.section`
  z-index: 100;
  position: fixed;
  left: 10px;
  bottom: 10px;
  padding: 10px 3px;
  border-radius: 30px;
  a {
    text-decoration: none;
  }
  li {
    &:hover {
      border: 3px solid #724fc7;
      border-radius: 30px;
    }
  }
`;

const ButtonStyle = styled.div`
  font-size: 30px;
  color: aliceblue;
`;

const SubSocial: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Wrapper
      className="d-lg-none"
      style={!isOpen ? undefined : { backgroundColor: 'rgba(0,67,155,0.48)' }}
    >
      <FloatingMenu
        slideSpeed={500}
        direction={Directions.Up}
        spacing={8}
        isOpen={isOpen}
      >
        <MainButton
          iconResting={<ButtonStyle>+</ButtonStyle>}
          iconActive={<ButtonStyle>x</ButtonStyle>}
          background="rgba(0,67,155,0.48)"
          onClick={() => setIsOpen(!isOpen)}
          size={40}
        />
        <div>
          {social
            .slice()
            .reverse()
            .map((item, index) => {
              return (
                <ChildButton
                  icon={
                    <a href={item.url} target={item.target}>
                      <img src={item.image} className="w-100" />
                    </a>
                  }
                  size={40}
                  key={index}
                  isOpen={isOpen}
                  spacing={10}
                />
              );
            })}
        </div>
      </FloatingMenu>
    </Wrapper>
  );
};

export default SubSocial;
