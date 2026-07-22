import React, { useCallback } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { logEvenAppsflyer } from '../../libs/appsflyer';

type Props = {
  title: string;
  list: any[];
};

const ImgIcon = styled.img`
  height: 40px;
  padding: 2px;
  margin: 5px 3px 5px 0px;
`;

const TokenList: React.FC<Props> = ({ title, list }) => {
  if (!list || !list.length) {
    return <span />;
  }

  const onClickIcon = useCallback((e, icon) => {
    e.preventDefault();
    logTrackClickEventAnalytics(icon.button_name);
    logEvenAppsflyer('exchange', icon.button_name);
    window.open(icon.link);
  }, []);

  return (
    <div className="token-list">
      <p className="text-yellow fs-20 fw-600 mb-0">{title}</p>
      <ul className="row px-0 justify-content-between justify-content-lg-start">
        {list.map((item, index) => {
          return (
            <Col xs={6} sm={5} lg={4} style={{ marginTop: 5 }} key={index}>
              <a href="#" onClick={(e) => onClickIcon(e, item)}>
                <ImgIcon src={item.image} />
              </a>
            </Col>
          );
        })}
      </ul>
    </div>
  );
};

export default TokenList;
