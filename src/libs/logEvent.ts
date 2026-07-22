import _ from 'lodash';
import { analytics } from './firebase';
import { logEvent, isSupported } from 'firebase/analytics';

interface EventParams {
  category: string;
  button_name: string;
}

export const logEventAnalytics = (eventName, params: EventParams) => {
  if (!isSupported) {
    return;
  }

  logEvent(analytics, eventName, params);
};

export const logTrackClickEventAnalytics = (eventName) => {
  if (!isSupported) {
    return;
  }

  logEvent(analytics, eventName);
};

export const logTrackClick = (buttonName: string) => {
  if (!isSupported) {
    return;
  }
  const scene = getSceneByRouter();
  logEvent(analytics, 'track_click_website', {
    category: scene,
    button_name: buttonName,
  });
};

export const getSceneByRouter = () => {
  const pathname = window.location.pathname;

  if (pathname === '/') {
    return 'scene_home';
  }

  if (_.includes(pathname, '/bcoin')) {
    return 'scene_bcoin';
  }

  if (_.includes(pathname, '/guide')) {
    return 'scene_guide';
  }

  return '';
};
