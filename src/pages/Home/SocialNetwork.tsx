import styled from 'styled-components';
import { snapEvent, snapTrack } from 'src/libs/snapchat';
import ReactGA from 'react-ga';

import React from 'react';

import { social } from 'src/data/social';
//import SubSocial from 'src/components/SubSocial';
import {
  logEventAnalytics,
  logTrackClickEventAnalytics,
} from 'src/libs/logEvent';
import { logEvenAppsflyer } from '../../libs/appsflyer';
import {
  arcadeBorder,
  arcadeColors,
  arcadeRadius,
  breakpoint,
  hardShadow,
} from 'src/theme/arcade';

const boardStyles = `
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(6)};
  padding: 10px 8px;
  z-index: 999;
  position: fixed;
  transition: transform ease-in 0.5s;
`;

const Wrapper = styled.ul<{ show: boolean }>`
  ${boardStyles};
  right: 80px;
  top: 50%;
  transform: translateY(-50%)
    ${({ show }) => (show ? 'translateX(0)' : 'translateX(300%)')};
`;
const WrapperSp = styled.ul<{ show: boolean }>`
  ${boardStyles};
  top: 50%;
  right: 5px;
  padding: 6px 4px;
  transform: translateY(-50%)
    ${({ show }) => (show ? 'translateX(0)' : 'translateX(150%)')};
`;

const ImgSocial = styled.img`
  width: 52px;
  height: 52px;
  padding: 4px;

  @media ${breakpoint.sm} {
    width: 40px;
    height: 40px;
    padding: 2px;
  }

  border-radius: ${arcadeRadius.md};
  transition: transform 0.15s ease, background 0.15s ease;

  &:hover {
    background: ${arcadeColors.yellow};
    transform: scale(1.08);
  }
`;

const Li = styled.li`
  list-style: none;
  margin-bottom: 6px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SocialNetwork: React.FC<{ id: string; show: boolean }> = ({
  id,
  show,
}) => {
  const onClickIcon = React.useCallback((social) => {
    let link = social.url;
    const socialName = social.name;
    let event_name = 'community_click_event';
    let snap_event_type = '';

    switch (socialName) {
      case 'telegram':
        event_name = 'telegram';
        snap_event_type = 'CUSTOM_EVENT_1';
        break;
      case 'discord':
        event_name = 'discord';
        snap_event_type = 'CUSTOM_EVENT_2';
        break;
      case 'twitter':
        event_name = 'twitter';
        snap_event_type = 'CUSTOM_EVENT_3';
        break;
      case 'facebook':
        event_name = 'facebook';
        snap_event_type = 'ADD_CART';
        break;
      case 'youtube':
        event_name = 'youtube';
        snap_event_type = 'PURCHASE';
        break;
      case 'tiktok':
        event_name = 'tiktok';
        snap_event_type = 'COMPLETE_TUTORIAL';
        break;
      case 'medium':
        event_name = 'medium';
        snap_event_type = 'RESERVE';

        break;
      case 'substack':
        event_name = 'substack';
        snap_event_type = 'RESERVE';

        break;
    }
    logTrackClickEventAnalytics('community_click');
    snapEvent('track', snap_event_type);
    ReactGA.ga('send', 'event', event_name, 'community_click', 'Campaign', '0');
    snapTrack(`click-${event_name}`, {
      content_name: 'community_click',
      content_category: 'community_click',
      content_ids: [''],
      content_type: 'Campaign',
      value: 0,
      currency: 'VND',
    });
    logEventAnalytics('track_click_website', {
      category: 'dialog_social_media',
      button_name: event_name,
    });
    logEvenAppsflyer('social', event_name);
    window.open(link);
  }, []);

  return (
    <section id={id}>
      <Wrapper className="d-none d-sm-block" show={show}>
        {social.map((v, i) => {
          return (
            <Li
              key={i}
              onClick={(e) => {
                e.preventDefault();
                onClickIcon(v);
              }}
            >
              <a href={v.url} target={v.target}>
                <ImgSocial src={v.image} alt="imgSocial" />
              </a>
            </Li>
          );
        })}
      </Wrapper>
      <WrapperSp className="d-block d-sm-none" show={show}>
        {social.map((v, i) => {
          return (
            <Li
              key={i}
              onClick={(e) => {
                e.preventDefault();
                onClickIcon(v);
              }}
            >
              <a href={v.url} target={v.target}>
                <ImgSocial src={v.image} alt="imgSocial" />
              </a>
            </Li>
          );
        })}
      </WrapperSp>
    </section>
  );
};

export default SocialNetwork;
