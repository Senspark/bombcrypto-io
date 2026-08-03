import React from 'react';

import Header from 'src/templates/worldcup/Header';
import ContentHeader from 'src/templates/worldcup/ContentHeader';
import SocialNetwork from 'src/pages/Home/SocialNetwork';
import Footer from 'src/pages/Home/Footer';
import { BackToTop, PageBackground } from 'src/components/ui';

type Props = {
  children: React.ReactNode;
  /** Esconde a barra lateral de redes sociais quando a página não precisa dela. */
  hideSocial?: boolean;
};

/**
 * Casca padrão das páginas internas: header fixo, redes sociais e footer.
 * Evita que cada página monte a própria combinação (que hoje variava entre
 * Navbar, UpdateNavbar e Header).
 */
const PageLayout: React.FC<Props> = ({ children, hideSocial }) => {
  const changeNetwork = () => {};

  return (
    <PageBackground className="main">
      {/* id "navbar" é evitado de propósito: o SCSS legado tem regras #navbar
          que sobrescrevem o posicionamento do header. */}
      <Header
        id="header"
        show={true}
        content={<ContentHeader ChangeNetWork={changeNetwork} />}
      />
      {!hideSocial && <SocialNetwork id="social" show={true} />}
      {children}
      <Footer id="footer" />
      <BackToTop />
    </PageBackground>
  );
};

export default PageLayout;
