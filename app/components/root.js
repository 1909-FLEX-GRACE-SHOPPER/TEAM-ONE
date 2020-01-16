import React from 'react';
import WelcomeMessage from './WelcomeMessage.js';
import Navigation from './Navigation.js';

const Root = () => {
  return (
    <div>
      <Navigation />
      <WelcomeMessage />
    </div>
  );
};

export default Root;
