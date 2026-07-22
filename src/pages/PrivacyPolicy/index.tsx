import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { content } from 'src/data/privacyPolicy';
import Navbar from 'src/pages/Home/UpdateNavbar';
import SocialNetwork from 'src/pages/Home/SocialNetwork';

const Content = styled.div`
  line-height: 30px;
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="main">
      <Navbar id="update-navbar" />
      <SocialNetwork id="social" show={true} />
      <Container>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
