import React from 'react';
import emoji from 'node-emoji';

const About = () => {
  return (
    <div>
      <h4>
        {emoji.get('warning')}
        {emoji.get('warning')}
        {emoji.get('warning')}WARNING:
      </h4>
      <p>
        This product contains nicotine. Nicotine is addictive chemical.
        {emoji.get('ghost')}
      </p>
    </div>
  );
};

export default About;
