import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'src/styles/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reportWebVitals from './reportWebVitals';
import Application from './components/Application';
import { initSnapchatPixel } from 'src/libs/snapchat';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ArcadeLoader from 'src/components/ui/ArcadeLoader';

import {
  HomePage,
  GuidePage,
  BcoinPage,
  GettingStartPage,
  TermOfServicePage,
  //AddToMetamaskPage,
  FaqPage,
  //WorldCupPage,
  EventChristmaspieces,
} from 'src/pages';

initSnapchatPixel();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Application>
        <Suspense fallback={<ArcadeLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/getting-started" element={<GettingStartPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/term-of-service" element={<TermOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/bcoin" element={<BcoinPage />} />
            <Route path="/faq" element={<FaqPage />} />
            {/* <Route path="/addToMetamask" element={<AddToMetamaskPage />} /> */}
            {/* <Route path="/events/worldcup2022" element={<WorldCupPage />} /> */}
            <Route
              path="/events/christmaspieces"
              element={<EventChristmaspieces />}
            />
          </Routes>
        </Suspense>
      </Application>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
