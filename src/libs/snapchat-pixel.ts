import ReactPixel from 'react-snapchat-pixel';

const userIdentification = { user_email: 'contact@senspark.com' }; // optional

const options = {
  debug: false, // enable logs
};

ReactPixel.init(
  '9c5b6f7c-8ac1-48f6-ab99-777da59b8199',
  userIdentification,
  options,
);

ReactPixel.pageView(); // For tracking page view
// ReactPixel.track(event, data);
