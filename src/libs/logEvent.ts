import _ from 'lodash';
import { getAnalyticsClient } from './firebase';
import { logEvent } from 'firebase/analytics';

interface EventParams {
  [key: string]: unknown;
  category: string;
  button_name: string;
}

/** No servidor (pré-render) não há analytics: as chamadas viram no-op. */
const track = (eventName: string, params?: Record<string, unknown>) => {
  const analytics = getAnalyticsClient();
  if (!analytics) {
    return;
  }
  logEvent(analytics, eventName, params);
};

export const logEventAnalytics = (eventName, params: EventParams) => {
  track(eventName, params);
};

export const logTrackClickEventAnalytics = (eventName) => {
  track(eventName);
};

export const logTrackClick = (buttonName: string) => {
  track('track_click_website', {
    category: getSceneByRouter(),
    button_name: buttonName,
  });
};

export const getSceneByRouter = () => {
  if (typeof window === 'undefined') {
    return '';
  }
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
