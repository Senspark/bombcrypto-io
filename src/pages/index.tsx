import { lazy } from 'react';

export const HomePage = lazy(() => import('src/pages/Home'));
export const GuidePage = lazy(() => import('src/pages/Guide'));
export const GettingStartPage = lazy(() => import('src/pages/GettingStart'));
export const TermOfServicePage = lazy(() => import('src/pages/TermOfService'));
export const BcoinPage = lazy(() => import('src/pages/Bcoin'));
export const FaqPage = lazy(() => import('src/pages/Faq'));
export const AddToMetamaskPage = lazy(() => import('src/pages/AddToMetamask'));
export const WorldCupPage = lazy(() => import('src/pages/WorldCup'));
export const EventChristmaspieces = lazy(
  () => import('src/pages/EventChristmaspieces'),
);
